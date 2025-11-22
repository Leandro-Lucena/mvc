export interface UpdateCompanyDTO {
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    number?: string;
    city?: string;
    zipcode?: string;
    state?: string;
  };
}
