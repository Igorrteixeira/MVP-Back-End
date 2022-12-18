
interface SalesModel {
    id:string,
    sellerId:string,
    timestamp:string,
    amount:number,
    roaming:boolean,
    latLong:string ,
    userUnitId:number,
    directoryId:number
}


export class Sales {
    constructor(
        private sales:SalesModel,  
    ) {}
    getId(){
        return this.sales.id
    }
    getSelleId(){
        return this.sales.sellerId
    }
    getAmount(){
        return this.sales.amount
    }
    getLatLong(){
        return this.sales.latLong
    }
    getUnitId(){
        return this.sales.userUnitId
    }
    getSales(){
        return this.sales
    }
  
}