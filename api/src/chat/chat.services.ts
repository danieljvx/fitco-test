import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IIsCheckRoom, IRoom, IUser } from './chat.interface';

import { ChatGptService } from 'src/chat-gpt/chatgpt.service';
import { UserEntitiy } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoomEntitiy } from './entities/room.entity';
import { MessageEntitiy } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(RoomEntitiy)
    private roomRepository: Repository<RoomEntitiy>,
    @InjectRepository(UserEntitiy)
    private userRepository: Repository<UserEntitiy>,
    @InjectRepository(MessageEntitiy)
    private messageRepository: Repository<MessageEntitiy>,
    private readonly chatGptService: ChatGptService,
  ) {}

  private rooms: IRoom[] = [];

  async getRoomById(roomId: string): Promise<number> {
    return this.rooms.findIndex((room) => room?.id === roomId);
  }

  async getRoom(roomId: string): Promise<IRoom | null> {
    const rooms = this.rooms.filter((room) => room?.id === roomId);
    return rooms.length ? rooms[0] : null;
  }

  async addRoom(
    roomId: string,
    host: IUser,
    guest: IUser,
  ): Promise<IRoom | null> {
    const room = await this.getRoomById(roomId);
    if (room === -1) {
      const room = {
        id: roomId,
        host,
        guest,
        messages: [],
      };
      this.rooms.push(room);
      return room;
    }
    return null;
  }

  async removeRoom(roomId: string): Promise<void> {
    const findRoom = await this.getRoomById(roomId);
    if (findRoom !== -1) {
      this.rooms = this.rooms.filter((room) => room.id !== roomId);
    }
  }

  async getRoomHost(roomId: string): Promise<IUser> {
    const roomIndex = await this.getRoomById(roomId);
    return this.rooms[roomIndex].host;
  }

  async findRoomsByUserSocketId(socketId: string): Promise<IRoom[]> {
    const filteredRooms = this.rooms.filter((room) => {
      return (
        room.host.socketId === socketId || room.guest.socketId === socketId
      );
    });
    return filteredRooms;
  }

  async getIsRoomByHostIdGuestId(
    hostId: number,
    guestId: number,
  ): Promise<IIsCheckRoom> {
    let isExistRoom = false;
    let roomId = '';
    this.rooms.forEach((room) => {
      if (!isExistRoom) {
        isExistRoom = room.host.id === hostId && room.guest.id === guestId;
        roomId = room.id;
      }
    });
    return {
      isExistRoom,
      roomId,
    };
  }

  async replaceSocketIdRoomById(
    roomId: string,
    socketId: string,
  ): Promise<IRoom[]> {
    const rooms = [];
    this.rooms.forEach((room) => {
      if (room.id === roomId) {
        room.host.socketId = socketId;
        room.guest.socketId = socketId;
        rooms.push(room);
      }
    });
    this.rooms = rooms;
    return rooms;
  }

  async replaceSocketIdUserById(
    socketId: string,
    userId: number,
  ): Promise<void> {
    const rooms = [];
    this.rooms.forEach((room) => {
      if (userId === room.host.id && room.host.socketId !== socketId) {
        room.host.socketId = socketId;
      }
      rooms.push(room);
    });
    this.rooms = rooms;
  }

  async getRooms(): Promise<IRoom[]> {
    return this.rooms;
  }
}
