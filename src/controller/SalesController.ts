import { Request, Response } from "express";
import { SalesBusinnes } from "../businnes/SalesBusinnes";
import { CreateSalesDTO, DeleteSalesDTO, UpdateSalesDTO } from "../interfaces/sales.Dto";

export class SalesControlles {
    constructor(private salesBus: SalesBusinnes) { }

    getSales = async (req: Request, res: Response) => {
        try {
            const token: string = req.headers.authorization
            const response = await this.salesBus.getSalesBus(token)
            res.status(202).send({ response: response })
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage)
        }
    }

    createSale = async (req: Request, res: Response) => {
        try {
            const input: CreateSalesDTO = req.body
            const response = await this.salesBus.createSaleBus(input)
            res.status(202).send({ response: response })
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage)
        }
    }

    updateSale = async (req: Request, res: Response) => {
        try {
            const input: UpdateSalesDTO = req.body
            const response = await this.salesBus.updateSaleBus(input)
            res.status(202).send({ response: response })
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage)
        }
    }

    deleteSale = async (req: Request, res: Response) => {
        try {
            const input: DeleteSalesDTO = {
                token: req.headers.authorization,
                salesId: req.params.id
            }
            const response = await this.salesBus.deleteSaleBus(input)
            res.status(202).send({ response: response })
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage)
        }
    }

}