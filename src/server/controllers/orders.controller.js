const conn = require("../app");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class CustomersController {
  getOrders(req, res) {
    const { token } = req.body;
    const parsedData = jwt.verify(token, "key");
    try {
      let sqlQuery =
        "SELECT orders.id as orderNo, customerName, customerNo, customerAddress, orderNote, DATE_FORMAT(ordered, '%d-%m-%y, %H:%i') as reqDelivery, orderStatus, DATE_FORMAT(ordered, '%d-%m-%y, %H:%i') as orderDate " +
        "FROM orders, customers " +
        "where customers.idCustomer = orders.idCustomer";
      const sqlQuery1 =
        "SELECT productCode, productName, quantity, unit, idOrder " +
        "FROM productlist, products " +
        "where idProduct = productCode";
      conn.query(sqlQuery).then((data) => {
        conn.query(sqlQuery1).then((data1) => {
          if (parsedData.data.admin === 0) {
            data[0] = data[0].filter(
              (el) => el.customerNo === parsedData.data.idUsers
            );
          }
          res.status(200).send({
            order: data[0],
            products: data1[0],
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  confirmOrder(req, res) {
    const { orderId } = req.body;
    conn
      .query("UPDATE orders SET orderStatus = 1 WHERE id = ?", [orderId])
      .then((data) => {
        res.status(200).send("Confirmed!");
      });
  }
}

module.exports = new CustomersController();
