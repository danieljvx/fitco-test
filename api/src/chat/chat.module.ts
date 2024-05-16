import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntitiy } from './entities/user.entity';
import { RoomEntitiy } from './entities/room.entity';
import { MessageEntitiy } from './entities/message.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.services';
import { ChatGptModule } from 'src/chat-gpt/chatgpt.module';
import { ChatGateway } from './chat.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([RoomEntitiy, UserEntitiy, MessageEntitiy]),
    ChatGptModule.forRoot(`${process.env.GPT_KEY || ''}`),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
