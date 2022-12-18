import { Router } from "express";
import { UserBusinnes } from "../businnes/UserBusinnes";
import { UserController } from "../controller/UserController";
import { UserDb } from "../dataBase/UserData";
import { Autheticator } from "../services/Authenticator";
import { GenerateId } from "../services/GenerateId";
import { HashManager } from "../services/HashManeger";

export const userRouter = Router()

const userController = new UserController(
    new UserBusinnes(
        new UserDb(),
        new Autheticator(),
        new HashManager(),
        new GenerateId(),
    )
)
userRouter.get("/Sallers", userController.getSallers)
userRouter.post("/create", userController.create)
userRouter.post("/login", userController.login)