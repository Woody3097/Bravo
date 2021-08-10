const cors = require('cors')

const express = require('express');
const userRouter = require('./routes/user.routes');
const customerRouter = require('./routes/customers.routes')
const conn = require('./app')
const middleware = require("./middleware/middleware");

const PORT = 3000;

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', userRouter);
app.use('/api', customerRouter);

conn.connect(err => {
  if(err) {
    console.log(err);
    return err;
  }
  else {
    console.log('Ok')
  }
});

app.listen(PORT, () => console.log("Started!"));
