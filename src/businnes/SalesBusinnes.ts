import { SalesDb } from "../dataBase/SalesData";
import { UnitsDB } from "../dataBase/UnitsData";
import { UserDb } from "../dataBase/UserData";
import { Sales } from "../models/SalesModel";
import { ROLE, User } from "../models/UserModel";
import { Autheticator } from "../services/Authenticator";
import { CorrectDate } from "../services/CorrectData";
import { GenerateId } from "../services/GenerateId";
import { CustomError, IdError, ParametersError, TokenError } from "../error/CustomError";
import {
    CreateSalesDTO, DeleteSalesDTO, GetSalesDTO, SalesDetailsDTO, UpdateSalesDTO,
} from "../interfaces/salesDto";

export class SalesBusinnes {
    constructor(
        private salesDb: SalesDb,
        private autheticator: Autheticator,
        private genrateId: GenerateId,
        private userDb: UserDb,
        private unitsDb: UnitsDB
    ) { }

    getSalesBus = async (input: GetSalesDTO) => {
        const { token, order, sellerName, unitName, directoryName, initialDate, finalDate } = input;
        const validToken = this.autheticator.getTokenData(token);
        const getUser = await this.userDb.getUserByIdDb(validToken.id);
        const user = new User(getUser);

        if (!validToken) throw new TokenError();

        let response = await this.salesDb.getAllSalesDb(order);

        let newReponse = response.map((sales) => {
            sales.timestamp = sales.timestamp.toLocaleString();
            return sales;
        });

        if (sellerName) newReponse = response.filter((sale) => sale.name === sellerName);

        if (unitName) newReponse = response.filter((sale) => sale.unitName === unitName);

        if (directoryName) newReponse = response.filter((sale) => sale.directoryName === unitName);

        if (initialDate) {
            newReponse = response.filter(sale => {
                const convertDate = new CorrectDate().convertDate
                return convertDate(sale.timestamp) >= convertDate(initialDate) && convertDate(sale.timestamp) <= convertDate(finalDate)
            })
        }

        switch (validToken.role) {
            case ROLE.VENDEDOR:
                return newReponse.filter((sale) => sale.sellerId === user.getId());
            case ROLE.GERENTE:
                return newReponse.filter((sale) => sale.userUnitId === user.getUnitId());
            case ROLE.DIRETOR:
                return newReponse.filter((sale) => sale.directoryId === user.getDirectoryId());
            case ROLE.DIRETOR_GERAL:
                return newReponse;
            default:
                break;
        }
    };

    getSalesDetailsBus = async (input: SalesDetailsDTO) => {
        const validToken = this.autheticator.getTokenData(input.token);
        const response = await this.salesDb.getSaleDetailsDb(input.id);
        if (!validToken) throw new TokenError();
        if (response.length < 1) throw new IdError();
        return response;
    };

    createSaleBus = async (input: CreateSalesDTO) => {
        const { token, timestamp, amount, latLong } = input;
        let roaming: boolean = false;
        const validToken = this.autheticator.getTokenData(token);
        const validUnit = await this.unitsDb.getUnitByLatLongDb(latLong);
        const getUser = await this.userDb.getUserByIdDb(validToken.id);

        const user = new User(getUser);

        if (!validToken) throw new TokenError();

        if (!token || !timestamp || !amount || !latLong)
            throw new ParametersError();

        if (!validUnit) throw new CustomError(401, "Unidade invalida");

        if (validUnit.id !== user.getUnitId()) roaming = true;

        const id = this.genrateId.generateId();
        const newDate = new CorrectDate().sendDateDB(String(timestamp));
        console.log(newDate);
        const newSales = new Sales({
            id,
            sellerId: validToken.id,
            timestamp: newDate,
            amount,
            roaming,
            latLong,
            userUnitId: validUnit.id,
            directoryId: validUnit.directoryId,
        });
        const response = await this.salesDb.createSaleDb(newSales);
        return response;
    };

    updateSaleBus = async (input: UpdateSalesDTO) => {
        const validToken = this.autheticator.getTokenData(input.token);
        const validSales = await this.salesDb.getSaleDetailsDb(input.id);

        if (!validToken) throw new TokenError();
        if (validSales.length < 1) throw new IdError();

        const response = await this.salesDb.updateSaleDb(input);
        return response;
    };

    deleteSaleBus = async (input: DeleteSalesDTO) => {
        const { token, salesId } = input;
        const validToken = this.autheticator.getTokenData(token);
        const validSales = await this.salesDb.getSaleDetailsDb(input.salesId);

        if (!validToken) throw new TokenError();
        if (validSales.length < 1) throw new IdError();
        if (validToken.role !== ROLE.GERENTE) {
            throw new CustomError(403, "Somente gerente esta autorizado para esta ação.");
        }
        if (!validSales) {
            throw new CustomError(403, "Venda não encontrada");
        }
        const response = await this.salesDb.deleteSaleDb(input.salesId);
        return response;
    };
}
