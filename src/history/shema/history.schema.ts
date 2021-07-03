import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema()
class Jokes {
    @Prop()
    value: string;
}

@Schema()
export class History {
    @Prop()
    chatId: string;

    @Prop()
    jokes: [Jokes];

}

export const HistorySchema = SchemaFactory.createForClass(History);
