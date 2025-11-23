import { cpf, cnpj } from "cpf-cnpj-validator";

export class DocumentValidator {
  static validateCPF(document: string): boolean {
    return cpf.isValid(document);
  }

  static validateCNPJ(document: string): boolean {
    return cnpj.isValid(document);
  }
}
