import sqlite3 from "sqlite3";
import { open } from 'sqlite'
import sqlite from "sqlite";
import path from "path";

export async function sqliteConnection() {
    const database = await open({
        filename: path.resolve(__dirname, "..", "database.db"), 
        driver: sqlite3.Database
    });

    return database;
}

