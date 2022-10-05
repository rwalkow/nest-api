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

  deleteById(id: string): Promise<DeleteResult> {
    return this.delete({ id });
  }
}
