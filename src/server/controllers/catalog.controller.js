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

  sortCatalog(req, res) {
    console.log(1);
    let sqlQuery =
      "SELECT id as productCode, productName, productAvailability FROM products" +
      " where productAvailability like ?";
    const sqlQueryPart = " or productAvailability like ?";
    const sortParamsArray = req.body;
    for (let i = 0; i < sortParamsArray.length - 2; i++) {
      sqlQuery += sqlQueryPart;
    }
    conn.query(sqlQuery, sortParamsArray).then((data) => {
      conn
        .query("SELECT unitName, unitPrice, idProduct FROM bravo.units")
        .then((res2) => {
          res.status(200).send({ products: data[0], units: res2[0] });
        });
    });
  }

  deleteProduct(req, res) {
    const { id } = req.body;
    const sqlQuery = "Delete from products where id=?";
    const sqlQuery1 = "Delete from units where idProduct = ?";

    conn.query(sqlQuery1, [id]).then((data) => {
      conn.query(sqlQuery, [id]).then((data1) => {
        res.status(200).json("TEXT");
      });
    });
  }

  editProduct(req, res) {
    const { catalogEl } = req.body;
    const sqlQuery =
      "update products set productName = ?, productAvailability = ? where id = ?";
    const sqlQuery2 = "delete from units where idProduct = ?";
    const sqlQuery1 =
      "insert units(unitName, unitPrice, idProduct) values(?,?,?)";
    conn.query(sqlQuery2, [catalogEl.productCode]).then((data) => {
      conn
        .query(sqlQuery, [
          catalogEl.productName,
          catalogEl.productAvailability,
          catalogEl.productCode,
        ])
        .then((data1) => {
          Object.entries(catalogEl.units).forEach((el) => {
            conn.query(sqlQuery1, [
              el[1].unitName,
              el[1].unitPrice.toString(),
              catalogEl.productCode,
            ]);
          });
          res.status(200);
        });
    });
  }

  addProduct(req, res) {
    const { catalogEl } = req.body;
    const sqlQuery =
      "insert products(productCode, productName, productAvailability) values(-1, ?, ?)";
    const sqlQuery1 =
      "insert units(unitName, unitPrice, idProduct) values(?, ?, ?)";

    conn
      .query(sqlQuery, [catalogEl.productName, catalogEl.productAvailability])
      .then((data1) => {
        conn
          .query("update products set productCode = ? where id = ?", [
            data1[0].insertId,
            data1[0].insertId,
          ])
          .then((data2) => {
            Object.entries(catalogEl.units).forEach((el) => {
              conn.query(sqlQuery1, [
                el[1].unitName,
                el[1].unitPrice.toString(),
                data1[0].insertId,
              ]);
            });
            res.status(200);
          });
      });
  }

  replaceCatalog(req, res) {
    const { replaceData } = req.body;
    console.log(replaceData);
    const sqlQuery =
      "insert products(productCode, productName, productAvailability) values(?, ?, ?)";
    const sqlQuery1 =
      "insert units(unitName, unitPrice, idProduct) values(?, ?, ?)";
    const sqlQuery2 = "delete from units";
    const sqlQuery3 = "delete from products";
    conn.query(sqlQuery2).then((resp) => {
      conn.query(sqlQuery3).then((resp2) => {
        replaceData.forEach((catalogEl) => {
          conn
            .query(sqlQuery, [
              getRandomInt(10),
              catalogEl.productName,
              catalogEl.productAvailability,
            ])
            .then((data1) => {
              conn
                .query("update products set productCode = ? where id = ?", [
                  data1[0].insertId,
                  data1[0].insertId,
                ])
                .then((data2) => {
                  Object.entries(catalogEl.units).forEach((el) => {
                    conn.query(sqlQuery1, [
                      el[1].unitName,
                      el[1].unitPrice.toString(),
                      data1[0].insertId,
                    ]);
                  });
                });
            });
        });
        res.status(200);
      });
    });
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max) * -1;
}
module.exports = new CustomersController();
