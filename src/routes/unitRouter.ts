import { Router } from "express";
import { UnitsController } from "../controller/UnitsController";
import { UnitsDB } from "../dataBase/UnitsData";


export const unitRouter = Router()

const unitController = new UnitsController(
    new UnitsDB()
)

unitRouter.get("", unitController.getUnits)