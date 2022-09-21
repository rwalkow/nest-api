import { Roles } from '../enums/roles.enum';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
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
