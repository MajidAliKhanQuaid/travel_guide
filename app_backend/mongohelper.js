// const MongoClient = require("mongodb").MongoClient;
// const MONGO_DB_NAME = process.env.MONGO_DB;
// const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION;

// module.exports.addAccount = (_db, _userData) => {
//   console.log("mongoHelper - addAccount ", _username);
//   return _db.collection("accounts").insertOne(_username);
// };

// module.exports.findAccountByUsername = (_db, _username) => {
//   console.log("mongoHelper - findAccountByUsername ", _username);
//   return _db.collection("accounts").findOne({ username: _username });
// };

// module.exports.getUsers = (_db) => {
//   console.log("mongoHelper - getUsers ");
//   return _db.collection("accounts").find().toArray();
// };
