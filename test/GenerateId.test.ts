import { GenerateIdMock } from "../test/mocks/GenerateIdMock";

describe("Teste HashManager", () => {
  test("Deve retornar sucesso se gerar um id", async () => {
    const idTeste = new GenerateIdMock().generateId();
    expect(idTeste).toBe("id-mock");
  });
});
