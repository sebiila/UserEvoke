const Pool = require("pg").Pool
const userPool = new Pool({
    user: "postgres",
    password: "Sebu@1997",
    database: "users",
    host: "localhost",
    dialect: "postgres",
    port:5432

})

const adminPool = new Pool({
    user: "postgres",
    password: "Sebu@1997",
    database: "admin_db",  
    host: "localhost",
    dialect: "postgres",
    port: 5432
});

module.exports = {
    userPool,
    adminPool
};