
export interface CreateSalesDTO {
    token:string
    timestamp:string,
    amount:number,
    latLong:string,
}

export interface GetSalesDTO {
    token:string,
    order?:string
}

export interface UpdateSalesDTO {
    token:string
    id:string
    timestamp?:string,
    amount?:number,
    roaming?:boolean
    latLong?:string,
    userUnitId?:number
    directoryId?:number
}

export interface DeleteSalesDTO {
    token:string,
    salesId:string
}



export interface OutputSalesDB {
    id:string,
    unitName:string,
    timestamp:string,
    amount:number,
    roaming:String,
    latLong:string,
    directoryName:string
    directoryId:number
}

export interface OutputSalesByIdDB {
    id:string,
    sellerId:string,
	timestamp:string,
    amount:number,
    roaming:boolean,
    latLong:string,
    userUnitId:number,
	directoryId:number
}



    
