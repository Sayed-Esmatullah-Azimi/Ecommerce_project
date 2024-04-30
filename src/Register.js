import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import Header from './Header';
import { useForm } from "react-hook-form";
import { json , useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from "./schema/login.schema";
import { Card } from "react-bootstrap";
function Register() {
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(loginSchema),
      });
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate("/add");
        }
        
    },[])
    async function signUp(event)
    {
        let item = {name,password,email};
        console.log(item);
       let result = await fetch("http://localhost:8000/api/register",
    {
        method:"post",
        body:JSON.stringify(item),
        headers:{
            "Content-Type":'Application/json',
            "Accept":'Application/json',
        }
    })
    result = await result.json();
    localStorage.setItem("user-info",JSON.stringify(result));
    // history.push("/add");
    navigate("/add");
    }
    return(
       <>
       <Header/>
       <br></br>
       <Card border="danger" className='mx-auto' style={{ width: '25rem'}}>
        <Card.Header>Registration Form</Card.Header>
        <Card.Body>
            <form onSubmit={handleSubmit((event)=>signUp(event))}>
                <input type="text" {...register("name")} placeholder="Enter the name" className="form-control" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                {errors.name && <p style={{ color: errors.name ? 'red' : 'black' }}>{errors?.name?.message}</p>}
                <br/>
                <input type="password" {...register("password")} placeholder="Enter the password" className="form-control" onChange={(e)=>setPassword(e.target.value)} value={password} name="password" />
                {errors.password && <p style={{color: errors.password ? 'red' : 'black'}}>{errors?.password?.message}</p>
                }
                <br/>
                <input type="text" {...register("email")} placeholder="Enter the email" onChange={(e)=>setEmail(e.target.value)} className="form-control" value={email} name="email" />
                {errors.email && <p style={{color: errors.email ? 'red' : 'black'}}>{errors?.email?.message}</p>}
                <br/>
                <button className="btn btn-info" type="submit">Sign Up</button>
            </form>
        </Card.Body>
      </Card>
       </>
    );
}
export default Register;// src/Register.js