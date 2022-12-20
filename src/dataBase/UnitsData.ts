import { DataBase } from "./DataBase";

interface OutputUnitsDB {
    id: number,
    unitName: string
    latLong: string,
    directoryId: number
}
interface GetUnitDto {
    id: number,
    directoryId: number
}

export class UnitsDB extends DataBase {

    public static TABLE_UNITS = "MVP_UNITS"

    getUnitDb = async (input: GetUnitDto): Promise<OutputUnitsDB> => {
        const [response]: OutputUnitsDB[] = await this.getConnection()
            .from(UnitsDB.TABLE_UNITS)
            .select()
            .where("id", input.id)
            .orWhere("directoryId", input.directoryId)
        return response
    }

    getUnitByLatLongDb = async (latLong: string): Promise<OutputUnitsDB> => {
        const [response]: OutputUnitsDB[] = await this.getConnection()
            .from(UnitsDB.TABLE_UNITS)
            .select()
            .where({ latLong })
        return response
    }

    getAllUnitsDb = async (): Promise<OutputUnitsDB[]> => {
        const response: OutputUnitsDB[] = await this.getConnection()
            .from(UnitsDB.TABLE_UNITS)
            .select()
        return response
    }
}