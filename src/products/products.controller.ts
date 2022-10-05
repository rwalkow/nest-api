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
import { Product } from './db/products.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDTO } from './dto/external-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  productService: any;
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productRepository.getProductById(id),
    );
  }

  @Get() async getAllProducts(): Promise<Array<ExternalProductDTO>> {
    return (await this.productRepository.getAllProducts()).map(
      this.mapProductToExternal,
    );
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() item: CreateProductDTO,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productService.addProduct(item),
    );
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateProductDTO,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productRepository.updateProduct(id, dto),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return await this.productRepository.deleteProduct(id);
  }

  mapProductToExternal(product: Product): ExternalProductDTO {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }
}
