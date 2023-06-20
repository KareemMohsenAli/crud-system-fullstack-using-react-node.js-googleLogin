const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

const port = 5000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
app.use(cors(), express.json());
app.use("/uploads" , express.static("./uploads"))
//http://localhost:5000/uploads/image-1687091848713-644837018.jpeg
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
  const { productid } = req.params;
  console.log(productid);
  const query = "SELECT * from products where id=? ";
  connection.execute(query, [productid], (error, result) => {
    if (error) {
      return res.json({ message: "Query Error" });
    }
    if (result.affectedRows === 0) {
      return res.json({ message: "ID is not valid" });
    } else {
      return res.json({ result: result });
    }
  });
});

app.get("/searchbyproduct", (req, res) => {
  const { search } = req.query;
  console.log(search);
  const query =
    "SELECT users.*, products.* FROM users JOIN products ON users.id = products.createdby where productName like ?";
  connection.execute(query, [`%${search}%`], (error, result) => {
    if (error) {
      return res.json({ message: "Query Error" });
    }
    if (result.affectedRows === 0) {
      return res.json({ message: "this product not found" });
    } else {
      return res.json(result);
    }
  });
});
//////////////////////////////////////////////////////////////////////////////test
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads/"), // Specify the folder where uploaded files will be stored
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});
const upload = multer({ storage });

app.post("/upload-image", upload.single("image"), (req, res) => {
  const imageFile = req.file;
  // Save the file path or other relevant details in the database
  const filePath = path.join(__dirname, imageFile.path);
  // Insert the file path into the MySQL database
  const sql = "INSERT INTO images (image_data) VALUES (?)";
  connection.execute(sql, [filePath], (error, results) => {
    if (error) {
      console.error("Error inserting file path:", error);
      res.status(500).json({ error: "Error inserting file path" });
    } else {
      console.log("File path inserted successfully");
      res.status(200).json({ message: "File uploaded successfully" });
    }
  });
});

app.get("/get-image", (req, res) => {
  // Retrieve the file path from the MySQL database
  const sql = "SELECT image_data FROM images ORDER BY id DESC LIMIT 1";
  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error retrieving file path:", error);
      res.status(500).json({ error: "Error retrieving file path" });
    } else {
      if (results.length > 0) {
        const filePath = results[0].image_data;
        // Send the image file to the client
        res.setHeader("Content-Type", "image/jpeg"); // Adjust the content type as per your image type
        // Send the image data as the response
        res.send(filePath);
      } else {
        res.status(404).json({ error: "No image found" });
      }
    }
  });
});

app.get("/userproducts/:userid", (req, res) => {
  const { userid } = req.params;
  console.log(userid);
  // const query = "SELECT products.* FROM products where createdby = ?";
  const sql = 'SELECT users.*, products.* FROM users JOIN products ON users.id = products.createdBy WHERE users.id = ?'
  connection.execute(sql, [userid], (error, result) => {
    if (error) {
      return res.json({ message: "Query Error" });
    }
    if (result.affectedRows === 0) {
      return res.json({ message: "this products not found" });
    } else {
      return res.json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
