import { SalesDb } from "../dataBase/SalesData"
import { UnitsDB } from "../dataBase/UnitsData"
import { UserDb } from "../dataBase/UserData"
import { CustomError, IdError, ParametersError, TokenError } from "../error/CustomError"
import { CreateSalesDTO, DeleteSalesDTO, GetSalesDTO, UpdateSalesDTO } from "../interfaces/sales.Dto"
import { Sales } from "../models/SalesModel"
import { ROLE, User } from "../models/UserModel"
import { Autheticator } from "../services/Authenticator"
import { CorrectDate } from "../services/CorrectData"
import { GenerateId } from "../services/GenerateId"

export class SalesBusinnes {
    constructor(
        private salesDb: SalesDb,
        private autheticator: Autheticator,
        private genrateId: GenerateId,
        private userDb: UserDb,
        private unitsDb: UnitsDB,
    ) { }

    getSalesBus = async (input:GetSalesDTO) => {
        const validToken = this.autheticator.getTokenData(input.token)
        const { role, id } = validToken
        const getUser = await this.userDb.getUserByIdDb(id)
        const user = new User(getUser)

        if (!validToken) throw new TokenError();

        if (role === ROLE.VENDEDOR) {
            return await this.salesDb.getSalesDb(id,input.order)
        }
        if (role === ROLE.GERENTE) {
            return await this.salesDb.getSalesDb(user.getUnitId(),input.order)
        }
        if (role === ROLE.DIRETOR) {
            console.log(user.getDirectoryId())
            return await this.salesDb.getSalesDb(user.getDirectoryId(),input.order)
        }
        if (role === ROLE.DIRETOR_GERAL) {
            return await this.salesDb.getAllSalesDb(input.order)
        }
    }

    createSaleBus = async (input: CreateSalesDTO) => {

        const { token, timestamp, amount, latLong } = input
        let roaming: boolean = false
        const validToken = this.autheticator.getTokenData(token)
        const validUnit = await this.unitsDb.getUnitByLatLongDb(latLong)
        const getUser = await this.userDb.getUserByIdDb(validToken.id)
        const user = new User(getUser)
        
        if (!validToken) throw new TokenError();

        if (!token || !timestamp || !amount || !latLong) throw new ParametersError();

        if (!validUnit) throw new CustomError(401, "Unidade invalida");

        if (validUnit.id !== user.getUnitId()) roaming = true

        const id = this.genrateId.generateId()
        const newDate = new CorrectDate().sendDateDB(String(timestamp))
        console.log(newDate)
        const newSales = new Sales({
            id,
            sellerId: validToken.id,
            timestamp:newDate,
            amount,
            roaming,
            latLong,
            userUnitId: validUnit.id,
            directoryId: validUnit.directoryId
        })
        const response = await this.salesDb.createSaleDb(newSales)
        return response
    }

    updateSaleBus = async (input: UpdateSalesDTO) => {
        const validToken = this.autheticator.getTokenData(input.token)
        const validSales = this.salesDb.getSalesByIdDb(input.id)
        if (!validToken) throw new TokenError()
        if (!validSales) throw new IdError()

        const response = await this.salesDb.updateSaleDb(input)
        return response

    }

    deleteSaleBus = async (input: DeleteSalesDTO) => {
        const { token, salesId } = input
        const validToken = this.autheticator.getTokenData(token)
        const validSales = await this.salesDb.getSalesByIdDb(salesId)

        if (!validToken) throw new TokenError()
        if (!salesId) throw new IdError()
        if (validToken.role !== ROLE.GERENTE) {
            throw new CustomError(403, "Somente gerente esta autorizado para esta ação.")
        }
        if (!validSales) {
            throw new CustomError(403, "Venda não encontrada")
        }
        const response = await this.salesDb.deleteSaleDb(input.salesId)
        return response
    }

}