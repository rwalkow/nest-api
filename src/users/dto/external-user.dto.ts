import { Roles } from '../../shared/enums/roles.enum';

export interface ExternalUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address?: Array<ExternalUserAddress>;
  role: Array<Roles>;
}

export interface ExternalUserAddress {
  country: string;
  city: string;
  street: string;
  number: number;
}
