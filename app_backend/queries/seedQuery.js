module.exports.addCity = (_db, _city) => {
  console.log("mongoHelper - addCities ", _city);
  return _db.collection("cities").insertOne(_city);
};

module.exports.find = (_db, _collection, _objKey) => {
  return _db.collection(_collection).find(_objKey);
};

module.exports.findByKey = (_db, _collection, _objKey) => {
  return _db.collection(_collection).findOne(_objKey);
};

module.exports.addToCollection = (_db, _collection, _obj) => {
  return _db.collection(_collection).insertOne(_obj);
};

// {name: 'Aalo Paratha', cityId: '1234', deleted: 0}
module.exports.addFood = (_db, _food) => {
  console.log("mongoHelper - addFood ", _food);
  return _db.collection("foods").insertOne(_food);
};

module.exports.getCitiesByProvince = (_db, _provinceId) => {
  console.log("mongoHelper - getCitiesByProvince ", _provinceId);
  return _db.collection("cities").find({ provinceId: _provinceId }).toArray();
};

module.exp;
