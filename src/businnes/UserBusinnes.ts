import { UserDb } from "../dataBase/UserData"
import { CustomError, ParametersError, TokenError } from "../error/CustomError"
import { CreateDTO, LoginDTO } from "../interfaces/userDto"
import { ROLE, User } from "../models/UserModel"
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

    getSallersBus = async () => {
        return await this.userDb.getSallers()
    }

    createBus = async (input: CreateDTO) => {
        let { name, email, password, role, unitId, directoryId } = input;
        const validEmail = await this.userDb.getUserEmail(email)
        const roleUpperCase = role.toUpperCase()
        if (!name || !email || !password || !role) {
            throw new ParametersError()
        }
        console.log(roleUpperCase)
        if (validEmail.length > 0) {
            throw new CustomError(401, "Email ja foi registrado");
        }
        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new CustomError(422, "Formato de email inválido")
        }
        if (password.length < 6) {
            throw new CustomError(401, "Digite senha com no minimo 6 digitos")
        }
        if (roleUpperCase === ROLE.VENDEDOR && isNaN(unitId) || roleUpperCase === ROLE.GERENTE && isNaN(unitId)) {
            throw new CustomError(422, "Digite sua unidade")
        }
        if (roleUpperCase === ROLE.DIRETOR && isNaN(directoryId)) {
            throw new CustomError(422, "Digite sua diretoria")
        }

        const newPasword = await this.hashManeger.hash(password);
        const id = this.generateId.generateId();
        const newUser = new User({
            id,
            name,
            email,
            password: newPasword,
            role: roleUpperCase,
            unitId,
            directoryId
        })
        await this.userDb.createUseDb(newUser)
        const response = this.autheticator.generateToken({ id, role });
        return response;
    }

    loginBus = async (input: LoginDTO) => {
        const { email, password } = input;
        const [validEmail] = await this.userDb.getUserEmail(email)
        const user = new User(validEmail)

        if (!email || !password) {
            throw new ParametersError();
        }
        if (!validEmail) {
            throw new CustomError(401, "Email inválido");
        }
        const validPassword = await this.hashManeger.compareHash(
            password,
            user.getPassword()
        );

        if (!validPassword) {
            throw new CustomError(401, "Senha inválida");
        }
        const result = this.autheticator.generateToken({
            id: user.getId(),
            role: user.getRole(),
        });
        return result;
    };


}