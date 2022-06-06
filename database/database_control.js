const database = require('better-sqlite3')(__dirname+'/database/SQLiteDatabase.db');
exports.DB = database;

const checkIfUsersTableExists = () => {
    const SelectTable = database.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").get("users");

    if (typeof SelectTable != 'undefined') {
        database.exec("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, email TEXT, registerip TEXT)");
    }
};

const checkDatabase = () => {
    checkIfUsersTableExists();
};

exports.checkDatabase = checkDatabase;
