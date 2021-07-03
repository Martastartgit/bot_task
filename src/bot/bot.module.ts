import { Module } from '@nestjs/common';

import {BotController} from './bot.controller';
import {BotService} from './bot.service';
import {HistoryModule} from '../history/history.module';

@Module({
  imports: [HistoryModule],
  providers: [BotService],
  controllers: [BotController],
  exports: [BotService]
})
export class BotModule {}
