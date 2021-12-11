const Database = require('better-sqlite3')(__dirname+'/database/SQLiteDatabase.db');
exports.DB = Database;

function CheckIfUsersExists()
{
   const SelectTable = Database.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").get("users");
   
   if(typeof SelectTable != 'undefined')
   {
      Database.exec("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, email TEXT, registerip TEXT)");
   }
}

function CheckDatabase()
{
   CheckIfUsersExists();
}

exports.CheckDatabase = CheckDatabase;
