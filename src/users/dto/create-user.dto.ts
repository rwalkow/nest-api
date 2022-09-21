import { Roles } from '../enums/roles.enum';

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Array<number>;
  address: Array<UserAddress>;
  role: Array<Roles>;
}

export interface UserAddress {
  country: string;
  city: string;
  street: string;
  houseNo: string;
  apartmentNo?: string;
}
