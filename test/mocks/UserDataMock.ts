import {
  OutputSerDb,
  OutputSallerDb,
} from "../../src/interfaces/userDto";
import { ROLE, User } from "../../src/models/UserModel";
import { DataBase } from "../../src/dataBase/DataBase";

interface ICreateDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: string;
  unitId: number;
  directoryId: number;
}

export class UserDbMock extends DataBase {
  // constructor(parameters) { }
  public static TABLE_USERS = "MVP_USER";

  getUserByIdDb = async (id: string): Promise<OutputSerDb | undefined> => {
    if (id === "id-mock") {
      const [adminUser]: OutputSerDb[] = [
        {
          id: "id-mock",
          name: "vendedor",
          email: "vendedor@gmail.com",
          password: "token-mock-vendedor",
          role: ROLE.VENDEDOR,
          unitId: 3526,
          directoryId: 0,
        },
      ];
      return adminUser;
    }
  };

  getSallers = async (): Promise<OutputSallerDb[]> => {
    const user: OutputSallerDb[] = [
      {
        id: "id-mock",
        name: "igor",
        email: "igor@gmail.com",
        unitId: 3526,
        directoryId: 0,
      },
    ];
    return user;
  };

  getUserEmail = async (email: string): Promise<OutputSerDb[] | undefined> => {
    if (email === "vendedor@gmail.com") {
      const adminUser: OutputSerDb[] = [
        {
          id: "id-mock",
          name: "vendedor",
          email: "vendedor@gmail.com",
          password: "mvptest-hash",
          role: ROLE.VENDEDOR,
          unitId: 3526,
          directoryId: 0,
        },
      ];
      return adminUser;
    } else {
      return [];
    }
  };

  createUseDb = async (input: User) => {
    const user: OutputSerDb = {
      id: input.getId(),
      name: input.getName(),
      email: input.getEmail(),
      password: input.getPassword(),
      role: input.getRole(),
      unitId: input.getUnitId()!,
      directoryId: input.getDirectoryId()!,
    };
    return "Usuario criado com sucesso";
  };
}
