import Header from "./Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AddProduct() {
    const navigate = useNavigate();
    useEffect(()=>
{
    if(!localStorage.getItem('user-info')){
        navigate("/login");
    }
},[]);
    return(
        <>
        <Header/>
        <div>
            <h1>Add Product</h1>
        </div>
        </>
    )
}
export default AddProduct;// src/AddProduct.js