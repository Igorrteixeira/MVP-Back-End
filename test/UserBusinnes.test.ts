import { UserBusinnes } from "../src/businnes/UserBusinnes";
import { CustomError } from "../src/error/CustomError";
import { CreateDTO, LoginDTO, OutputSallerDb } from "../src/interfaces/userDto";
import { ROLE } from "../src/models/UserModel";
import { AutheticatorMock } from "./mocks/AuthenticatorMock";
import { GenerateIdMock } from "./mocks/GenerateIdMock";
import { HashManagerMock } from "./mocks/HashManegerMock";
import { UserDbMock } from "./mocks/UserDataMock";

describe("Testes Regras de negocio UserBusiness", () => {
  const userBusinnes = new UserBusinnes(
    new UserDbMock(),
    new AutheticatorMock(),
    new HashManagerMock(),
    new GenerateIdMock()
  );

  test("Deve retorna sucesso se cadastro for realizado ", async () => {
    const input: CreateDTO = {
      name: "vendedorteste",
      email: "vendedorteste@gmail.com",
      password: "mvptest-hash",
      role: ROLE.VENDEDOR,
      unitId: 20512,
    };
    const response = await userBusinnes.createBus(input);
    expect(response).toBe("token-mock-vendedor");
  });

  test("Deve retorna sucesso se login for realizado", async () => {
    const input: LoginDTO = {
      email: "vendedor@gmail.com",
      password: "mvptest",
    };
    const response = await userBusinnes.loginBus(input);
    expect(response).toBe("token-mock-vendedor");
  });

  test("Deve retorna sucesso se usuario ja tiver cadastro", async () => {
    try {
      const input: CreateDTO = {
        name: "vendedor",
        email: "vendedor@gmail.com",
        password: "mvptest-hash",
        role: ROLE.VENDEDOR,
        unitId: 20512,
      };
      await userBusinnes.createBus(input);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.code).toBe(401);
        expect(error.message).toBe("Email ja foi registrado");
      }
    }
  });

  test("Deve retorna sucesso se usuario não colocar parametro obrigatorios", async () => {
    try {
      const input: CreateDTO = {
        name: "vendedor",
        email: "vendedorteste@gmail.com",
        password: "mvptest-hash",
        role: "",
        unitId: 20512,
      };
      await userBusinnes.createBus(input);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.code).toBe(422);
        expect(error.message).toBe("Entre com todos parametros");
      }
    }
  });

  test("Deve retornar sucesso se email estiver no formato invalido", async () => {
    try {
      const input: CreateDTO = {
        name: "vendedor",
        email: "vendedorgmail.com",
        password: "mvptest-hash",
        role: ROLE.VENDEDOR,
        unitId: 20512,
      };
      await userBusinnes.createBus(input);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.code).toBe(422);
        expect(error.message).toBe("Formato de email inválido");
      }
    }
  });

  test("Deve retornar sucesso se password tiver menos que 6 digitos", async () => {
    try {
      const input: CreateDTO = {
        name: "vendedor",
        email: "testeSenha@gmail.com",
        password: "mvpt",
        role: ROLE.VENDEDOR,
        unitId: 20512,
      };
      await userBusinnes.createBus(input);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.code).toBe(401);
        expect(error.message).toBe("Digite senha com no minimo 6 digitos");
      }
    }
  });

  test("Deve retornar sucesso se password invalido", async () => {
    try {
      const input: CreateDTO = {
        name: "vendedor",
        email: "testeSenha@gmail.com",
        password: "senhainvalida",
        role: ROLE.VENDEDOR,
        unitId: 20512,
      };
      await userBusinnes.createBus(input);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.code).toBe(401);
        expect(error.message).toBe("Senha inválida");
      }
    }
  });

  test("Deve retornar sucesso se carregar usuario", async () => {
    const user: OutputSallerDb = {
      id: "id-mock",
      name: "igor",
      email: "igor@gmail.com",
      unitId: 3526,
      directoryId: 0,
    };
    const reponse = await userBusinnes.getSallersBus();
    expect(reponse).toEqual([user]);
  });
});
