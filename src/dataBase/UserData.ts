import { OutputSerDb } from "../interfaces/userDto";
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
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
                unit_id: user.getUnit(),
                directory_id: user.getDirectory(),
            })
        return "Usuario criado com sucesso"
    }

}