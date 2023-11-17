import React, {useState} from "react";
import {Btn, Input, Carga, Checkbox} from '../components'
import Swal from "sweetalert2";
import { configApi } from "../api/configApi";

const Registro = () =>{
    
    const [user, setUser] = useState({
        "nombre":"",
        "username":"",
        "rol":0,
        "password":""
    });

    const [carga, setCarga] = useState(false);

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const cambiarRol = (e) => {
        // Actualizamos el estado del usuario con 1 si el checkbox está marcado, 0 si no
        setUser(prevUser => ({
          ...prevUser,
          rol: e.target.checked ? 1 : 0
        }));
      };

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          })
    }

    const validarDatos = () =>{
        if (user.username !== '' || 
        user.password !== '' ||
        user.nombre !== '') {
            if (user.password.length < 8){
                alertas('error','Password muy corto');
                return false;
            }
            return true;
        } else {
            alertas('error', 'Aun hay campos Vacios');
            return false;
        }
    }

    const enviarDatos = (e) =>{
        e.preventDefault();
        if (validarDatos()) {
            login();
        }
    }

    const login = () =>{
        setCarga(true);
        configApi.post('/users',user)
        .then((response) => {
            setCarga(false);
            alertas('success','Usuario Agregado');
            window.location = "/";
        })
        .catch((error) =>{
            console.log('error',error);
            setCarga(false);
            alertas('error',error.response.data.message);
        });
    }

    if (carga) {
        return <Carga/>
    } else {
        return(
            <div>
                <div className="cont-form animate__animated animate__flipInY">
                    <div className="form-head">
                        <h3>StockMaster</h3>
                    </div>
                    <div className="form-body">
                        <form onSubmit={enviarDatos}>
                            <div>
                                <label htmlFor="nombre">Ingrese Nombre:</label>
                                <Input
                                    cls={"form-control"}
                                    tp={"text"}
                                    nm={"nombre"}
                                    // val={user.nombre}
                                    fun={obtenerDatos}
                                />
                            </div>
                            <div>
                                <label htmlFor="username">Ingrese User Name:</label>
                                <Input
                                    cls={"form-control"}
                                    tp={"text"}
                                    nm={"username"}
                                    // val={user.username}
                                    fun={obtenerDatos}
                                />
                            </div>
                                <Checkbox
                                        cls={"form-check-input"}
                                        // val={rol}
                                        id={"pilar"}
                                        func={cambiarRol}
                                        />
                                    <label className="form-check-label" htmlFor="pilar">
                                        Admin
                                    </label>
                            <div>
                                <label htmlFor="password">Ingrese Password:</label>
                                <Input
                                    cls={"form-control"}
                                    tp={"password"}
                                    nm={"password"}
                                    // val={user.password}
                                    fun={obtenerDatos}
                                />
                            </div>
                            <Btn
                                cls={"btn btn-primary"}
                                text={"Go"}
                                tp={"submit"}
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registro;