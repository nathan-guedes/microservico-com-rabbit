import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly productsModel: Model<ProductsDocument>,
  ) {}

  getAllProducts() {
    return this.productsModel.find();
  }

  create(data: any) {
    return this.productsModel.create(data);
  }

  findOne(id: string) {
    return this.productsModel.findOne({ id });
  }

  async update(id: string, data) {
    return this.productsModel.findOneAndUpdate({ id }, data);
  }

  async likeIncrement(id: string) {
    return this.productsModel.findOneAndUpdate(
      { id },
      { $inc: { likes: 1 } },
      { new: true },
    );
  }

  delete(id: string) {
    console.log({ id });
    return this.productsModel.deleteOne({ id }).exec();
  }
}
