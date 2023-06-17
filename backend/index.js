const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 5000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
app.use(cors(), express.json());

// Endpoint to store user data
app.post("/users", (req, res) => {
  const { username, image, id } = req.body;
  console.log(username, image, id);
  const query = "SELECT * FROM users WHERE id=?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      return res.json({ error: "query error" });
    }
    if (result.length > 0) {
      return res.json({ message: "user is already exists" });
    } else {
      const insertQuery = `INSERT INTO users (username,image_url,id) VALUES ('${username}', '${image}', '${id}')`;
      connection.query(insertQuery, (err, result) => {
        if (err) {
          return res.json({ error: "query error" });
        }
        return res.json({
          message: "done",
        });
      });
    }
  });
});

app.post("/addproducts/:userid", (req, res) => {
  const { userid } = req.params;
  const { productName, productPrice, productCategory, productDetails } =
    req.body;
  console.log(userid);
  const query =
    "INSERT INTO products (productName, productPrice, productCategory, productDetails,createdby) VALUES (?, ?, ?, ?,?)";
  connection.execute(
    query,
    [productName, productPrice, productCategory, productDetails, userid],
    (error, result) => {
      if (error) {
        return res.json({ message: "Query Error" });
      }
      return res.json({ message: "product is added successfully" });
    }
  );
});

app.get("/usersproducts", (req, res) => {
  const query =
    "SELECT users.*, products.* FROM users JOIN products ON users.id = products.createdby ";
  connection.execute(query, (error, resullt) => {
    if (error) {
      return res.json({ message: "Query Error" });
    }
    res.json(resullt);
  });
});

app.delete("/deleteproduct/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = "DELETE FROM products WHERE id=?";
  connection.execute(query, [id], (error, resullt) => {
    if (error) {
      return res.json({ message: "Query Error" });
    }
    if (resullt.affectedRows === 0) {
      return res.json({ message: "ID is not valid" });
    } else {
      return res.json({ message: "product is successfully deleted" });
    }
  });
});

app.put("/updateproduct/:productid", (req, res) => {
  const { productid } = req.params;
  const { productName, productPrice, productCategory, productDetails } =
    req.body;
  console.log(
    productName,
    productPrice,
    productCategory,
    productDetails,
    productid
  );
  const query =
    "UPDATE products SET productName=? , productPrice=? , productCategory=? , productDetails=? WHERE id= ?";
  connection.execute(
    query,
    [productName, productPrice, productCategory, productDetails, productid],
    (error, result) => {
      if (error) {
        return res.json({ message: "Query Error" });
      }
      if (result.affectedRows === 0) {
        return res.json({ message: "ID is not valid" });
      } else {
        return res.json({ message: "product is successfully Updated!" });
      }
    }
  );
});

app.get("/getproduct/:productid", (req, res) => {
  const {productid} = req.params
  console.log(productid)
  const query = "SELECT * from products where id=? ";
  connection.execute(query, [productid],(error, result) => {
    if (error) {
      return res.json({ message: "Query Error" });
    }
    if(result.affectedRows===0){
      return res.json({ message: "ID is not valid" });
    }else {
      return res.json({result:result});
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
