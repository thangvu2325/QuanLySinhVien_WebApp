const sql = require("./db.js");
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.role = user.role;
};
User.create = (newUser, result) => {
  console.log(newUser);
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created User: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
User.findByUsername = (username, result) => {
  sql.query(
    `SELECT * FROM Users WHERE username = '${username}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found Users: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Student with the username
      result({ kind: "not_found" }, null);
    }
  );
};
module.exports = User;
