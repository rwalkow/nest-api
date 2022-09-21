import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data.service';
import { dateToArray } from '../shared/helper/date.helper';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.getUserById(id));
  }

  @Get() getAllUsers(): Array<ExternalUserDTO> {
    return this.userRepository.getAllUsers().map(this.mapUserToExternal);
  }

  @Post()
  addUser(@Body() user: CreateUserDTO): ExternalUserDTO {
    return this.userRepository.addUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDTO,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.updateUser(id, dto));
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') user: string): void {
    return this.userRepository.deleteUser(user);
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return { ...user, dateOfBirth: dateToArray(user.dateOfBirth) };
  }
}
