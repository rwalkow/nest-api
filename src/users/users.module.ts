import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDataService } from './users-data.service';
import { UserValidatorService } from './user-validator.service';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/user-address.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersDataService, UserValidatorService],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([UserAddressRepository]),
  ],
})
export class UsersModule {}
