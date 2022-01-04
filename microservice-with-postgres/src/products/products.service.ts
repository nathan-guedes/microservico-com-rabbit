import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async getAllProducts(): Promise<Products[]> {
    return this.productRepository.find();
  }

  async createProducts(data): Promise<Products> {
    return this.productRepository.save(data);
  }

  async getOneProduct(id: string): Promise<Products> {
    return this.productRepository.findOne({ id });
  }

  async updateProduct(id: string, data: any): Promise<any> {
    return this.productRepository.update(id, data);
  }

  async deleteProduct(id: string) {
    this.productRepository.delete({ id });
  }

  async likeIncrement(id: string) {
    const product = await this.productRepository.findOne({ id });
    return this.productRepository.update({ id }, { likes: product.likes + 1 });
  }
}
