import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Register } from "./Components/Register";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";


function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
        <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
      </Routes>
   
    </div>
  );
}
export function ProtectedRoutes({children}){
  const user =localStorage.getItem('user');
  if(user !== "" && user){
    return children;
  } else {
    return <Navigate to="/login"/>
  }
}
export function PublicRoutes({children}){
  const user =localStorage.getItem('user');
  if(user !== "" && user){
    return <Navigate to="/"/>
  } else {
    return children;
  }
}

export default App;
