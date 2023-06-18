import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import classes from "./Modal.module.css";
import FormUpdate from "../FormUpdate";
import axios from "axios";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  let modalContent;
  if (props.type === "delete") {
    modalContent = (
      <>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p className="text-center text-black">Are You Sure To Delete the Product!!</p>
        </div>
        <footer className={classes.actions}>
          <button
            className="me-3 border rounded-3xl bg-[#1f2937] text-[white] px-4 py-1 hover:bg-blue-900 hover:-translate-y-2 hover:scale-110 transition duration-500"
            onClick={props.deleteHandler}
          >
            Delete
          </button>
          <button
            className="border rounded-3xl bg-[#1f2937] text-[white] px-4 py-1 hover:bg-blue-900 hover:-translate-y-2 hover:scale-110 transition duration-500"
            onClick={props.onClose}
          >
            close
          </button>
        </footer>
      </>
    );
  } else if (props.type === "update") {
    modalContent = (
      <>
      
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        < FormUpdate setUpdateHander={props.setUpdateHander} oneProduct={props.oneProduct} fillUpForOldData={props.fillUpForOldData} productid={props.productid} onClose={props.onClose}/>
     
      </>
    );
  }
  return <Card className={classes.modal}>{modalContent}</Card>;
};

const Modal = (props) => {
  const [oneProduct,setOneProduct] = useState('')
 const fillUpForOldData=()=>{
  axios.get(`http://localhost:5000/getproduct/${props.productid}`,{headers: { "Content-Type": "application/json" },})
  .then((response) => {
    // Handle the response data
    console.log(response.data.result,'kemo');
      setOneProduct(response.data.result[0])

  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.error(error);
  });
 }

console.log(oneProduct &&oneProduct,'aa')
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          onClose={props.onClose}
          type={props.type}
          deleteHandler={props.deleteHandler}
          productid={props.productid}
          fillUpForOldData={fillUpForOldData}
          oneProduct={oneProduct}
          setUpdateHander={props.setUpdateHander}
        />,
        document.getElementById("model-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
