import { Tags } from '../enums/tags.enum';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  MinLength,
  MaxLength,
  Min,
  IsArray,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @MinLength(0, {
    message: 'Name is too short',
  })
  @MaxLength(25, {
    message: 'Title is too long',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  count: number;

  @IsArray()
  @IsEnum({ each: true })
  tags: Array<Tags>;
}
