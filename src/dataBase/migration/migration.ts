import { DataBase } from "../DataBase";

const sales = require("./sales")
const directory =  require("./directorys")
const  units = require("./units")

class Migrations extends DataBase {

    execute = async () => {
        try {
            await this.populateTable()
            console.log("Tables populated successfully.")
            console.log("Migrations completed.")
        } catch (error) {
            console.log("FAILED! Error in migrations...")
            if (error instanceof Error) {
                console.log(error.message)
            }             
        }finally {
            console.log("Ending connection...")
            this.getConnection().destroy()
            console.log("Connection closed graciously.")
        }
    }
    populateTable = async () => {
        await this.getConnection()
        .from('MVP_DIRECTORY')
        .insert(directory)

        await this.getConnection()
        .from('MVP_UNITS')
        .insert(units) 
    }
 
}

const migrations = new Migrations()
migrations.execute()