const path = require('path');

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src','database','database.db')
    },
    migrations: {
      directory: path.resolve(__dirname,'src', 'database','knex', 'migrations')
    },
    useNullAsDefault:true
  }
};

module.exports = config

