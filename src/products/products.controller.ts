import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from '../shared/guards/role.guard';
import { dateToArray } from '../shared/helper/date.helper';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDTO } from './dto/external-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsDataService } from './products-data.service';
import { Product } from './db/products.entity';
@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productRepository.getProductById(id),
    );
  }

  @Get() async getAllProducts(): Promise<ExternalProductDTO[]> {
    const products = await this.productRepository.getAllProducts();
    return products.map((i) => this.mapProductToExternal(i));
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() item: CreateProductDTO,
  ): Promise<ExternalProductDTO> {
    const product = await this.productRepository.addProduct(item);
    return this.mapProductToExternal(product);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateProductDTO,
  ): Promise<ExternalProductDTO> {
    const product = await this.productRepository.updateProduct(id, item);
    return this.mapProductToExternal(product);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(id: string): Promise<ExternalProductDTO> {
    await this.productRepository.deleteProduct(id);
    return null;
  }

  mapProductToExternal(product: Product): ExternalProductDTO {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags.map((i) => i.name),
    };
  }
}
