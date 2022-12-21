import { DataBase } from "../DataBase";
import { DirectoryDB } from "../DirectoryData";
import { SalesDb } from "../SalesData";
import { UnitsDB } from "../UnitsData";
import { UserDb } from "../UserData";

const directory = require("./data/directorys")
const units = require("./data/units")
const users = require("./data/users")
const sales = require("./data/sales")

class Migrations extends DataBase {

    execute = async () => {
        try {
            console.log("Creating tables...")
            await this.createTables()
            console.log("Tables created successfully.")

            console.log("Populating tables with seed....")
            await this.populateTable()
            console.log("Tables populated successfully.")
            
            console.log("Migrations completed.")
        } catch (error) {
            console.log("FAILED! Error in migrations...")
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            console.log("Ending connection...")
            this.getConnection().destroy()
            console.log("Connection closed graciously.")
        }
    }

    createTables = async () => {
        await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS ${DirectoryDB.TABLE_DIRECTORY} (
            id INT PRIMARY KEY AUTO_INCREMENT,
            directoryName VARCHAR(255) NOT NULL
        ); 
        
        CREATE TABLE IF NOT EXISTS ${UnitsDB.TABLE_UNITS} (
            id INT PRIMARY KEY AUTO_INCREMENT,
            unitName VARCHAR(255) NOT NULL,
            latLong VARCHAR(255) NOT NULL,
            directoryId INT NOT NULL,
            FOREIGN KEY (directoryId) REFERENCES MVP_DIRECTORY(id)
        );

        CREATE TABLE IF NOT EXISTS ${UserDb.TABLE_USERS} (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            unitId INT DEFAULT NULL,
            directoryId INT DEFAULT NULL,
            FOREIGN KEY (unitId) REFERENCES MVP_UNITS(id),
            FOREIGN KEY (directoryId) REFERENCES MVP_DIRECTORY(id)
        );

        CREATE TABLE IF NOT EXISTS ${SalesDb.TABLE_SALES} (
            id VARCHAR(255)PRIMARY KEY,
            sellerId VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP,
            amount FLOAT NOT NULL,
            roaming BOOLEAN DEFAULT FALSE,
            latLong VARCHAR(255) ,
            userUnitId INT ,
            directoryId INT,
            FOREIGN KEY (sellerId) REFERENCES MVP_USER(id),
            FOREIGN KEY (userUnitId) REFERENCES MVP_UNITS(id),
            FOREIGN KEY (directoryId) REFERENCES MVP_DIRECTORY(id)
        );
        `)
    }

    populateTable = async () => {
        await this.getConnection()
            .from(DirectoryDB.TABLE_DIRECTORY)
            .insert(directory)

        await this.getConnection()
            .from(UnitsDB.TABLE_UNITS)
            .insert(units)

        await this.getConnection()
            .from(UserDb.TABLE_USERS)
            .insert(users)

        await this.getConnection()
            .from(SalesDb.TABLE_SALES)
            .insert(sales)
    }

}

const migrations = new Migrations()
migrations.execute()