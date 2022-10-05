import { EntityRepository, Repository } from 'typeorm';

import { User } from './users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getUserByEmail(email: string): Promise<User[]> {
    return this.find({
      where: {
        email: email,
      },
    });
  }
}
