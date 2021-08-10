const cors = require("cors");

const express = require("express");
const userRouter = require("./routes/user.routes");
const customerRouter = require("./routes/customers.routes");
const conn = require("./app");
const catalogRouter = require("./routes/catalog.routes");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", customerRouter);
app.use("/api", catalogRouter);

conn.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log("Ok");
  }
});

app.listen(PORT, () => console.log("Started!"));
