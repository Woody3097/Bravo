const conn = require("../app");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class CustomersController {
  async getCustomers(req, res) {
    const { token, sortWay } = req.body;
    const parsedData = jwt.verify(token, "key");
    try {
      if (parsedData.data.admin) {
        let sqlQuery =
          "select customerNo, customerName, customerAddress, dayslist.dayNames from customers, dayslist " +
          "where customers.customerNo = dayslist.idCustomer";
        sqlQuery +=
          sortWay === "ASC"
            ? " order by customerName ASC"
            : " order by customerName DESC";
        conn.query(sqlQuery).then((data) => {
          res.status(200).send(data[0]);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async searchCustomers(req, res) {
    const sqlQuery =
      "select customerNo, customerName, customerAddress, dayslist.dayNames from customers, dayslist " +
      " where (customerNo like ? OR customerName like ? OR customerAddress like ?) AND customers.customerNo = dayslist.idCustomer";
    const { searchStr } = req.body;
    conn.query(sqlQuery, [searchStr, searchStr, searchStr]).then((data) => {
      res.status(200).send(data[0]);
    });
  }

  async completeCustomer(req, res) {
    const sqlQuery =
      "Update customers " +
      "set customerNo = ?, customerName = ?, customerAddress = ? " +
      "where idUser = ?";
    const { token, data } = req.body;
    const parsedData = jwt.verify(token, "key");
    conn
      .query(sqlQuery, [
        parsedData.data.idUsers,
        data.customerName,
        data.customerAddress,
        parsedData.data.idUsers,
      ])
      .then((data1) => {
        let sqlQuery1 =
          "select idCustomer " + "from customers " + "where idUser = ?";
        conn.query(sqlQuery1, [parsedData.data.idUsers]).then((data2) => {
          conn
            .query("update dayslist set dayNames = ? where idCustomer = ?", [
              data.dayNames,
              data2[0][0].idCustomer,
            ])
            .then((data3) => {
              res.status(200);
            });
        });
      })
      .then((res1) => {});
  }

  async editCustomers(req, res) {
    const sqlQuery =
      "Update customers " +
      "set customerNo = ?, customerName = ?, customerAddress = ? " +
      "where idUser = ?";
    const { data } = req.body;
    conn
      .query(sqlQuery, [
        data.customerNo,
        data.customerName,
        data.customerAddress,
        data.customerNo,
      ])
      .then((data1) => {
        let sqlQuery1 =
          "select idCustomer " + "from customers " + "where idUser = ?";
        conn.query(sqlQuery1, [data.customerNo]).then((data2) => {
          conn
            .query("update dayslist set dayNames = ? where idCustomer = ?", [
              data.dayNames,
              data2[0][0].idCustomer,
            ])
            .then((data3) => {});
        });
      })
      .then((res1) => {});
  }

  isAdmin(req, res) {
    debugger;
    const { token } = req.body;
    try {
      const parsedData = jwt.verify(token, "key");
      res.status(200).send(parsedData.data.admin.toString());
    } catch (err) {
      res.status(401).send("hi");
    }
  }
}

module.exports = new CustomersController();
