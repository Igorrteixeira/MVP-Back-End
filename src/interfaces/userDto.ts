export interface CreateDTO {
     name: string,
     email: string,
     password: string,
     role: string,
     unitId?: string,
     directoryId?: string,
}

export interface LoginDTO {
     email: string,
     password: string,
}


export interface OutputSerDb {
     id: string
     name: string,
     email: string,
     password: string,
     role: string,
     unitId: string,
     directoryId: string,
}
