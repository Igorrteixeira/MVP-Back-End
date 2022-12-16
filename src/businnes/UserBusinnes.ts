import { UserDb } from "../dataBase/UserData"
import { CustomError, ParametersError, TokenError } from "../error/CustomError"
import { CreateDTO, LoginDTO } from "../interfaces/userDto"
import { User } from "../models/UserModel"
import { Autheticator } from "../services/Authenticator"
import { GenerateId } from "../services/GenerateId"
import { HashManager } from "../services/HashManeger"

export class UserBusinnes {
    constructor(
        private userDb: UserDb,
        private autheticator: Autheticator,
        private hashManeger: HashManager,
        private generateId: GenerateId,
    ) { }

    createBus = async (input: CreateDTO) => {
        const { name, email, password, role, unitId, directoryId }
            = input;
        const validEmail = await this.userDb.getUserEmail(email)
        if (!name || !email || !password || !role) {
            throw new ParametersError()
        }
        if (validEmail) {
            throw new CustomError(401, "Email ja foi registrado");
        }
        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new CustomError(422, "Formato de email inválido")
        }
        if (password.length < 6) {
            throw new CustomError(401, "Digite senha com no minimo 6 digitos")
        }
        // criar validação de unit e directory
        const newPasword = await this.hashManeger.hash(password);
        const id = this.generateId.generateId();
        const newUser = new User(id, name, email, newPasword, role, unitId, directoryId)
        await this.userDb.createUseDb(newUser)
        const response = this.autheticator.generateToken({ id, role });
        return response;
    }

    loginBus = async (input: LoginDTO) => {
        const { email, password } = input;
        const [validEmail] = await this.userDb.getUserEmail(email)
    
        if (!email || !password) {
            throw new ParametersError();
        }
        if (!validEmail ) {
            throw new CustomError(401, "Email inválido");
        }
        const validPassword = await this.hashManeger.compareHash(
            password,
            validEmail.password
        );

        if (!validPassword) {
            throw new CustomError(401, "Senha inválida");
        }
        const result = this.autheticator.generateToken({
            id: validEmail.id,
            role: validEmail.role,
        });
        return result;
    };


}