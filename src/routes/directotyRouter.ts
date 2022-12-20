import { Router } from "express";
import { DirectoryController } from "../controller/DirectorysController";
import { DirectoryDB } from "../dataBase/DirectoryData";

export const directoryRouter = Router()

const directoryController = new DirectoryController(
    new DirectoryDB()
)

directoryRouter.get("", directoryController.getDirectory)