const conn = require("../app");
const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");
require("dotenv").config();

class UserController {
  sendMail(verificationCode) {
    let transporter = mailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_MAIL_PASS,
      },
    });

    transporter.sendMail({
      from: process.env.USER_MAIL,
      to: "nicolay.danch@gmail.com",
      subject: "Verification Code",
      text: `Your verification code: ${verificationCode}`,
    });
  }

  addUser(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).send("All input is required");
      }
      conn
        .query("select * from users where email = ?", [email])
        .then((data) => {
          if (data[0].length > 0) {
            return res.status(409).send("User Already Exist. Please Login");
          }
        });

      conn.query("Insert users(email) values (?)", [email]).then((data) => {
        conn
          .query("Insert customers(idUser) values(?)", [data[0].insertId])
          .then((data1) => {
            conn
              .query("Insert dayslist(idCustomer) values(?)", [
                data1[0].insertId,
              ])
              .then((data2) => {
                const token = jwt.sign(
                  {
                    email,
                    verificationCode: "",
                    data: { idUsers: data[0].insertId, email, admin: 0 },
                  },
                  "key",
                  {
                    expiresIn: "2h",
                  }
                );
                res.status(201).send({ token });
              });
          });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).send("All input is required");
      }
      conn
        .query("select * from users where email = ?", [email])
        .then(async (data) => {
          if (data[0].length > 0) {
            const verificationCode = Math.floor(Math.random() * 1000000);

            // let transporter = await mailer.createTransport({
            //   service: "hotmail",
            //   auth: {
            //     user: process.env.USER_MAIL,
            //     pass: process.env.USER_MAIL_PASS,
            //   },
            // });
            //
            // await transporter.sendMail({
            //   from: process.env.USER_MAIL,
            //   to: "nicolay.danch@gmail.com",
            //   subject: "Verification Code",
            //   text: `Your verification code: ${verificationCode}`
            // });
            const token = jwt.sign(
              { email, verificationCode, data: data[0][0] },
              "key",
              {
                expiresIn: "2h",
              }
            );
            res.status(200).send({ token });
          } else res.status(400).send("Wrong email");
        });
    } catch (err) {
      console.log(err);
    }
  }

  verification(req, res) {
    const { token, userCode } = req.body;
    if (!token) {
      res.status(403).send("A token is required for authentication");
    }
    try {
      const parsedData = jwt.verify(token, "key");
      res.status(200).send(parsedData.verificationCode.toString() === userCode);
    } catch (err) {
      res.status(401).send("Invalid Token");
    }
  }

  tokenExpired(req, res) {
    const { token } = req.body;
    if (token == null) {
      res.status(401).send("No token!");
    }
    try {
      jwt.verify(token, "key");
      res.status(200).send(true);
    } catch (err) {
      res.status(401).send("error!");
    }
  }

  getCustomerId(req, res) {
    const { token } = req.body;
    const parsedData = jwt.verify(token, "key");

    const sqlQuery = "select idCustomer from customers where idUser = ?";

    conn.query(sqlQuery, [parsedData.data.idUsers]).then((data) => {
      res.status(200).send(data);
    });
  }
}

module.exports = new UserController();
