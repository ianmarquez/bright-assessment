export interface ReferralShape {
  created_at: string;
  updated_at: string;
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: {
    name: string;
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
  avatar?: string;
  fileName?: string;
}
