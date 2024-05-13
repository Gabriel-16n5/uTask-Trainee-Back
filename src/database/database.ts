import pg, { ClientConfig } from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg

const configDatabase:ClientConfig = {
  connectionString: process.env.DATABASE_URL
};

const connection = new Pool(configDatabase);

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

export default connection

console.log("banco conectado e rodando")