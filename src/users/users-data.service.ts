import { Injectable } from '@nestjs/common';
import { CreateUserAddressDTO, CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserAddressDTO, UpdateUserDTO } from './dto/update-user.dto';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/user-address.repository';
import { User } from './db/users.entity';
import { UserAddress } from './db/users-addresses.entity';
import { EntityManager } from 'typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
    private connection: Connection,
  ) {}

  private users: Array<User> = [];

  async addUser(_user_: CreateUserDTO): Promise<User> {
    const checkEmail = await this.userRepository.getUserByEmail(_user_.email);
    if (checkEmail.length) {
      throw new UserRequireUniqueEmailException();
    }

    return this.connection.transaction(async (manager: EntityManager) => {
      const userToSave = new User();
      userToSave.firstName = _user_.firstName;
      userToSave.lastName = _user_.lastName;
      userToSave.email = _user_.email;
      userToSave.dateOfBirth = _user_.dateOfBirth;
      userToSave.address = await this.prepareUserAddressesToSave(
        _user_.address,
        manager.getCustomRepository(UserAddressRepository),
      );
      userToSave.role = _user_.role;
      return await manager.getCustomRepository(UserRepository).save(userToSave);
    });
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const userToUpdate = await this.getUserById(id);

      userToUpdate.firstName = dto.firstName;
      userToUpdate.lastName = dto.lastName;
      userToUpdate.email = dto.email;
      userToUpdate.dateOfBirth = dto.dateOfBirth;
      userToUpdate.address = await this.prepareUserAddressesToSave(
        dto.address,
        manager.getCustomRepository(UserAddressRepository),
      );
      userToUpdate.role = dto.role;

      await this.userAddressRepository.deleteUserAddressesByUserId(id);
      await this.userRepository.save(userToUpdate);

      return await manager
        .getCustomRepository(UserRepository)
        .save(userToUpdate);
    });
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDTO[] | UpdateUserAddressDTO[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    UserAddressRepository,
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.number = add.number;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }
}
