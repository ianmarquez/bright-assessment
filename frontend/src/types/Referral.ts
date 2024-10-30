export interface ReferralShape {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: {
    homeName: string;
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
}
