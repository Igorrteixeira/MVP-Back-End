import { ROLE } from "../src/models/UserModel";
import {
  AutheticatorMock,
  AuthenticationData,
} from "./mocks/AuthenticatorMock";

describe("Teste Authenticator", () => {
  test("Deve retornar sucesso se token for gerado", async () => {
    const authenticator = new AutheticatorMock().generateToken({
      id: "ddd",
      role: ROLE.VENDEDOR,
    });
    expect(authenticator).toBe("token-mock-vendedor");
  });

  test("Deve retornar sucesso se encontrar token valido", async () => {
    const vendedorPayload: AuthenticationData = {
      id: "id-mock",
      role: ROLE.VENDEDOR,
    };
    const authenticator = new AutheticatorMock().getTokenData(
      "token-mock-vendedor"
    );
    expect(authenticator).toEqual(vendedorPayload);
  });
});
