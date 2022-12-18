import { Request, Response } from "express"
import { UserBusinnes } from "../businnes/UserBusinnes"
import { CreateDTO, LoginDTO } from "../interfaces/userDto"

export class UserController {
    constructor(private userBus: UserBusinnes) { }

    getSallers = async (req: Request, res: Response) => {
        try {
            const response = await this.userBus.getSallersBus()
            res.status(202).send({ response: response })
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage)
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const input: CreateDTO = req.body
            const response = await this.userBus.createBus(input)
            res.status(202).send({ response: response })
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage)
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const input: LoginDTO = req.body
            const response = await this.userBus.loginBus(input)
            res.status(202).send({ token: response })
        } catch (error) {
            res.status(error.code || 500).send(error.message || error.sqlMessage)
        }
    }

}