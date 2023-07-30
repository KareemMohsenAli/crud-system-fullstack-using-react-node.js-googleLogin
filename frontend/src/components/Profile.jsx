import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import { useParams } from "react-router-dom";
function Profile() {
  const { userId } = useParams();
  console.log(userId);
  const { picture, name, email, sub } =
    JSON.parse(localStorage.getItem("user")) ?? {};
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/userproducts/${userId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data, "karkar");
        setProducts(response.data);
        console.log();
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }, [userId]);

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
    <main class="profile-page animate-kemo3 ">
      <section class="relative block h-500-px ">
        <div class="absolute top-0 w-full h-full bg-center bg-cover bg-[#1f2937]">
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-blueGray-200 ">
        <div class="container mx-auto px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div class="px-6 pb-5">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div class="relative">
                    {products.length > 0 && (
                      <img
                        width={"150px"}
                        alt="..."
                        src={products[0].image_url}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div class="text-center mt-20">
                <h3 class="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {products.length > 0 ? products[0].username : ""}
                </h3>
                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {email}
                </div>
              </div>
            </div>
          </div>
        </div>
        {allproducts}
      </section>
    </main>
  );
}

export default Profile;
