import Database from "./sequelize.js";

const db = new Database();
db.authenticate();

export default db;