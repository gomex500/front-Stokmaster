import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Add, Finding, Home, Login, Registro, Usuarios } from "./views";
import { Navbar } from "./components";


import { useSelector } from "react-redux";

const App = () =>{

  const { user} = useSelector( state => state.user );

  return(
    <div>
      <Navbar/>
        <Routes>
          <Route path='/' element={user.nombre ? <Home/> : <Login/> }/>
          <Route path='/add' element={user.rol === 1 ? <Add/> : <Home/>}/>
          <Route path='/login' element={user.nombre ? <Home/> : <Login/>}/>
          <Route path='/finding' element={user.nombre ? <Finding/> : <Login/>}/>
          <Route path='/users' element={user.rol === 1 ? <Usuarios/> : <Home/>}/>
        </Routes>
    </div>
  );
}

export default App;