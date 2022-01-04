import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(
    private productsService: ProductsService,
    @Inject('PRODUCTS_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async createProducts(
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    const product = await this.productsService.createProducts({ title, image });
    this.client.emit('product_created', product);
    return product;
  }

  @Get()
  allProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string) {
    return this.productsService.getOneProduct(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    await this.productsService.updateProduct(id, {
      title,
      image,
    });
    const product = await this.productsService.getOneProduct(id);
    this.client.emit('product_updated', product);
    return product;
  }

  @Patch(':id/like')
  async like(@Param('id') id: string) {
    return this.productsService.likeIncrement(id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
    this.client.emit('product_deleted', id);
    return;
  }
}
