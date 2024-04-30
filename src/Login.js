import { useEffect, useState } from "react";
import { type } from "@testing-library/user-event/dist/type";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./schema/login.schema";
import { json , useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
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
        
    },[]);
    async function signIn(event)
    {
        console.log(email,password);
        let item = {email,password};
        let result = await fetch("http://localhost:8000/api/login",
    {
        method:"post",
        headers:{
            "Content-Type":'Application/json',
            "Accept":'Appicaton/json',
        },
        body:JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem('user-info',JSON.stringify(result));
    navigate("/add");
    }
    return(
       <>
       <Header/>
       <br></br>
       <Card border="danger" className='mx-auto' style={{ width: '25rem'}}>
        <Card.Header>Login Form</Card.Header>
        <Card.Body>
        <form onSubmit={handleSubmit((event)=>signIn(event))}>
                <input type="text" {...register("email")} placeholder="Enter the email" onChange={(e)=>setEmail(e.target.value)} className="form-control" value={email} name="email" />
                {errors.email && <p style={{color: errors.email ? 'red' : 'black'}}>{errors?.email?.message}</p>}
                <br/>
                <input type="password" {...register("password")} placeholder="Enter the password" className="form-control" onChange={(e)=>setPassword(e.target.value)} value={password} name="password" />
                {errors.password && <p style={{color: errors.password ? 'red' : 'black'}}>{errors?.password?.message}</p>
                }
                <br/>
                <button className="btn btn-info" type="submit">Sign In</button>
            </form>
        </Card.Body>
      </Card>
       </>
    );
}
export default Login;// src/App.js