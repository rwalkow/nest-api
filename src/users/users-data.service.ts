import { Injectable } from '@nestjs/common';
import { CreateUserAddressDTO, CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserAddressDTO, UpdateUserDTO } from './dto/update-user.dto';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/user-address.repository';
import { User } from './db/users.entity';
import { UserAddress } from './db/users-addresses.entity';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}

  private users: Array<User> = [];

  async addUser(_user_: CreateUserDTO): Promise<User> {
    const checkEmail = this.userRepository.getUserByEmail(_user_.email);
    if (checkEmail) {
      throw new UserRequireUniqueEmailException();
    }
    // const roles: Role[] = await this.roleRepository.findRolesByName(
    //   _user_.role,
    // );
    const userToSave = new User();
    userToSave.firstName = _user_.firstName;
    userToSave.lastName = _user_.lastName;
    userToSave.email = _user_.email;
    userToSave.dateOfBirth = _user_.dateOfBirth;
    userToSave.address = await this.prepareUserAddressesToSave(_user_.address);
    userToSave.role = _user_.role;
    return this.userRepository.save(userToSave);
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
    // const roles: Role[] = await this.roleRepository.findRolesByName(dto.role);
    const userToUpdate = await this.getUserById(id);

    userToUpdate.firstName = dto.firstName;
    userToUpdate.lastName = dto.lastName;
    userToUpdate.email = dto.email;
    userToUpdate.dateOfBirth = dto.dateOfBirth;
    userToUpdate.address = await this.prepareUserAddressesToSave(dto.address);
    userToUpdate.role = dto.role;

    await this.userAddressRepository.deleteUserAddressesByUserId(id);
    await this.userRepository.save(userToUpdate);

    return this.getUserById(id);
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDTO[] | UpdateUserAddressDTO[],
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
