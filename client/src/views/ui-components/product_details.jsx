import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";


const ProductDetails = () => {
  const [product,setProduct] = useState({})
  const {uid} = useParams()
  console.log(uid)

  useEffect(() => {
    fetch(`http://localhost:4000/parcelApi/see/${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => setProduct(data.parcel))
  }, [])
  
  return (<>
    {product && <div class="main">
      <div class="container dataViewCard">
        <div class="row">
          <div class="dataDiv profile-tab">
            <div class="senderinfo">
              <div class="row">
                <div class="col-md-6">
                  <label>Id:</label>
                </div>
                <div class="col-md-6">
                  <p>{product.SearchId}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Sender Name:</label>
                </div>
                <div class="col-md-6">
                  <p>{product.SenderName}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Sender Number:</label>
                </div>
                <div class="col-md-6">
                  <p>{product.SenderNumber}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Booked from</label>
                </div>
                <div class="col-md-6">
                  <p>{product.BookedFrom && product.BookedFrom.branch}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Paid amount</label>
                </div>
                <div class="col-md-6">
                  <p>{product.PaidAmount}</p>
                </div>
              </div>
            </div>
            <div class="resiverinfo">
              <div class="row">
                <div class="col-md-6">
                  <label>Product type:</label>
                </div>
                <div class="col-md-6">
                  <p>{product.ProductType}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Reciver Name:</label>
                </div>
                <div class="col-md-6">
                  <p>{product.RecieverName}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Reciver Number:</label>
                </div>
                <div class="col-md-6">
                  <p>{product.RecieverNumber}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Send To:</label>
                </div>
                <div class="col-md-6">
                  <p>{product.SendTo && product.SendTo.branch}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>payable amount</label>
                </div>
                <div class="col-md-6">
                  <p>{product.PayableAmount}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Total amount</label>
                </div>
                <div class="col-md-6">
                  <p>{product.TotalCost}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default ProductDetails;
