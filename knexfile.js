// Update with your config settings.

module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    database: "graphql_db",
    user: "root",
    password: "123",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
