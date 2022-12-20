import {
  OutputSalesDB,
  UpdateSalesDTO,
} from "../../src/interfaces/salesDto";
import { Sales } from "../../src/models/SalesModel";
import { DataBase } from "../../src/dataBase/DataBase";

export class SalesDbMock extends DataBase {
  public static TABLE_SALES = "MVP_SALES";

  createSaleDb = async (sales: Sales) => {
    const user = sales;
    return "Venda realizada com sucesso";
  };

  getAllSalesDb = async (order: string): Promise<OutputSalesDB[]> => {
    const response: OutputSalesDB[] = [
      {
        id: "testeid",
        name:"vendedor",
        sellerId:"id-mock",
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
    return response;
  };

  getSaleDetailsDb = async (
    order: string
  ): Promise<OutputSalesDB[]> => {
    const response: OutputSalesDB[] = [
      {
        id: "testeid",
        name:"vendedor",
        sellerId:"id-mock",
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
    return response;
  };

  updateSaleDb = async (input: UpdateSalesDTO): Promise<string> => {
    const teste = input;
    return "Venda alterada com sucesso";
  };

  deleteSaleDb = async (id: string): Promise<string> => {
    if (id === "idteste") {
      return "Venda deleteda com sucesso";
    } else {
      return "erro";
    }
  };
}
