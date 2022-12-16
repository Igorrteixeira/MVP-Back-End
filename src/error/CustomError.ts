export class CustomError extends Error {
    constructor(
      public code: number, message: string) {
      super(message);
    }
  }

  export class TokenError extends Error {
    constructor(public code:number= 403, message:string = "Token inválido") {
      super(message);
    }
  }

  export class ParametersError extends Error {
    constructor(public code:number= 422, message:string = "Entre com todos parametros") {
      super(message);
    }
  }
  