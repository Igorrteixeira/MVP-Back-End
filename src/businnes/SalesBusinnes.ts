import { SalesDb } from "../dataBase/SalesData"
import { TokenError } from "../error/CustomError"
import { CreateSalesDTO, DeleteSalesDTO, UpdateSalesDTO } from "../interfaces/sales.Dto"
import { Autheticator } from "../services/Authenticator"
import { GenerateId } from "../services/GenerateId"

export class SalesBusinnes {
    constructor(
        private salesDb:SalesDb,
        private autheticator:Autheticator,
        private genrateId:GenerateId
    ) {}

    getSalesBus = async (token:string) => {
        const validToken = this.autheticator.getTokenData(token)

        if(!validToken) throw new TokenError();

        const response = await this.salesDb.getSalesDb()
        return response

    }

    createSaleBus = async (input:CreateSalesDTO) => {
        
    }

    updateSaleBus = async (input:UpdateSalesDTO) => {
        
    }

    deleteSaleBus = async (input:DeleteSalesDTO) => {
        
    }

}