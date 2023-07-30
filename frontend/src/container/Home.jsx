import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";
import From from "../components/Form";
import axios from "axios";
function Home() {
  // const [error, setError] = useState(false);
  const[showUserDeatil,setShowUserDeatil]=useState(true)
  const [DeleteHandler,setDeleteHandler]=useState(false)
  const [updateHandler,setUpdateHander]=useState(false)
  const [products, setProducts] = useState([]);
  // const handleImageError = () => {
  //   setError(true);
  // };
  const DeleteResponse=()=>{

  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/usersproducts", {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }, [DeleteHandler,updateHandler]);

  const allproducts = products.map((product) => {
    return (
      <ProductDetails
        ProductName={product.productName}
        ProductDescription={product.productDetails}
        price={product.productPrice}
        category={product.productCategory}
        username={product.username}
        image_url={product.image_url}
        createdby={product.createdby}
        productid={product.id}
        ProductImages={product.productImages}
        DeleteResponse={setDeleteHandler}
        setUpdateHander={setUpdateHander}
        showUserDeatil={showUserDeatil}
      />
    );
  });

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gray-100">
        {/* <h1 class="text-center flex justify-center py-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl  px-4  hover:bg-blue-900 hover:-translate-y-2 hover:scale-100 hover:text-white transition duration-700">
          Add Product
        </h1> */}

        {/* <From adduProductReflect={adduProductReflect} /> */}

        <h6 class="text-center flex justify-center py-3 text-4xl font-bold tracking-tight text-gray-900 px-4  hover:bg-blue-600 hover:translate-y-1 hover:scale-100 hover:text-white transition duration-700">
          All Products
        </h6>

        {allproducts}
      </div>
    </>
  );
}

export default Home;
