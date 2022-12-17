import { DirectoryDB } from "../dataBase/DirectoryData"
import { SalesDb } from "../dataBase/SalesData"
import { UnitsDB } from "../dataBase/UnitsData"
import { UserDb } from "../dataBase/UserData"
import { TokenError } from "../error/CustomError"
import { CreateSalesDTO, DeleteSalesDTO, UpdateSalesDTO } from "../interfaces/sales.Dto"
import { ROLE } from "../models/UserModel"
import { Autheticator } from "../services/Authenticator"
import { GenerateId } from "../services/GenerateId"

export class SalesBusinnes {
    constructor(
        private salesDb:SalesDb,
        private autheticator:Autheticator,
        private genrateId:GenerateId,
        private userDb:UserDb,
        private unitsDb:UnitsDB,
    ) {}

    getSalesBus = async (token:string) => {
        const validToken = this.autheticator.getTokenData(token)
        const {role,id} = validToken
        const user = await this.userDb.getUserByIdDb(id)
        const units = await this.unitsDb.getUnitDb(user.directoryId)

        if(!validToken) throw new TokenError();

        if(role === ROLE.VENDEDOR){
            return await this.salesDb.getSalesDb(id)   
        }
        if(role === ROLE.GERENTE){
            return await this.salesDb.getSalesDb(user.unitId)
        }
        if(role === ROLE.DIRETOR){
            return await this.salesDb.getSalesDb(units.id)
        }
        if(role === ROLE.DIRETOR_GERAL){
            return await this.salesDb.getAllSalesDb()
        }
    }

    createSaleBus = async (input:CreateSalesDTO) => {
        
    }

    updateSaleBus = async (input:UpdateSalesDTO) => {
        
    }

    deleteSaleBus = async (input:DeleteSalesDTO) => {
        
    }

}