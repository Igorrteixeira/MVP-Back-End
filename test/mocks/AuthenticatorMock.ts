import { ROLE } from "../../src/models/UserModel";

export interface AuthenticationData {
  id: string;
  role: string;
}

export class AutheticatorMock {
  public generateToken = (payload: AuthenticationData) => {
    let token = "";
    if (payload.role === ROLE.VENDEDOR) {
      token = "token-mock-vendedor";
    } else if (payload.role === ROLE.GERENTE) {
      token = "token-mock-gerente";
    }
    return token;
  };

  public getTokenData = (token: string): AuthenticationData => {
    switch (token) {
      case "token-mock-vendedor":
        const vendedorPayload: AuthenticationData = {
          id: "id-mock",
          role: ROLE.VENDEDOR,
        };

        return vendedorPayload;

      case "token-mock-gerente":
        const gerentePayload: AuthenticationData = {
          id: "id-mock",
          role: ROLE.GERENTE,
        };
        return gerentePayload;
      default:
        return undefined;
    }
  };
}
