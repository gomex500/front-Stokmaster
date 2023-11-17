import React, {useState} from "react";
import '../css/login.css'
import {Btn, Input, Carga} from '../components'
import Swal from "sweetalert2";
import { configApi } from "../api/configApi";

const Login = () =>{

    const [user, setUser]  = useState({
        username : "",
        password: ""
    });

    const [carga, setCarga] = useState(false);

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

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
        if (user.username !== '' && user.password !== '') {
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
        configApi.post('/login',user)
        .then((response) => {
            localStorage.removeItem('data');
            const datos = response.data
            console.log(response);
            // const user = {
            //     'id':datos.id,
            //     "session":true
            // }
            localStorage.setItem('user',datos.id);
            setCarga(false);
            alertas('success','Bienvenido');
            window.location = "/";
        })
        .catch((error) =>{
            // console.log('error',error);
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
                                <label htmlFor="username">Ingrese User name:</label>
                                <Input
                                    cls={"form-control"}
                                    tp={"text"}
                                    nm={"username"}
                                    val={user.username}
                                    fun={obtenerDatos}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Ingrese Password:</label>
                                <Input
                                    cls={"form-control"}
                                    tp={"password"}
                                    nm={"password"}
                                    val={user.password}
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

export default Login;