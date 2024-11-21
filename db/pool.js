const { Pool } = require("pg");
module.exports = new Pool({
connectionString: "postgresql://kirnic:9292Hugo@localhost:5432/spattazura"
  });