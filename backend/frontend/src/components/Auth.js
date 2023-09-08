import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';
import './Auth.css' ;
// import redirect from 'react'
// import Navigate from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
function Auth() {
  const navigate = useNavigate();

  const [register,setRegister] = useState(false);
  const [email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [username,setUsername] = useState("")

  const formswitch=()=>{
    setRegister(true);
  }

  

  

  const formswitch1=()=>{
    setRegister(false);
  }

  const handlesignin=(e)=>{
    e.preventDefault();
    setError("")
    setLoading(true);
    if(email===""|| password===""){
      setError('Required field is Missing')
      setLoading(false);


      
    }
    else{
      signInWithEmailAndPassword(auth,email,password).then((res)=>{
        console.log(res)
        setLoading(false)
      navigate('/all-questions')


    
      //  page();
      }).catch((error)=>{
        console.log(error.code)
        setError(error.message)
        setLoading(false)
      })
    }
     
  }

  const handleregister =(e)=>{
    e.preventDefault();


    setError("")
    setLoading(true);
    if(email===""|| password===""|| username===""){
      setError('Required field is Missing')
      setLoading(false);
    }
    else{
      createUserWithEmailAndPassword(auth,email,password).then((res)=>{
        setLoading(false)
        console.log(res)
        setRegister(true)
      }).catch((error)=>{
        console.log(error)
        setError(error.message)
        setLoading(false)
      })
    }

  }
  console.log(username)

  console.log(email);
  console.log(password);

    
   

  return (
    <div className="loginformcontainer">
      <div className="login-middle-box">
   
   {
    register? (<> 
    <h2>Log in </h2>
    {/* <hr></hr> */}
    <form className="loginform">
      <label className="formlabel">Email</label>
      <br></br>
      <input type={"email"} name='email' value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
      <br></br>
      <label className="formlabel">password</label>
      <br></br>
      <input type={"password"} name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  ></input>
      <br></br>
      <button onClick={handlesignin}>{loading?"login...":"Login"}</button>
    </form>
    {/* <hr></hr> */}

    <p>
      New User ? <button onClick={formswitch1} className='authlink'>Register</button>
    </p>
  </>):(<> 
      <h2>Register </h2>
      {/* <hr></hr> */}
      <form className="loginform">
      <label className="formlabel">username</label>
        <br></br>
        <input type={"text"} name='username' value={username} onChange={(e)=> setUsername(e.target.value)} ></input>
        <br></br>
        <label className="formlabel">Email</label>
        <br></br>
        <input type={"email"} name='email' value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
        <br></br>
        <label className="formlabel">password</label>
        <br></br>
        <input type={"password"} name="password" value={password} onChange={(e)=>setPassword(e.target.value)} ></input>
        <br></br>
        <button onClick={handleregister}>{loading?"Registering...":"Register"}</button>
      </form>
      {/* <hr></hr> */}

      <p>
        Already have Account ? <button onClick={formswitch} className="authlink">login</button>
      </p>
    </>)


    
   
   
   }

{
    error!==""&& (<p style={{
      color:"red",
      fontsize: "14px"
    }}>
      {error}
    </p>)
  }

  </div>
 

  
  </div>
);
  
}

export default Auth