import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateHistoryDto } from './dto/create-history.dto';
import { History, HistoryDocument } from './shema/history.schema';

@Injectable()
export class HistoryService {
  constructor(@InjectModel('History') private historyModel: Model<HistoryDocument>) {}

  create(createHistoryDto: CreateHistoryDto ): Promise<History> {
    const createdHistory = new this.historyModel(createHistoryDto);

    return createdHistory.save() as any;
  }

  getHistory(findObject: any): Promise<History[]> {
    return this.historyModel.find(findObject).sort({_id:-1}).limit(10) as any;
  }
}
