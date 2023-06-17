import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";
import From from "../components/Form";
import axios from "axios";
function Home() {
  // const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  // const handleImageError = () => {
  //   setError(true);
  // };
  const { picture } = JSON.parse(localStorage.getItem("user"));
  console.log(picture);
  const adduProductReflect=(comfirm)=>{
    

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
  }, []);

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
      />
    );
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200">
        <h1 class="text-center flex justify-center py-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl  px-4  hover:bg-blue-900 hover:-translate-y-2 hover:scale-100 hover:text-white transition duration-700">
          All Products
        </h1>

        <From adduProductReflect={adduProductReflect} />

        <h1 class="text-center flex justify-center py-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl  px-4  hover:bg-blue-900 hover:-translate-y-2 hover:scale-100 hover:text-white transition duration-700">
          All Products
        </h1>
        
        {allproducts}
        {/* {error ? (
        <span>Error loading profile picture</span>
      ) : (
        <img src={picture} alt="Profile Picture" onError={handleImageError} />
      )} */}
      </div>
    </>
  );
}

export default Home;
