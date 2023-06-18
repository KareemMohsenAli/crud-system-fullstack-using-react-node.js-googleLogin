import axios from "axios";
import React, { useState } from "react";
import ImageUploadForm from "./ImageUploadForm";

function Form({adduProductReflect}) {
    const [comfirm,setComfirm]=useState('')
  const { sub } = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProduct] = useState({
    productName: "",
    productPrice: "",
    productCategory: "",
    productDetails: "",
  });
  const [error, setError] = useState({});
  //   const nameChangeHandler = (e) => {
  //     setProduct({ ...products, productName: e.target.value });
  //   };
  //   const sumbitHandler = (e) => {
  //     e.preventDefault();
  //     if (products.productName.length=== 0) {
  //         setError({
  //             ...error, productNameErr:"Must be not Empty"
  //         })

  //     }else{
  //         setError({
  //             ...error, productNameErr:""
  //         })
  //     }

  //   };
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
        axios
          .post(`http://localhost:5000/addproducts/${sub}`, products, {
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
      // adduProductReflect(fetchFromAPI)
    }
  };

  return (
    <>
       {/* <ImageUploadForm/> */}
      <form className=" bg-gray-100" onSubmit={sumbitHandler}>
      <h6 class="text-center flex justify-center py-3 text-4xl font-bold tracking-tight text-gray-900   px-4  hover:bg-blue-600 hover:translate-y-1 hover:scale-100 hover:text-white transition duration-700">
          Add Product
        </h6>
        <div className="flex flex-col justify-center items-center max-h-screen   ">
          
          <div className="m-3 animate-kemo2">
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
              <p className="text-red-500">{error.productName}</p>
            )}
          </div>
          <div className="m-3 animate-kemo3">
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
              <p className="text-red-500">{error.productPrice}</p>
            )}
          </div>
          <div className="m-3 animate-kemo4">
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
              <p className="text-red-500">{error.productCategory}</p>
            )}
          </div>
          <div className="m-3 animate-kemo5">
            <label className=" italic">Product Details</label> <br />
            <textarea
              name="productDetails"
              value={products.productDetails}
              onChange={nameChangeHandler}
              class="resize-none w-80 h-40 outline-blue-900 px-2 border border-[#1f2937] rounded"
            ></textarea>
            {error.productDetails && (
              <p className="text-red-500">{error.productDetails}</p>
            )}
          </div>
          {isLoading ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="m-3">
              <button
                className=" border rounded-3xl bg-[#1f2937] text-[white] px-4 py-1 hover:bg-blue-600 hover:-translate-y-2 hover:scale-110 transition duration-500"
                type="submit"
              >
                submit
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default Form;
