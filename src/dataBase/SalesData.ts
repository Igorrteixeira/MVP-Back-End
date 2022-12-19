import { OutputSalesDB, UpdateSalesDTO } from "../interfaces/salesDto"
import { Sales } from "../models/SalesModel"
import { DataBase } from "./DataBase"

export class SalesDb extends DataBase {

    public static TABLE_SALES = "MVP_SALES"

    createSaleDb = async (sales: Sales) => {
        await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .insert(sales.getSales())
        return "Venda realizada com sucesso"
    }

    getAllSalesDb = async (order: string): Promise<OutputSalesDB[]> => {
        const response: OutputSalesDB[] = await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .select(
                "MVP_SALES.id",
                "MVP_USER.name",
                "MVP_UNITS.unitName",
                "MVP_SALES.sellerId",
                "MVP_SALES.timestamp",
                "MVP_SALES.amount",
                "MVP_SALES.roaming",
                "MVP_SALES.latLong",
                "MVP_SALES.directoryId",
                "MVP_DIRECTORY.directoryName"
            )
            .innerJoin("MVP_USER", "MVP_USER.id", "MVP_SALES.sellerId")
            .innerJoin("MVP_UNITS", "MVP_UNITS.id", "MVP_SALES.userUnitId")
            .innerJoin("MVP_DIRECTORY", "MVP_DIRECTORY.id", "MVP_UNITS.directoryId")
            .orderBy("timestamp", order)
        return response
    }

    getSaleDetailsDb = async (id: string): Promise<OutputSalesDB[]> => {
        console.log(id)
        const response: OutputSalesDB[] = await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .select(
                "MVP_SALES.id",
                "MVP_USER.name",
                "MVP_UNITS.unitName",
                "MVP_SALES.sellerId",
                "MVP_SALES.timestamp",
                "MVP_SALES.amount",
                "MVP_SALES.roaming",
                "MVP_SALES.latLong",
                "MVP_SALES.directoryId",
                "MVP_DIRECTORY.directoryName"
            )
            .innerJoin("MVP_USER", "MVP_USER.id", "MVP_SALES.sellerId")
            .innerJoin("MVP_UNITS", "MVP_UNITS.id", "MVP_SALES.userUnitId")
            .innerJoin("MVP_DIRECTORY", "MVP_DIRECTORY.id", "MVP_UNITS.directoryId")
            .where("MVP_SALES.id", id)
        return response
    }

    updateSaleDb = async (input: UpdateSalesDTO): Promise<string> => {
        console.log(input.userUnitId, "no db")
        await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .update({
                timestamp: input.timestamp,
                amount: input.amount,
                roaming: input.roaming,
                latLong: input.latLong,
                userUnitId: input.userUnitId,
                directoryId: input.directoryId
            })
            .where("id", input.id)
        return "Venda alterada com sucesso"
    }

    deleteSaleDb = async (id: string): Promise<string> => {
        await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .delete()
            .where({ id })
        return "Venda deleteda com sucesso"
    }

}