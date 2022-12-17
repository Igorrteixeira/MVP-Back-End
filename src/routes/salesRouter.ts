import { Router } from "express";
import { SalesBusinnes } from "../businnes/SalesBusinnes";
import { SalesControlles } from "../controller/SalesController";
import { SalesDb } from "../dataBase/SalesData";
import { UnitsDB } from "../dataBase/UnitsData";
import { UserDb } from "../dataBase/UserData";
import { Autheticator } from "../services/Authenticator";
import { GenerateId } from "../services/GenerateId";

export const salesRouter = Router()

const salesController = new SalesControlles(
    new SalesBusinnes(
        new SalesDb(),
        new Autheticator(),
        new GenerateId(),
        new UserDb(),
        new UnitsDB()
    )
)

salesRouter.get("",salesController.getSales)