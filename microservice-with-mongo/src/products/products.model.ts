import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  likes: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
