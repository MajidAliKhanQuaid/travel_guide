module.exports.addAccount = (_db, _userData) => {
  console.log("mongoHelper - addAccount ", _userData);
  return _db.collection("accounts").insertOne(_userData);
};

module.exports.findAccountByUsername = (_db, _username) => {
  console.log("mongoHelper - findAccountByUsername ", _username);
  return _db.collection("accounts").findOne({ username: _username });
};

module.exports,
  (getUsers = (_db) => {
    console.log("mongoHelper - getUsers ");
    return _db.collection("accounts").find().toArray();
  });
