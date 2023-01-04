import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const port  = process.env.DB_PORT as unknown
const newPort = port as number 

export class DataBase {
  private connection: null | Knex = null;
  protected getConnection() {
    if (!this.connection) {
      this.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: newPort,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_SCHEMA,
        },
      });
    }
    return this.connection;
  }
}


