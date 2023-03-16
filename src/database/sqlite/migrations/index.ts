import { createUsers } from "./createUsers";
import { sqliteConnection } from "..";

export async function migrationsRun(){

    const schemas = [ 
        createUsers
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.log(error));
}