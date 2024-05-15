import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateChatgptDto } from './dto/create-chatgpt.dto';
import { ChatGptResponse } from './dto/response-chatgpt.dto';

@Injectable()
export class ChatGptService {
  private readonly apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  async generateTextGPT3({ prompt }: CreateChatgptDto) {
    return this.generateText({ prompt, model: 'gpt-3.5-turbo-16k' });
  }
  async generateText({ prompt, model }: CreateChatgptDto) {
    try {
      const response = await axios.post<ChatGptResponse>(
        'https://api.openai.com/v1/chat/completions',
        {
          model,
          messages: [{ role: 'user', content: prompt }],
          // temperature: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${this.apiKey}`,
          },
        },
      );
      console.log('response', response);
      return response.data;
    } catch (error: any) {
      console.log('error:', error);
      throw new HttpException('Falha ao gerar texto', error.response.status);
    }
  }
}
