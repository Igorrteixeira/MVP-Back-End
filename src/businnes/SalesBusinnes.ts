import { DirectoryDB } from "../dataBase/DirectoryData"
import { SalesDb } from "../dataBase/SalesData"
import { UnitsDB } from "../dataBase/UnitsData"
import { UserDb } from "../dataBase/UserData"
import { CustomError, IdError, ParametersError, TokenError } from "../error/CustomError"
import { CreateSalesDTO, DeleteSalesDTO, UpdateSalesDTO } from "../interfaces/sales.Dto"
import { Sales } from "../models/SalesModel"
import { ROLE, User } from "../models/UserModel"
import { Autheticator } from "../services/Authenticator"
import { GenerateId } from "../services/GenerateId"

export class SalesBusinnes {
    constructor(
        private salesDb: SalesDb,
        private autheticator: Autheticator,
        private genrateId: GenerateId,
        private userDb: UserDb,
        private unitsDb: UnitsDB,
    ) { }

    getSalesBus = async (token: string) => {
        const validToken = this.autheticator.getTokenData(token)
        const { role, id } = validToken
        const getUser = await this.userDb.getUserByIdDb(id)
        const user = new User(getUser)

        if (!validToken) throw new TokenError();

        if (role === ROLE.VENDEDOR) {
            return await this.salesDb.getSalesDb(id)
        }
        if (role === ROLE.GERENTE) {
            return await this.salesDb.getSalesDb(user.getUnitId())
        }
        if (role === ROLE.DIRETOR) {
            console.log(user.getDirectoryId())
            return await this.salesDb.getSalesDb(user.getDirectoryId())
        }
        if (role === ROLE.DIRETOR_GERAL) {
            return await this.salesDb.getAllSalesDb()
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

        const newSales = new Sales({
            id,
            sellerId: validToken.id,
            timestamp,
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
        const validSales = this.salesDb.getSalesByIdDb(Number(input.id))
        console.log(validSales)
        if (!validToken) throw new TokenError()
        if (!validSales) throw new IdError()

        const response = await this.salesDb.updateSaleDb(input)
        return response

    }

    deleteSaleBus = async (input: DeleteSalesDTO) => {
        const { token, salesId } = input
        const validToken = this.autheticator.getTokenData(token)

        if (!validToken) throw new TokenError()
        if (!salesId) throw new IdError()
        if (validToken.role === ROLE.VENDEDOR) {
            throw new CustomError(403, "Ususario não autorizado, somente gerente e diretor.")
        }

        const response = await this.salesDb.deleteSaleDb(input.salesId)
        return response
    }

}