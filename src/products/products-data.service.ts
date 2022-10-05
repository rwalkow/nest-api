import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductRepository } from './db/product.repository';
import { TagRepository } from './db/tag.repository';
import { Product } from './db/products.entity';
import { Tag } from './db/tag.entity';

import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
  ) {}

  async addProduct(item: CreateProductDTO): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToSave = new Product();
    productToSave.name = item.name;
    productToSave.price = item.price;
    productToSave.count = item.count;
    productToSave.tags = tags;
    return this.productRepository.save(productToSave);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.deleteById(id);
  }

  async updateProduct(id: string, item: UpdateProductDTO): Promise<Product> {
    const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
    const productToUpdate = await this.getProductById(id);

    productToUpdate.name = item.name;
    productToUpdate.price = item.price;
    productToUpdate.count = item.count;
    productToUpdate.tags = tags;

    await this.productRepository.save(productToUpdate);

    return this.getProductById(id);
  }

  getProductById(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
