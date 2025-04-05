// server/models/userModel.js

const db = require('../config/database');

class User {
  static createUser(username, password, email, callback) {
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.run(query, [username, password, email], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, username, email });
    });
  }

  static deleteUser(callback){
    const query = 'DELETE FROM users';
    db.run(query,[],function(err){
      if (err){
        return callback(err);
      }
      callback(null,{message: 'All users deleted successfully'});
    })
  }

  static getUsers(callback) {
    const query = 'SELECT * FROM users';
    db.all(query, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }
}

module.exports = User;
