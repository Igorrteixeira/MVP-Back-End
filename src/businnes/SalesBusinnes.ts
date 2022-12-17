import { DirectoryDB } from "../dataBase/DirectoryData"
import { SalesDb } from "../dataBase/SalesData"
import { UnitsDB } from "../dataBase/UnitsData"
import { UserDb } from "../dataBase/UserData"
import { CustomError, ParametersError, TokenError } from "../error/CustomError"
import { CreateSalesDTO, DeleteSalesDTO, UpdateSalesDTO } from "../interfaces/sales.Dto"
import { Sales } from "../models/SalesModel"
import { ROLE } from "../models/UserModel"
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
        const user = await this.userDb.getUserByIdDb(id)
        const units = await this.unitsDb.getUnitDb(user.directoryId)

        if (!validToken) throw new TokenError();

        if (role === ROLE.VENDEDOR) {
            return await this.salesDb.getSalesDb(id)
        }
        if (role === ROLE.GERENTE) {
            return await this.salesDb.getSalesDb(user.unitId)
        }
        if (role === ROLE.DIRETOR) {
            return await this.salesDb.getSalesDb(units.id)
        }
        if (role === ROLE.DIRETOR_GERAL) {
            return await this.salesDb.getAllSalesDb()
        }
    }

    createSaleBus = async (input: CreateSalesDTO) => {

        const { token, timestamp, amount, latLong } = input
        let roaming: boolean = false
        const date = new Date()
        console.log(date)

        const validToken = this.autheticator.getTokenData(token)
        const validUnit = await this.unitsDb.getUnitByLatLongDb(latLong)
        const user = await this.userDb.getUserByIdDb(validToken.id)

        if (!validToken) throw new TokenError();

        if (!token || !timestamp || !amount || !latLong) throw new ParametersError();

        if (!validUnit) throw new CustomError(401, "Unidade invalida");

        if (validUnit.id !== user.unitId) roaming = true

        const id = this.genrateId.generateId()

        const newSales = new Sales({
            id,
            sellerId: validToken.id,
            timestamp,
            amount,
            roaming,
            latLong,
            userUnitId: validUnit.id
        })
        const response = await this.salesDb.createSaleDb(newSales)
        return response
    }

    updateSaleBus = async (input: UpdateSalesDTO) => {

    }

    deleteSaleBus = async (input: DeleteSalesDTO) => {

    }

}