const conn = require("../app");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class CustomersController {
  getCatalog(req, res) {
    const { token } = req.body;
    const parsedData = jwt.verify(token, "key");
    try {
      if (parsedData.data.admin) {
        let sqlQuery =
          "select id as productCode, productName, productAvailability from products";
        // sqlQuery +=
        //   sortWay === "ASC"
        //     ? " order by customerName ASC"
        //     : " order by customerName DESC";
        conn.query(sqlQuery).then((res1) => {
          conn
            .query("SELECT unitName, unitPrice, idProduct FROM bravo.units")
            .then((res2) => {
              res.status(200).send({ products: res1[0], units: res2[0] });
            });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  searchCatalog(req, res) {
    const sqlQuery =
      "SELECT id as productCode, productName, productAvailability FROM products" +
      " where productCode like ? OR productName like ?";
    const { searchStr } = req.body;
    conn.query(sqlQuery, [searchStr, searchStr]).then((data) => {
      conn
        .query("SELECT unitName, unitPrice, idProduct FROM bravo.units")
        .then((res2) => {
          res.status(200).send({ products: data[0], units: res2[0] });
        });
    });
  }

  deleteCatalogEl(req, res) {
    const { id } = req.body;
    const sqlQuery = "Delete from products where id=?";
    const sqlQuery1 = "Delete from units where idProduct = ?";

    conn.query(sqlQuery1, [id]).then((data) => {
      conn.query(sqlQuery, [id]).then((data1) => {
        res.status(200).send("Deleted!");
      });
    });
  }
}
module.exports = new CustomersController();
