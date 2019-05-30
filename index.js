const express = require("express");
const app = express();
const massive = require('massive');
const products_controller = require('./products_controller')
require("dotenv").config();

app.use(express.json());

app.post("/api/products", products_controller.create)
app.get("/api/products", products_controller.getAll)
app.get("/api/products/:id", products_controller.getOne)
app.put("/api/products/:id", products_controller.update)
app.delete("/api/products/:id", products_controller.delete)

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Database Connected :)')
})
.catch(error => console.log(error)) 

const {SERVER_PORT} = process.env;
app.listen(process.env.SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
