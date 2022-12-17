import { DataBase } from "./DataBase";

interface OutputUnitsDB {
    id:number,
    unitName:string
    latLong:string,
    directoryId:number
}

export class UnitsDB extends DataBase {
    // constructor(parameters) {}
    public static TABLE_UNITS = "MVP_UNITS"

    getUnitDb = async (id:number):Promise<OutputUnitsDB> => {
        const [response]:OutputUnitsDB[] = await this.getConnection()
        .from(UnitsDB.TABLE_UNITS)
        .select()
        .where({id})
        .orWhere("directoryId",id)
        return response
    }
}