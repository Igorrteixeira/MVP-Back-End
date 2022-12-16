export enum ROLE {
    DIRETOR_GERAL ='DIRETOR GERAL',
    DIRETOR = 'DIRETOR',
    GERENTE = 'GERENTE',
    VENDEDOR = 'VENDEDOR'
  }
  
  export class User {
    constructor(
      private id: string,
      private name: string,
      private email: string,
      private password: string,
      private role: ROLE,
      private unit?:string,
      private directory?:string,
    ) {}
    getId() {
      return this.id;
    }
  
    getName() {
      return this.name;
    }
  
    getEmail() {
      return this.email;
    }
  
    getPassword() {
      return this.password;
    }
  
    getRole() {
      return this.role;
    }

    getUnit() {
      return this.unit;
    }

    getDirectory() {
      return this.directory;
    }
  }
  