import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const registerUser =  async (e)  => {
    e.preventDefault();
  if(password === confirmPassword){
    const userObj = {
      name,
      email,
      password,
      confirmPassword
  }
  try {
    toast.loading('Loading')
    const response = await axios
    .post("http://localhost:5000/api/auth/register", userObj);
    toast.dismiss();
   if(response.data.success){
    toast.success(response.data.message)
   }else{
    toast.error(response.data.message)
   }
  } catch (error) {
    toast.dismiss();
    toast.error("Something went wrong")
  }
  }else{
    toast.error("Password not matched")
  }
   
  };

  return (
    <div className='todo'>
    <h3 className='text-center mb-4'>My App</h3>
   <h4 className='text-center mb-4'>Register</h4>
   <div className='search d-flex justify-content-between'>

   </div>
   <label>Name</label>
   <div className='form-group'>  
   <input type="text" className='form-control mb-2' value={name} onChange={(e) => setName(e.target.value)}/>
   </div>
   <label>Email</label>
   <div className='form-group'>  
   <input type="text" className='form-control mb-2' value={email} onChange={(e)=>setEmail(e.target.value)}/>
   </div>
   <label>Password</label>
  <div className='form-group'>
  <input type="password"  className='form-control mb-2' value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>
   <label>Confirm Password</label>
  <div className='form-group'>
  <input type="password"  className='form-control mb-2' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
  </div>
   <button className='btn btn-success' onClick={registerUser}>Register</button>
   <p>Already account? <Link to='/login'>Login</Link></p>

</div>
  );
};
