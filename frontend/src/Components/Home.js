import React ,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate()

  const getData = async () =>{
    toast.loading("Getting user data ....")
    try {
      const token = localStorage.getItem("user")
      const response = await axios.get('http://localhost:5000/api/user/get-user-info',{
        headers : {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.dismiss()
      if(response.data.success){
        setUserInfo(response.data.data)
      }else{
        localStorage.removeItem('user')
        navigate('/login')
        toast.error("Something went wrong")
       
      }
    } catch (error) {
      toast.error("Something went wrong")

    }
  }

  useEffect(()=>{
  if(userInfo == null){
    getData() 
  } 
  },[userInfo])
    
  return (
   userInfo !== null && (
    <div className='flex justify-content-center text-center'>

    <h2>Home</h2>
    <h3>{userInfo?.email}</h3>
    </div>
   )
  )
}
