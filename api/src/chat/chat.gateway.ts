import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { v4 as uuidv4 } from 'uuid';
import { ChatService } from './chat.services';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  IMessage,
  ServerToClientEvents,
  IUser,
} from './chat.interface';
import { ChatGptService } from 'src/chat-gpt/chatgpt.service';

const FitCoUser: IUser = {
  id: 1234567890,
  fullname: 'FitCo ChatGPT',
  avatar: '',
  email: 'daniel.villanueva@gmail.com',
  userId: 1234567890,
  tokenAuth: 'fitco-key',
  socketId: '',
  temp: false,
  guest: true,
};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatService: ChatService,
    private readonly chatGptService: ChatGptService,
  ) {}

  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody()
    payload: IMessage,
  ): Promise<IMessage> {
    const room = await this.chatService.getRoom(payload.roomId);
    if (room) {
      room.messages.push(payload);
      this.server.to(room.id).emit('chat', payload);
      if (room.guest.id === FitCoUser.id) {
        this.server.to(room.id).emit('writing', true);
        const respChatGpt = await this.chatGptService.generateTextGPT3({
          prompt: payload.message,
        });
        if (respChatGpt && respChatGpt?.choices) {
          const messageGpt: IMessage = {
            user: FitCoUser,
            message: respChatGpt.choices[0].message.content,
            time: new Date(),
            roomId: room.id,
          };
          room.messages.push(messageGpt);
          this.server.to(room.id).timeout(2000).emit('chat', messageGpt);
          this.server.to(room.id).emit('writing', false);
        }
      }
    }
    return payload;
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(
    @MessageBody()
    payload: {
      host: IUser;
      guest: IUser | undefined | null;
    },
  ) {
    if (payload.host.socketId) {
      const guest = payload?.guest
        ? payload.guest
        : { ...FitCoUser, ...{ socketId: payload.host.socketId } };
      const { isExistRoom, roomId } =
        await this.chatService.getIsRoomByHostIdGuestId(
          payload.host.id,
          guest.id,
        );
      if (!payload?.guest && isExistRoom) {
        const room = await this.chatService.getRoom(roomId);
        this.server.in(payload.host.socketId).socketsJoin(roomId);
        this.server.in(roomId).emit('join_room', room);
      } else {
        const roomId = uuidv4();
        this.server.in(payload.host.socketId).socketsJoin(roomId);
        const room = await this.chatService.addRoom(
          roomId,
          payload.host,
          guest,
        );
        this.server.in(roomId).emit('join_room', room);
        this.server.to(room.id).emit('writing', true);
        const respChatGpt = await this.chatGptService.generateTextGPT3({
          prompt: `Hola, me llamo ${payload.host.fullname}`,
        });
        if (respChatGpt && respChatGpt?.choices) {
          const messageGpt: IMessage = {
            user: FitCoUser,
            message: respChatGpt.choices[0].message.content,
            time: new Date(),
            roomId: room.id,
          };
          room.messages.push(messageGpt);
          this.server.to(room.id).timeout(2000).emit('chat', messageGpt);
          this.server.to(room.id).emit('writing', false);
        }
      }
    }
  }

  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    console.log('Socket disconnected:', socket.id);
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
