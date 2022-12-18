import { OutputSerDb, OutputSallerDb } from "../interfaces/userDto";
import { User } from "../models/UserModel";
import { DataBase } from "./DataBase"

export class UserDb extends DataBase {
    // constructor(parameters) { }
    public static TABLE_USERS = "MVP_USER";

    getUserByIdDb = async (id: string): Promise<OutputSerDb> => {
        const [result]: OutputSerDb[] = await this.getConnection()
            .from(UserDb.TABLE_USERS)
            .select()
            .where({ id })
        return result
    }

    getSallers = async (): Promise<OutputSallerDb[]> => {
        const result: OutputSallerDb[] = await this.getConnection()
            .from(UserDb.TABLE_USERS)
            .select("id", "name", "email", "unitId", "directoryId")
        return result
    }

    getUserEmail = async (email: string): Promise<OutputSerDb[]> => {
        const result: OutputSerDb[] = await this.getConnection()
            .from(UserDb.TABLE_USERS)
            .select()
            .where({ email })

        return result
    }

    createUseDb = async (user: User) => {
        await this.getConnection()
            .from(UserDb.TABLE_USERS)
            .insert(user.getUser())
        return "Usuario criado com sucesso"
    }

}