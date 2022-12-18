import { Request, Response } from "express";
import { UnitsDB } from "../dataBase/UnitsData";

export class UnitsController {
    constructor(private unitsDb: UnitsDB) { }

    getUnits = async (req: Request, res: Response) => {
        try {
            const response = await this.unitsDb.getAllUnitsDb()
            res.status(202).send({ response: response })
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage)
        }
    }
}