import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

import { Buttons, Constants } from '../constans';
import { config } from '../config/config';
import {categoriesKeyboard,
  getRandom,
  getRandomJokesFromCategory,
  keyboardBtn} from '../helper';
import { HistoryService } from '../history/history.service';

@Injectable()
export class BotService implements OnModuleInit {
  constructor(private historyService: HistoryService) {
  }

  onModuleInit() {
    this.botMessage();
  }

  botMessage() {
    const bot = new TelegramBot(config.TOKEN, { polling: true });

    bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;

      await bot.sendSticker(chatId,config.STICKER);
      await bot.sendMessage(chatId, Constants.WELCOME, {
        reply_markup: {
          keyboard : keyboardBtn
        }
      });
    });

    bot.on('message', async (msg) => {
      const chatId = (msg.chat.id).toString();
      switch (msg.text) {
        case Buttons.RANDOM:
          const randomJokes = await getRandom();

          await this.historyService.create({chatId, jokes: [{value: randomJokes.value}]});

          await bot.sendMessage(chatId, randomJokes.value);

          break;

        case Buttons.HISTORY:
          const history = await this.historyService.getHistory({chatId});

          history.forEach((item) => {
            return item.jokes.forEach(({value}) => bot.sendMessage(chatId, value));
          });

          break;

        case Buttons.CATEGORIES:
          const keyboard = await categoriesKeyboard();

          await bot.sendMessage(chatId, Constants.SELECT_CATEGORY, {
            reply_markup: {
              inline_keyboard: keyboard
            }
          });

          break;

      }
    });

    bot.on('callback_query', async (msg) => {
      const category = msg.data;

      const chatId = (msg.from.id).toString();

      const jokes = await getRandomJokesFromCategory(category);

      await this.historyService.create({chatId, jokes: [{value: jokes.value}]});

      await bot.sendMessage(chatId, jokes.value);

    });

  }

}
