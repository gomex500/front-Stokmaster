import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Add, Home, Login, Registro } from "./views";
import { Navbar } from "./components";


import { useSelector } from "react-redux";

const App = () =>{

  localStorage.setItem('data', {"session": true});
  const { user} = useSelector( state => state.user );

  return(
    <div>
      <Navbar/>
        <Routes>
          <Route path='/' element={user.rol ? <Home/> : <Login/>}/>
          <Route path='/add' element={user.rol === 1 ? <Add/> : <Home/>}/>
          <Route path='/login' element={user.rol ? <Home/> : <Login/>}/>
          <Route path='/registro' element={user.rol ? <Registro/> : <Login/>}/>
        </Routes>
    </div>
  );
}

export default App;