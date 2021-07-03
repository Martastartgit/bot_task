import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { config } from './config/config';

@Module({
  imports: [BotModule, MongooseModule.forRoot(config.MONGODB_URL)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
