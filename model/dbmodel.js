import mysql from 'mysql2';

const dbModel = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "backend_intern_assign"
});

export default dbModel;