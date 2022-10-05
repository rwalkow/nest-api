import { EntityRepository, Repository, In, DeleteResult } from 'typeorm';
import { Product } from './products.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findProductsByName(names: string[]): Promise<Product[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }

  getProductById(id: string[]): Promise<Product[]> {
    return this.find({
      where: {
        id: In(id),
      },
    });
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.delete({ id });
  }
}
