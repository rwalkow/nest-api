import { Roles } from '../../shared/enums/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAddress } from './users-addresses.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfBirth: Date;

  @Column('enum', {
    enum: Roles,
  })
  role: Roles[];

  @OneToMany((type) => UserAddress, (address) => address.user)
  address?: UserAddress[];
}
