import { Roles } from '../../shared/enums/roles.enum';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { UserAddress } from '../db/users-addresses.entity';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  dateOfBirth: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDTO)
  address?: Array<UserAddress>;

  @IsEnum(Roles)
  role: Roles[];
}

export class CreateUserAddressDTO {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  number: number;
}
