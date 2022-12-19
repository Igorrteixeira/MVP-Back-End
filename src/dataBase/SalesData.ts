import { OutputSalesByIdDB, OutputSalesDB, UpdateSalesDTO } from "../interfaces/salesDto"
import { Sales } from "../models/SalesModel"
import { DataBase } from "./DataBase"

export class SalesDb extends DataBase {
    // constructor(parameters) {}

    public static TABLE_SALES = "MVP_SALES"

    createSaleDb = async (sales: Sales) => {
        await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .insert(sales.getSales())
        return "Venda realizada com sucesso"
    }

    getAllSalesDb = async (order:string): Promise<OutputSalesDB[]> => {
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
            .orderBy("timestamp",order)
        return response
    }

    getSalesDb = async (id: string | number,order:string): Promise<OutputSalesDB[]> => {
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
            .orWhere("MVP_SALES.directoryId", id)
            .orderBy("timestamp",order)    
        return response
    }

    getSalesByIdDb = async (id: string): Promise<OutputSalesByIdDB> => {
        const [response]: OutputSalesByIdDB[] = await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .select()
            .where({ id })
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