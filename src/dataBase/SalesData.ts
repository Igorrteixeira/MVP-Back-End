import { OutputSalesDB } from "../interfaces/sales.Dto"
import { Sales } from "../models/SalesModel"
import { DataBase } from "./DataBase"

export class SalesDb extends DataBase {
    // constructor(parameters) {}

    public static TABLE_SALES = "MVP_SALES"

    createSaleDb = async (sales: Sales) => {
        console.log(sales.getSales())
        await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .insert(sales.getSales())
        return "Venda realizada com sucesso"
    }

    getAllSalesDb = async (): Promise<OutputSalesDB[]> => {
        const response: OutputSalesDB[] = await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .select(
                "MVP_SALES.id",
                "MVP_USER.name",
                "MVP_UNITS.unitName",
                "MVP_SALES.timestamp",
                "MVP_SALES.amount",
                "MVP_SALES.roaming",
                "MVP_SALES.latLong",
                "MVP_DIRECTORY.directoryName"
            )
            .innerJoin("MVP_USER", "MVP_USER.id", "MVP_SALES.sellerId")
            .innerJoin("MVP_UNITS", "MVP_UNITS.id", "MVP_SALES.userUnitId")
            .innerJoin("MVP_DIRECTORY", "MVP_DIRECTORY.id", "MVP_UNITS.directoryId")
        return response
    }

    getSalesDb = async (id: string | number): Promise<OutputSalesDB[]> => {
        const response: OutputSalesDB[] = await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .select(
                "MVP_SALES.id",
                "MVP_USER.name",
                "MVP_UNITS.unitName",
                "MVP_SALES.timestamp",
                "MVP_SALES.amount",
                "MVP_SALES.roaming",
                "MVP_SALES.latLong",
                "MVP_DIRECTORY.directoryName"
            )
            .innerJoin("MVP_USER", "MVP_USER.id", "MVP_SALES.sellerId")
            .innerJoin("MVP_UNITS", "MVP_UNITS.id", "MVP_SALES.userUnitId")
            .innerJoin("MVP_DIRECTORY", "MVP_DIRECTORY.id", "MVP_UNITS.directoryId")
            .where("sellerId", id)
            .orWhere("userUnitId", id)

        return response
    }

    updateSaleDb = async () => {
        await this.getConnection()
            .from(SalesDb.TABLE_SALES)
    }

    deleteSaleDb = async () => {
        await this.getConnection()
            .from(SalesDb.TABLE_SALES)
    }

}