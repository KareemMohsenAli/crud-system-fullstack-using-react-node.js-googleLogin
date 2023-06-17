import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';

export default function FormUpdate(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProduct] = useState({
      productName: props.oneProduct.productName,
      productPrice:'',
      productCategory: '',
      productDetails: '',
    });
useEffect(() => {
  setProduct({
    ...products,
    productName: props.oneProduct.productName,
    productPrice: props.oneProduct.productPrice,
    productCategory: props.oneProduct.productCategory,
    productDetails: props.oneProduct.productDetails,
  });
}, [props.oneProduct]);

    const [error, setError] = useState({});
   
    const nameChangeHandler = (e) => {
      const { name, value } = e.target;
      setProduct((prevProducts) => ({
        ...prevProducts,
        [name]: value,
      }));
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    };
    useEffect(()=>{
      props.fillUpForOldData()

      },[props.productid])
  
    const sumbitHandler = (e) => {
      e.preventDefault();
      const validationErrors = {};
      if (products.productName.trim() === "") {
        validationErrors.productName = "Product Name is required";
      }
      if (products.productPrice.trim() === "") {
        validationErrors.productPrice = "Product Price is required";
      }
      if (products.productCategory.trim() === "") {
        validationErrors.productCategory = "Product Category is required";
      }
      if (products.productDetails.trim() === "") {
        validationErrors.productDetails = "Product Details is required";
      }
  
      if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
      } else {
        setError({});
        setProduct({
          productName: "",
          productPrice: "",
          productCategory: "",
          productDetails: "",
        });
        // Submit the form or perform further processing
        console.log("Form submitted:", products);
        console.log(products);
  
        const fetchFromAPI = () => {
          setIsLoading(true);
          axios.put(`http://localhost:5000/updateproduct/${props.productid}`, products, {
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
              // Handle the response data
              console.log(response.data);
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            })
            .catch((error) => {
              // Handle any errors that occur during the request
              setIsLoading(false);
              console.error(error);
            });
        };
        fetchFromAPI();
      }
    };
  return (
    <>
      <form onSubmit={sumbitHandler}>
        <div className="flex flex-col justify-center items-center overflow-y-auto ">
          <div className="m-1">
            <label className=" italic">Product Name</label> <br />
            <input
              name="productName"
              type="text"
              className="border  border-[#1f2937] rounded outline-blue-900 px-2"
              //   value={userData.Name}
              value={products.productName}
              onChange={nameChangeHandler}
            />
            {error.productName && (
              <p className="text-red-900">{error.productName}</p>
            )}
          </div>
          <div className="m-1">
            <label className=" italic">Product Price</label> <br />
            <input
              name="productPrice"
              type="number"
              className="rounded border  border-[#1f2937] outline-blue-900 px-2 "
              //   value={userData.Name}
              value={products.productPrice}
              onChange={nameChangeHandler}
            />
            {error.productPrice && (
              <p className="text-red-900">{error.productPrice}</p>
            )}
          </div>
          <div className="m-1">
            <label className=" italic">Product Category</label> <br />
            <input
              name="productCategory"
              type="text"
              className="rounded border  border-[#1f2937] outline-blue-900 px-2 "
              //   value={userData.Name}
              value={products.productCategory}
              onChange={nameChangeHandler}
            />
            {error.productCategory && (
              <p className="text-red-900">{error.productCategory}</p>
            )}
          </div>
          <div className="m-1">
            <label className=" italic">Product Details</label> <br />
            <textarea
              name="productDetails"
              value={products.productDetails }
              onChange={nameChangeHandler}
              class="resize-none w-80 h-20 outline-blue-900 px-2 border border-[#1f2937] rounded"
            ></textarea>
            {error.productDetails && (
              <p className="text-red-900">{error.productDetails}</p>
            )}
          </div>
          {isLoading ? (
            <div class="spinner-border mb-5" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="m-3">
              <button
                className=" me-5 border rounded-3xl bg-[#1f2937] text-[white] px-4 py-1 hover:bg-blue-900 hover:-translate-y-2 hover:scale-110 transition duration-500"
                type="submit"
              >
                submit
              </button>
              <button
              onClick={props.onClose}
                className=" border rounded-3xl bg-[#1f2937] text-[white] px-4 py-1 hover:bg-blue-900 hover:-translate-y-2 hover:scale-110 transition duration-500"
              
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  )
}
