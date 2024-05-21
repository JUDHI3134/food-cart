import React, { useContext, useState } from 'react'
import axios from "axios"
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({setShowLogin}) => {
    const [currentState,setCurrentState] = useState("Login");
    const {url,setToken} = useContext(StoreContext)
    const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) =>{
    let name = event.target.name;
    let value = event.target.value;
    setData(prev => ({...prev,[name]:value}))
  }
 
  const onLogin = async (event) =>{
      event.preventDefault();
      let newUrl = url;
      if(currentState==="Login"){
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
           <h2>{currentState}</h2>
           <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
        {currentState === "Login" ? <></>:
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your Name' required />
        }
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your Email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter your Password' required />
        </div>
        <button type='submit'>{currentState === "Sign Up"? "Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ?
        <p>Create a new account ?<span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
        :<p>Already have an account ?<span onClick={()=>setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
