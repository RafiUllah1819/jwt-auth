import React ,{useState} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const loginUser = async () =>{
        const userObj = {
            email,
            password
        }
        try {
          toast.loading('loading')
          const response = await axios.post("http://localhost:5000/api/auth/login", userObj)
          toast.dismiss()
          console.log("response" , response.data)
          if(response.data.success){
            toast.success(response.data.message)
            localStorage.setItem("user", response.data.data)
            navigate('/')
          }else{
            toast.error(response.data.message)
          }
        } catch (error) {
          toast.dismiss();
          toast.error("Something went wrong")
        }
    }

  return (
    <div className='todo'>
    <h3 className='text-center mb-4'>My App</h3>
   <h4 className='text-center mb-4'>Log in</h4>
   <div className='search d-flex justify-content-between'>

   </div>
   <label>Email</label>
   <div className='form-group'>
   <input type="text" className='form-control' value={email} onChange={e=>setEmail(e.target.value)}/>
   </div>
   <label>Password</label>
  <div className='form-group mb-2'>
  <input type="password"  className='form-control' value={password} onChange={e=>setPassword(e.target.value)}/>
  </div>
   <button className='btn btn-success' onClick={loginUser}>Login</button>
   <p>Not a member yet? <Link to='/register'>Register</Link></p>
</div>
  )
}
