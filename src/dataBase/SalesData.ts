import { OutputSalesDB } from "../interfaces/sales.Dto"
import { DataBase } from "./DataBase"

export class SalesDb extends DataBase {
    // constructor(parameters) {}

    public static TABLE_SALES = "MVP_SALES"

    getAllSalesDb = async ():Promise<OutputSalesDB[]> => {
       const response:OutputSalesDB[] = await this.getConnection()
        .from(SalesDb.TABLE_SALES)
        .select()
        return response
    }

    getSalesDb = async (id:string | number):Promise<OutputSalesDB[]> => {
        const response:OutputSalesDB[] = await this.getConnection()
         .from(SalesDb.TABLE_SALES)
         .select()
         .where("sellerId",id)
         .orWhere("unitId",id)
         
         return response
     }




    createSaleDb = async () => {
        await this.getConnection()
        .from(SalesDb.TABLE_SALES)
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