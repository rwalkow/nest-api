import { Injectable } from '@nestjs/common';
import { dateToArray } from '../shared/helper/date.helper';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDTO } from './dto/create-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(_user_: CreateUserDTO): ExternalUserDTO {
    const user: User = {
      ..._user_,
      id: uuidv4(),
      dateOfBirth: new Date(),
    };
    this.users.push(user);
    return { ...user, dateOfBirth: dateToArray(user.dateOfBirth) };
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  updateUser(id: string, dto: CreateUserDTO): User {
    const user = this.getUserById(id);
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = {
      ...user,
      ...dto,
      dateOfBirth: new Date(user.dateOfBirth),
    };
    return this.users[index];
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): Array<User> {
    return this.users;
  }
}
