import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Patch } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productService: ProductsService,
    private httpService: HttpService,
  ) {}
  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }

  @Patch(':id/like')
  async like(@Param('id') id: string) {
    await this.productService.likeIncrement(id);
    return this.httpService
      .patch(`http://localhost:8000/api/products/${id}/like`)
      .subscribe(null);
  }

  @EventPattern('product_created')
  async productCreated(product: any) {
    this.productService.create(product);
  }

  @EventPattern('product_updated')
  async productUpdated(product: any) {
    this.productService.update(product.id, product);
  }

  @EventPattern('product_deleted')
  async productDeleted(id: string) {
    this.productService.delete(id);
  }
}
