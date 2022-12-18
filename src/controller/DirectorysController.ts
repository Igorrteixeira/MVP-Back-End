import { Request, Response } from "express";
import { DirectoryDB } from "../dataBase/DirectoryData";

export class DirectoryController {
    constructor(private directoryDb: DirectoryDB) { }

    getDirectory = async (req: Request, res: Response) => {
        try {
            const response = await this.directoryDb.getDirectoryDb()
            res.status(202).send({ response: response })
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage)
        }
    }
}