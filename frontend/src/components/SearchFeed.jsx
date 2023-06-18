import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails';
function SearchFeed() {
    const {SearchTerm}=useParams()
    const [products,setProducts] = useState()
    useEffect(() => {
        axios
          .get(`http://localhost:5000/searchbyproduct?search=${SearchTerm}`, {
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
      }, [SearchTerm]);

      const allproducts =products &&products.map((product) => {
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
   <h6 class="  text-4xl py-3  font-bold tracking-tight text-gray-900  px-4  hover:bg-blue-600 hover:translate-y-1 hover:scale-100 hover:text-white transition duration-700">
   Search For Result for : {SearchTerm} 
        </h6>
 {allproducts}
   </>
  )
}

export default SearchFeed