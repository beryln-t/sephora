import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export default function EditProductsForm({products}) {
const {productID} = useParams();
const navigate = useNavigate();
const product = products.find(p => p._id === productID);

const [editedProduct, setEditedProduct] = useState(product ? {
  name: product.name,
  price: product.price,
  category: product.category,
  brand: product.brand,
  imgurl: product.imgurl,
  description: product.description
} : {});


const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value
    });
  }

const handleEdit = async () => {
   const response = await fetch(`/api/AdminProduct/${productID}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });
     navigate("/productpage");
  };
    
  

  return (
    <>
      <h1 className="mb-4">Edit Products Page</h1>
     
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price in cents:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={editedProduct.brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imgurl">Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="imgurl"
            name="imgurl"
            value={editedProduct.imgurl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            style={{ resize: "both" }} // make the textarea resizable
          />
        </div>
        <button onClick={handleEdit}  className="btn btn-primary mt-3">Save Changes</button>
     
    </>
  );
}