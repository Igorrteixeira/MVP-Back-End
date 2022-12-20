export enum ROLE {
  DIRETOR_GERAL = 'DIRETOR GERAL',
  DIRETOR = 'DIRETOR',
  GERENTE = 'GERENTE',
  VENDEDOR = 'VENDEDOR'
}

export interface UserModel {
  id: string
  name: string,
  email: string,
  password: string,
  role: string,
  unitId?: number,
  directoryId?: number,
}

export class User {
  constructor(private user: UserModel) { }

  getUser() {
    return this.user;
  }

  getId() {
    return this.user.id;
  }

  getName() {
    return this.user.name;
  }

  getEmail() {
    return this.user.email;
  }

  getPassword() {
    return this.user.password;
  }

  getRole() {
    return this.user.role;
  }

  getUnitId() {
    return this.user.unitId;
  }

  getDirectoryId() {
    return this.user.directoryId;
  }
}
