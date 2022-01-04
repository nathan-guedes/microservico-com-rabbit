import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ProductModule } from './products/products.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'microservice_with_nest',
      autoLoadEntities: true, // dev
      synchronize: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
