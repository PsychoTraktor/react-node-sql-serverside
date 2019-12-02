const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM `products` WHERE 1';

//make connection
const con = mysql.createConnection({
    host: "localhost",
    user: "roligep",
    password: "kiscica",
    database: "react_node"
});

//connect database
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});

//connect to root
app.get('/', (req, res) => {
    res.send('go to /products for products')
});

//get everything from table
app.get('/products', (req, res) => {
    con.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if (err) {
            return (err)
        } else {
            return res.json({
                data: results
            })
        }
    })
});

//app product
app.get('/products/add', (req, res) => {
    const { product, ar } = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO products (product, ar) VALUES('${product}', ${ar})`;

    con.query(INSERT_PRODUCTS_QUERY, (err, results)=>{
        if (err) {
            return (err)
        } else {
            return res.send("succesfully added a product")
        }
    })
    
    console.log(product, ar);
});









app.listen('3001', () => {
    console.log('server runs on port:3001')
});