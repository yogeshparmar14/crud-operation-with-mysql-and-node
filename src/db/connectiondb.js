
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Yogesh1!@#$%",
  database: "restaurantapp"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});;

function dbQuery(query, value) {
  return new Promise((resolve, reject) => {
    con.query(
      query,
      value,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
}

module.exports = { dbQuery };