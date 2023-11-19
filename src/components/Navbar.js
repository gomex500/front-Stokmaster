import React, {useEffect} from "react";
import logo from '../img/logo.png'
import '../css/navbar.css'

import { useDispatch, useSelector } from "react-redux";
import {getUser} from '../store/slices/user/userThunks';
import Carga from "./Carga";

const Navbar = () =>{

    const dispatch = useDispatch();
    const { user, isLoading} = useSelector( state => state.user );


    const cerraSesion = () =>{
      localStorage.removeItem('user');
      window.location = '/';
    }

    useEffect(() => {
      dispatch(getUser());
    }, [])
    

    if (isLoading) {
      return <Carga/>
    } else {
      return(
        <nav className="navbar navbar-expand-lg nav1">

            <a className= "logo navbar-brand" href="/" >
              <img src={logo} className="logo" alt="logo" />
            </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/"><i className="fa-solid fa-house"></i> Home</a>
              </li>
              {user.rol === 1 ? <>
                <li className="nav-item">
                  <a className="nav-link" href="/add"><i className="fa-solid fa-square-plus"></i> Insert</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/users"><i class="fa-solid fa-users"></i> Users</a>
              </li>
              </>
                : null}
              <li className="nav-item">
                <a className="nav-link" onClick={cerraSesion}><i className="fa-solid fa-right-from-bracket"></i> {user.nombre}</a>
              </li>
            </ul>
          </div>
      </nav>
    );
    }
}

export default Navbar;