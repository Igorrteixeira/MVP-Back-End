import { Request, Response } from "express";
import { SalesBusinnes } from "../businnes/SalesBusinnes";
import {
    CreateSalesDTO,
    DeleteSalesDTO,
    GetSalesDTO,
    SalesDetailsDTO,
    UpdateSalesDTO,
} from "../interfaces/salesDto";

export class SalesControlles {
    constructor(private salesBus: SalesBusinnes) { }

    getSales = async (req: Request, res: Response) => {
        try {
            const input: GetSalesDTO = {
                token: req.headers.authorization,
                sellerName: req.query.sellerName as string,
                unitName: req.query.unitName as string,
                directoryName: req.query.directoryName as string,
                order: req.query.order as string,
                initialDate: req.query.initialDate as string,
                finalDate: req.query.finalDate as string
            };
            const response = await this.salesBus.getSalesBus(input);
            res.status(202).send({ response: response });
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage);
        }
    };

    getSalesDetails = async (req: Request, res: Response) => {
        try {
            const input: SalesDetailsDTO = {
                token: req.headers.authorization,
                id: req.params.id,
            };
            const response = await this.salesBus.getSalesDetailsBus(input);
            res.status(202).send({ response: response });
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage);
        }
    };

    createSale = async (req: Request, res: Response) => {
        try {
            const input: CreateSalesDTO = {
                token: req.headers.authorization,
                timestamp: req.body.timestamp,
                latLong: req.body.latLong,
                amount: req.body.amount,
            };
            const response = await this.salesBus.createSaleBus(input);
            res.status(202).send({ response: response });
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage);
        }
    };

    updateSale = async (req: Request, res: Response) => {
        try {
            const input: UpdateSalesDTO = {
                token: req.headers.authorization,
                id: req.body.id,
                timestamp: req.body.timestamp,
                latLong: req.body.latLong,
                amount: req.body.amount,
                roaming: req.body.roaming,
                userUnitId: req.body.userUnitId,
            };
            const response = await this.salesBus.updateSaleBus(input);
            res.status(202).send({ response: response });
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage);
        }
    };

    deleteSale = async (req: Request, res: Response) => {
        try {
            const input: DeleteSalesDTO = {
                token: req.headers.authorization,
                salesId: req.params.id,
            };
            const response = await this.salesBus.deleteSaleBus(input);
            res.status(202).send({ response: response });
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage);
        }
    };
}
