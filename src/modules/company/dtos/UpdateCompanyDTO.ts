export interface UpdateCompanyDTO {
  email?: string;
  phone?: string;
  cnpj?: string;
  address?: {
    street?: string;
    number?: string;
    city?: string;
    zipcode?: string;
    state?: string;
  };
}
