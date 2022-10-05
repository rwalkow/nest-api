import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'user_addresses',
})
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column({ type: 'int' })
  number: number;

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;
}
