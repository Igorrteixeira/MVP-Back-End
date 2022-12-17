
export interface CreateSalesDTO {
    token:string
    timestamp:Date,
    amount:number,
    latLong:string,
}

export interface UpdateSalesDTO {
    token:string
    timestamp?:Date,
    amount?:number,
    latLong?:string,
    userUnitId?:number
}

export interface DeleteSalesDTO {
    token:string,
    salesId:string
}

export interface OutputSalesDB {
    id:string,
    unitName:string,
    timestamp:Date,
    amount:number,
    roaming:String,
    latLong:string,
    directoryName:string
}
