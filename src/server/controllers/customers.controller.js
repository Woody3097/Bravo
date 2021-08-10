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
          "where dayslist.idCustomer = customers.idCustomer";
        sqlQuery +=
          sortWay === "ASC"
            ? " order by customerName ASC"
            : " order by customerName DESC";
        conn.query(sqlQuery).then((data) => {
          res.status(200).send(data[0]);
        });
      } else {
        const idUser = parsedData.data.idUsers;
        let sqlQuery =
          "select customerNo, customerName, customerAddress, dayslist.dayNames from customers, dayslist " +
          "where idUser = ? and dayslist.idCustomer = customers.idCustomer";
        sqlQuery +=
          sortWay === "ASC"
            ? " order by customerName ASC"
            : " order by customerName DESC";
        conn.query(sqlQuery, [idUser]).then((data) => {
          res.status(200).send(data[0]);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async searchCustomers(req, res) {
    const sqlQuery =
      "SELECT customerNo, customerName, customerAddress FROM customers" +
      " where customerNo like ? OR customerName like ? OR customerAddress like ?";
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

  async isAdmin(req, res) {
    const { token } = req.body;
    const parsedData = jwt.verify(token, "key");
    await res.status(200).json(parsedData.data.admin);
  }
}

module.exports = new CustomersController();
