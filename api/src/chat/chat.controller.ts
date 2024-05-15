import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.services';
import { IRoom } from './chat.interface';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get('api/rooms')
  async getAllRooms(): Promise<IRoom[]> {
    return await this.chatService.getRooms();
  }

  @Get('api/rooms/:room')
  async getRoom(@Param() params): Promise<IRoom> {
    const rooms = await this.chatService.getRooms();
    const room = await this.chatService.getRoomById(params.room);
    return rooms[room];
  }
}
