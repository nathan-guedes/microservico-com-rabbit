import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://localhost/crudWithMongo',
      {
        autoCreate: true,
      },
    ),
    ProductsModule,
  ],
})
export class AppModule {}
