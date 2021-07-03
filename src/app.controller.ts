import { Controller, Get } from '@nestjs/common';
import { BotService } from './bot/bot.service';

@Controller()
export class AppController {
  constructor(private botService: BotService) {}

  @Get()
  getBotDialog() {
    this.botService.botMessage();
  }
}
