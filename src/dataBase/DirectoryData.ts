import { DataBase } from "./DataBase";

interface OutputDirectoryDB {
    id:string,
    directoryName:string
}

export class DirectoryDB extends DataBase {
    // constructor(parameters) {}
    public static TABLE_DIRECTORY = "MVP_DIRECTORY"
    getDirectoryDb = async ():Promise<OutputDirectoryDB[]> => {
        const response:OutputDirectoryDB[] = await this.getConnection()
        .from(DirectoryDB.TABLE_DIRECTORY)
        .select()
        return response
    }
}