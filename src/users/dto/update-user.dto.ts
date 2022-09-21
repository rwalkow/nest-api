import { Roles } from '../../shared/enums/roles.enum';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  dateOfBirth: Date;

  @ValidateNested({ each: true })
  @Type(() => UpdateUserDTO)
  address?: Array<UpdateUserAddressDTO>;

  @IsEnum(Roles)
  role: Roles[];
}

export class UpdateUserAddressDTO {
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
