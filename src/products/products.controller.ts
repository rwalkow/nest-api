import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';

@Controller('products')
export class ProductsController {
  @Get(':id')
  getProductById(@Param('id') _id_: string): string {
    return `GetByID ${_id_}`;
  }

  @Post()
  addIProduct(@Body() _product_: CreateProductDTO): ExternalProductDto {
    return null;
  }
}
