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
    console.log('chat payload.roomId', payload.roomId);
    console.log('chat getRooms', await this.chatService.getRooms());
    const room = await this.chatService.getRoom(payload.roomId);
    console.log('chat room', room);
    if (room) {
      room.messages.push(payload);
      this.server.to(room.id).emit('chat', payload, (err, resp) => {
        console.log('emit chat HOST');
      });
      console.log('room.id', room.id);
      if (room.guest.id === FitCoUser.id) {
        this.server.to(room.id).emit('writing', true);
        const respChatGpt = await this.chatGptService.generateTextGPT3({
          prompt: payload.message,
        });
        console.log('respChatGpt', respChatGpt);
        if (respChatGpt && respChatGpt?.choices) {
          console.log(
            'respChatGpt.choices[0].message.content',
            respChatGpt.choices[0].message.content,
          );
          const rooms = await this.chatService.getRooms();
          console.log('room.id.', room.id);
          console.log(
            'this.server.sockets.fetchSockets',
            await this.server.sockets.fetchSockets(),
          );
          console.log('rooms', rooms);
          // const products = await this.chatService.getSearchProducts();
          const messageGpt: IMessage = {
            user: FitCoUser,
            message: respChatGpt.choices[0].message.content,
            time: new Date(),
            roomId: room.id,
          };
          room.messages.push(messageGpt);
          this.server
            .to(room.id)
            .timeout(2000)
            .emit('chat', messageGpt, (err, resp) => {
              console.log('emit chat GUEST', { err, resp });
            });
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
      console.log('host', payload.host);
      console.log('guest', guest);
      const { isExistRoom, roomId } =
        await this.chatService.getIsRoomByHostIdGuestId(
          payload.host.id,
          guest.id,
        );
      console.log('isExistRoom', isExistRoom);
      if (!payload?.guest && isExistRoom) {
        const room = await this.chatService.getRoom(roomId);
        console.log(room);
        this.server.in(payload.host.socketId).socketsJoin(roomId);
        this.server.in(roomId).emit('join_room', room);
      } else {
        const roomId = uuidv4();
        console.log(`${payload.host.socketId} is joining ${roomId}`);
        this.server.in(payload.host.socketId).socketsJoin(roomId);
        const room = await this.chatService.addRoom(
          roomId,
          payload.host,
          guest,
        );
        this.server.in(roomId).emit('join_room', room);
        const messageGpt: IMessage = {
          user: FitCoUser,
          message: 'Hola, ¿cómo podemos ayudarte?',
          time: new Date(),
          roomId: room.id,
        };
        room.messages.push(messageGpt);
        this.server
          .to(room.id)
          .timeout(2000)
          .emit('chat', messageGpt, (err, resp) => {
            console.log('emit chat GUEST', { err, resp });
          });
        /*
        const dataWsChatGpt = {
          pais: 'COLOMBIA',
          mascota: '',
          nomb_categ: '',
          room_id: room.id,
          first_connection: true,
          texto: payload.host.temp
            ? 'hola'
            : `hola, me llamo ${payload.host.fullname}`,
          messages: [],
        };
        this.chatService.sendMessageWsChatGptService(dataWsChatGpt);
        */
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
