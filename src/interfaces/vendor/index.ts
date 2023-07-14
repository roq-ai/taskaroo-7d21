import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VendorInterface {
  id?: string;
  service_offering: string;
  availability: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface VendorGetQueryInterface extends GetQueryInterface {
  id?: string;
  service_offering?: string;
  availability?: string;
  user_id?: string;
}
