import React, { useEffect , useState } from 'react'
import Header from './Header'
import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { json, useNavigate } from 'react-router-dom';
function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");  
  const navigate = useNavigate();
  const {
    register, formState: { errors }, handleSubmit
  } = useForm();
  useEffect(()=>{
    if(localStorage.getItem('user-info')){
        navigate("/");
    }
    
},[])
async function onSubmit (data) {
    console.log(data);
    let item={email,password};
    let result2 = await fetch("http://localhost:8000/api/login",
  {
    method: "POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":'application/json',
    },
    body: JSON.stringify(item),
  })
  result2 = await result2.json();
  localStorage.setItem("user-info",JSON.stringify(result2));
  navigate("/");
}
  return (
    <div>
      <Header/>
       <br /><br />
      <Card border="danger" className='mx-auto' style={{ width: '20rem'}}>
        <Card.Header>Login Form</Card.Header>
        <Card.Body>
            <br />
            <input type="email" name='email' onChange={(e)=>setEmail(e.target.value)} className='form-control' placeholder='enter the email'
            {...register("email",{required:true,pattern:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i})}
            style={{ color: errors.email ? 'red' : 'black' }}
            />
            {errors.email && (
        <span style={{ color: 'red' }}>
          {errors.email?.type === 'required' && "email number is required"}
          {errors.email?.type === 'pattern' && "Enter correct email"}
        </span>
      )}
            <br />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} name='password' className='form-control' placeholder='enter the password'
            {...register("password",{required:true,minLength:6,maxLength:20})}
            style={{ color: errors.phone ? 'red' : 'black' }}
            />
           { errors.password &&(
                <span style={{color: 'red'}}>
                {errors.password?.type === 'required' && "password is required"}
                {errors.password?.type === 'minLength' && "Entred password is les than 6 digit"}
                {errors.password?.type === 'maxLength' && "Entered password is more tnan 20 digit"}
                </span>
            )}
            <br />
            <button onClick={handleSubmit(onSubmit)} className='btn btn-primary'>Submit</button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login
