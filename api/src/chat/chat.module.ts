import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntitiy } from './entities/user.entity';
import { RoomEntitiy } from './entities/room.entity';
import { MessageEntitiy } from './entities/message.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.services';
import { ChatGptModule } from 'src/chat-gpt/chatgpt.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntitiy, UserEntitiy, MessageEntitiy]),
    ChatGptModule.forRoot(
      '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',
    ),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
