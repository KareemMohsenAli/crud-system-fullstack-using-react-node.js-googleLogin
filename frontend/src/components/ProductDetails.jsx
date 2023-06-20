import axios from "axios";
import React, { useState } from "react";
import Modal from "../components/protal/Modal";
import { Link } from "react-router-dom";

function ProductDetails({
  ProductName,
  ProductDescription,
  price,
  category,
  username,
  image_url,
  createdby,
  productid,
  DeleteResponse,
  setUpdateHander,
  showUserDeatil
  
}) {
  const { sub } = JSON.parse(localStorage.getItem("user"));
  const [modalType,setModalType]=useState('')
  const [modelChangeHandler,setModelChangeHandler]=useState(false)
  const [error, setError] = useState(false);


  const openModelHandlerUpdate=()=>{
    setModelChangeHandler(true)
    setModalType('update')
  }
  const openModelHandlerDelete=()=>{
    setModelChangeHandler(true)
    setModalType('delete')
  }
  const closeModelHandler=()=>{
    setModelChangeHandler(false)
  }
  const deleteHandler=() => {
    axios
    .delete(`http://localhost:5000/deleteproduct/${productid}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      // Handle the response data
      console.log(response.data);
      setModelChangeHandler(false)
      DeleteResponse(true)
      // setProducts(response.data);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
    });
    
  }


  const handleImageError = () => {
    setError(true);
  };
  return (
    <div class="">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 py-14 animate-kemo ">
        {/* mx-auto */}
        <div class=" max-w-2xl lg:mx-0">
          <h6 class="text-3xl font-bold tracking-tight text-gray-900 ">
            {ProductName}
          </h6>
          <p class="mt-2 text-lg leading-8 text-gray-600">
            {ProductDescription}
          </p>
        </div>
        <div class="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10  lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article class="flex max-w-xl flex-col items-start justify-between">
            <div class="flex items-center gap-x-4 text-xs">
              <span class="text-gray-500">
                {parseFloat(
                  price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                )}
                ${" "}
              </span>
              {sub == createdby && (
                <div>
                  <button onClick={openModelHandlerUpdate} class="relative z-10 rounded-full bg-yellow-300 px-4 py-1  hover:-translate-y-2 hover:scale-110 transition duration-500 me-3">
                    Update
                  </button>
                  {modelChangeHandler&&<Modal setUpdateHander={setUpdateHander} productid={productid} deleteHandler={deleteHandler} type={modalType} onClose={closeModelHandler}/>}
                  <button
                    onClick={openModelHandlerDelete}
                    class="relative z-10 rounded-full bg-red-600  px-4 py-1  hover:-translate-y-2 hover:scale-110 transition duration-500 "
                  >
                    Deleted
                  </button>
                </div>
              )}
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <span class="absolute inset-0"></span>
                {category}
              </h3>
            </div>
          <div class="relative mt-8 flex items-center gap-x-4">
              {error ? (
                <span>Error loading profile picture</span>
              ) : (
                <img
                  className="rounded-3xl"
                  width={"60px"}
                  src={image_url}
                  alt="Profile Picture"
                  onError={handleImageError}
                />
              )}
              <div class="text-sm leading-6 mt-10 ">
                <Link to={`/profile/${createdby}`} class="font-semibold text-gray-900 decoration-transparent">{username}</Link>
                {/* <p class="font-semibold text-gray-900 mt-5">{username}</p> */}
                <p class="text-gray-600 mb-5 ">email</p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default ProductDetails;
