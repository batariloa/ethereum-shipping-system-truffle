const express = require('express')
const app = express()
const port = 3000

const shippingRouter = require('./routes/shippingRoutes')

app.use('/',shippingRouter)
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })