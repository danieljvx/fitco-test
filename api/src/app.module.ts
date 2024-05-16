import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
console.log('process.env.DB_USER', process.env.DB_USER);
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.DB_HOST || ''}`,
      port: parseFloat(process.env.DB_PORT || '3306'),
      username: `${process.env.DB_USER || ''}`,
      password: `${process.env.DB_PASS || ''}`,
      database: `${process.env.DB_NAME || ''}`,
      synchronize: true,
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
