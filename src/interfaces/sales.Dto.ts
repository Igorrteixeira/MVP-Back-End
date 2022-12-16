
export interface CreateSalesDTO {
    sellerId:string,
    timestamp:Date,
    amount:number,
    latLong:string,
    unitId:number
}

export interface UpdateSalesDTO {
    sellerId:string,
    timestamp?:Date,
    amount?:number,
    latLong?:string,
    unitId?:number
}

export interface DeleteSalesDTO {
    token:string,
    salesId:string
}

export interface OutputSalesDB {
    id:string,
    sellerId:string,
    timestamp:Date,
    amount:number,
    latLong:string,
    unitId:number
}