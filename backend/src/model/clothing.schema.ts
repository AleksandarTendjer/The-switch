import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type ClothingDocument = Clothing & Document;
@Schema()
export class Clothing {
  @Prop()
  title: string;
  @Prop()
  type: string;
  @Prop()
  coverImage: string;
  @Prop({ default: Date.now() })
  uploadDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const ClothingSchema = SchemaFactory.createForClass(Clothing);
