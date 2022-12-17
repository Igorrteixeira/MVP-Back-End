import { DataBase } from "./DataBase";

interface OutputDirectoryDB {
    id:string,
    directoryName:string
}

export class DirectoryDB extends DataBase {
    // constructor(parameters) {}
    public static TABLE_DIRECTORY = "MVP_DIRECTORY"
    getDirectoryDb = async (id:number):Promise<OutputDirectoryDB> => {
        const [response]:OutputDirectoryDB[] = await this.getConnection()
        .from(DirectoryDB.TABLE_DIRECTORY)
        .select()
        .where({id})
        return response
    }
}