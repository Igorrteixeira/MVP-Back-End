import { SalesBusinnes } from "../src/businnes/SalesBusinnes";
import { SalesDbMock } from "./mocks/SalesDataMock";
import { AutheticatorMock } from "./mocks/AuthenticatorMock";
import { GenerateIdMock } from "./mocks/GenerateIdMock";
import { UserDbMock } from "../test/mocks/UserDataMock";
import { UnitsDBMock } from "./mocks/UnitDataMock";
import {
  CreateSalesDTO,
  DeleteSalesDTO,
  GetSalesDTO,
  OutputSalesDB,
  UpdateSalesDTO,
} from "../src/interfaces/salesDto";
import { CustomError } from "../src/error/CustomError";

describe("Teste HashManager", () => {
  const salesBusiness = new SalesBusinnes(
    new SalesDbMock(),
    new AutheticatorMock(),
    new GenerateIdMock(),
    new UserDbMock(),
    new UnitsDBMock()
  );

  test("Deve retonar sucesso se venda for realizada", async () => {
    const sales: CreateSalesDTO = {
      token: "token-mock-vendedor",
      timestamp: "25/12/2022 18:35:15",
      amount: 10,
      latLong: "latLong",
    };
    const response = await salesBusiness.createSaleBus(sales);
    expect(response).toBe("Venda realizada com sucesso");
  });

  test("Deve retonar sucesso buscar vendas", async () => {
    const input: GetSalesDTO = {
      token: "token-mock-vendedor",
    };
    const sales: OutputSalesDB[] = [
      {
        id: "testeid",
        name: "vendedor",
        sellerId: "id-mock",
        unitName: "florianopolis",
        timestamp: "2022-12-18",
        amount: 200,
        roaming: false,
        latLong: "latlong",
        userUnitId: 555,
        directoryName: "SUL",
        directoryId: 30400,
      },
    ];
    const response = await salesBusiness.getSalesBus(input);
    expect(response).toEqual(sales);
  });

  test("Deve retornar sucesso se Alterar venda com sucesso", async () => {
    const input: UpdateSalesDTO = {
      token: "token-mock-vendedor",
      id: "idteste",
      timestamp: "2022-12-10",
    };
    const response = await salesBusiness.updateSaleBus(input);
    expect(response).toEqual("Venda alterada com sucesso");
  });

  test("Deve retonar sucesso se venda for deletada", async () => {
    const input: DeleteSalesDTO = {
      token: "token-mock-gerente",
      salesId: "idteste",
    };
    const response = await salesBusiness.deleteSaleBus(input);
    expect(response).toBe("Venda deleteda com sucesso");
  });

  test("Deve retornar sucesso se vendedor não for autorizado pois so gerente pode deletar", async () => {
    try {
      const input: DeleteSalesDTO = {
        token: "token-mock-vendedor",
        salesId: "idvendedor",
      };
      await salesBusiness.deleteSaleBus(input);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error.code).toBe(403);
        expect(error.message).toBe(
          "Somente gerente esta autorizado para esta ação."
        );
      }
    }
  });
});
