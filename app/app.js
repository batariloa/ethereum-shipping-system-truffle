const express = require('express')
const app = express()
const port = 3000
const path = require("path");

  
app.use(express.static(__dirname + '/public'));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "public"));
const shippingRouter = require('./routes/shippingRoutes')

app.use('/',shippingRouter)
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

  })