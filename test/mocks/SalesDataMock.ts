import {
  OutputSalesByIdDB,
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
        unitName: "florianopolis",
        timestamp: "2022-12-18",
        amount: 200,
        roaming: false,
        latLong: "latlong",
        directoryName: "SUL",
        directoryId: 30400,
      },
    ];
    return response;
  };

  getSalesDb = async (
    id: string | number,
    order: string
  ): Promise<OutputSalesDB[]> => {
    const response: OutputSalesDB[] = [
      {
        id: "testeid",
        unitName: "florianopolis",
        timestamp: "2022-12-18",
        amount: 200,
        roaming: false,
        latLong: "latlong",
        directoryName: "SUL",
        directoryId: 30400,
      },
    ];
    return response;
  };

  getSalesByIdDb = async (id: string): Promise<OutputSalesByIdDB> => {
    const [response]: OutputSalesByIdDB[] = [
      {
        id: "idteste",
        sellerId: "idvendedor",
        timestamp: "2022-12-18",
        amount: 200,
        roaming: false,
        latLong: "latlong",
        userUnitId: 555,
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
