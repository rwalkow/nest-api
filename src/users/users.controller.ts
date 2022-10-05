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
import { UsersDataService } from './users-data.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './db/users.entity';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(await this.userRepository.getUserById(id));
  }

  @Get() async getAllUsers(): Promise<Array<ExternalUserDTO>> {
    return (await this.userRepository.getAllUsers()).map(
      this.mapUserToExternal,
    );
  }

  @Post()
  async addUser(@Body() user: CreateUserDTO): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(await this.userRepository.addUser(user));
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDTO,
  ): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(
      await this.userRepository.updateUser(id, dto),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') user: string): void {
    return this.userRepository.deleteUser(user);
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return { ...user, role: user.role?.map((i) => i) };
  }
}
