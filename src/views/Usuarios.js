import React, {useEffect, useState} from "react";
import {Btn, Carga, Input, Checkbox} from '../components';
import {alertas} from '../api/alertas'
import '../css/usuarios.css'


import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/slices/users/usersThunks";
import { configApi } from "../api/configApi";

const Usuarios = () =>{

    const dispatch = useDispatch();
    const { Users , isLoading } = useSelector( state => state.users );

    const [buscando, setBuscando] = useState(false);
    const [user, setUser] = useState([]);
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState('');
    const [add, setAdd] = useState(false);
    const [userI, setUserI] = useState({
        "nombre":"",
        "username":"",
        "rol":0,
        "password":""
    });

    const cambiarValor = (e) =>{
        setUsername(e.target.value);
    }

    const buscarUsuario = (e) =>{
        e.preventDefault();
        if(username){
            configApi.get(`/username/${username}`)
            .then((response) =>{
                setBuscando(true);
                setUser(response.data);
            })
            .catch((error) =>{
                console.log(error);
                alertas('error', error.response.data.message);
            })
        }else{
            alertas('error', 'campo vacio');
        }
    }

    const Add = () =>{
        setAdd(true);
    }

    const cancelar = () =>{
        setUsername('');
        dispatch( getUsers() );
        setBuscando(false);
    }

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        setUserI({
            ...userI,
            [name]:value
        })
    }

    const cambiarRol = (e) => {
        // Actualizamos el estado del usuario con 1 si el checkbox está marcado, 0 si no
        setUserI(prevUser => ({
          ...prevUser,
          rol: e.target.checked ? 1 : 0
        }));
      };

    const deleteUser = (id) =>{
        configApi.delete(`/user/${id}`)
        .then((response) =>{
            dispatch(getUsers());
            alertas('success',response.data.mensaje);
        })
        .catch((error) =>{
            alertas('error',"Error al eliminar");
            console.log(error);
        })
    }

    const validarDatos = () =>{
        if (userI.username !== '' || 
        userI.password !== '' ||
        userI.nombre !== '') {
            if (userI.password.length < 8){
                alertas('error','Password muy corto');
                return false;
            }
            return true;
        } else {
            alertas('error', 'Aun hay campos Vacios');
            return false;
        }
    }

    const editar = (user) =>{
        setEdit(true);
        setUserI(user);
        setAdd(true);
    }

    const enviarDatos = (e) =>{
        e.preventDefault();
        if (validarDatos()) {
            if (edit) {
                updateUser();
            }else{
                login();
            }
        }
    }

    const login = () =>{
        configApi.post('/users',userI)
        .then((response) => {
            alertas('success','Usuario Agregado');
            window.location = "/users";
        })
        .catch((error) =>{
            console.log('error',error);
            alertas('error',error.response.data);
        });
    }

    const updateUser = () =>{
        configApi.put(`/user/${userI._id}`,userI)
        .then((response) => {
            alertas('success',response.data.message);
            window.location = "/users";
        })
        .catch((error) =>{
            console.log('error',error);
            alertas('error',error.response.data);
        });
    }

    useEffect(() =>{
        dispatch( getUsers() );
    }, []);

    if (isLoading) {
        return <Carga/>
    } else if(add){
        return(
            <div>
            <div className="cont-form animate__animated animate__flipInY">
                    <div className="form-head">
                        <h3>Add User</h3>
                    </div>
                    <div className="form-body">
                        <form onSubmit={enviarDatos}>
                            <div>
                                <label htmlFor="nombre">Insert Name:</label>
                                <Input
                                    cls={"form-control"}
                                    tp={"text"}
                                    nm={"nombre"}
                                    val={userI.nombre}
                                    fun={obtenerDatos}
                                />
                            </div>
                            <div>
                                <label htmlFor="username">Insert User name:</label>
                                <Input
                                    cls={"form-control"}
                                    tp={"text"}
                                    nm={"username"}
                                    val={userI.username}
                                    fun={obtenerDatos}
                                />
                            </div>
                            <Checkbox
                                        cls={"form-check-input"}
                                        val={userI.rol}
                                        id={"pilar"}
                                        func={cambiarRol}
                                        />
                                    <label className="form-check-label" htmlFor="pilar">
                                        Admin
                                    </label>
                            <div>
                                <label htmlFor="password">Insert Password:</label>
                                <Input
                                    cls={"form-control"}
                                    tp={"password"}
                                    nm={"password"}
                                    fun={obtenerDatos}
                                />
                            </div>
                            <Btn
                                cls={"btn btn-primary"}
                                text={"Add"}
                                tp={"submit"}
                            />
                        </form>
                    </div>
                </div>
        </div>
        )
    }else {
        return(
            <div className="cont-users">
                <Btn
                    text={<i class="fa-solid fa-user-plus"></i>}
                    cls={"btnChat animate__animated animate__bounce"}
                    fun={Add}
                />
                    <center>
                        <h2>Administracion de Usuarios</h2>
                        <div className="cont-search">
                            <form onSubmit={buscarUsuario}>
                                <div className="form-cont">
                                    <Input
                                        tp={'text'}
                                        cls={'form-control input'}
                                        val={username}
                                        fun={cambiarValor}
                                        ph={'Buscar por username'}
                                    />
                                    <Btn
                                        tp={'submit'}
                                        cls={'btn1'}
                                        text={<i class="fa-solid fa-magnifying-glass"></i>}
                                    />
                                    <Btn
                                        tp={'button'}
                                        cls={'btn1'}
                                        fun={cancelar}
                                        text={(() =>{
                                            if (username.length > 0) {
                                               return <i class="fa-solid fa-delete-left"></i>
                                            } else {
                                                return <i class="fa-solid fa-rotate"></i>
                                            }
                                        })()}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="cont-tabla table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr className="table-head">
                                        <th>N#</th>
                                        <th>Nombre</th>
                                        <th>Username</th>
                                        <th>Rol</th>
                                        <th colSpan={"2"}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                {!buscando ? (
                                    Users.map((user, i) => (
                                    <tr key={user._id} className="tbody">
                                        <td>{i + 1}</td>
                                        <td>{user.nombre}</td>
                                        <td>{user.username}</td>
                                        <td>{user.rol === 1 ? 'Admin' : 'User'}</td>
                                        <td>
                                            <Btn
                                                tp={'button'}
                                                cls={'btn2'}
                                                text={<i className="fa-solid fa-pencil"></i>}
                                                fun={() => editar(user)}
                                            />
                                        </td>
                                        <td>
                                            <Btn
                                                tp={'button'}
                                                cls={'btn2'}
                                                text={<i className="fa-solid fa-trash"></i>}
                                                fun={() => deleteUser(user._id)}
                                            />
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr className="tbody">
                                        <td>{1}</td>
                                        <td>{user.nombre}</td>
                                        <td>{user.username}</td>
                                        <td>{user.rol}</td>
                                        <td>
                                            <Btn
                                                tp={'button'}
                                                cls={'btn2'}
                                                text={<i className="fa-solid fa-pencil"></i>}
                                                fun={() => editar(user)}
                                            />
                                        </td>
                                        <td>
                                            <Btn
                                                tp={'button'}
                                                cls={'btn2'}
                                                text={<i className="fa-solid fa-trash"></i>}
                                                fun={() => deleteUser(user._id)}
                                            />
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </center>
                </div>
        );
    }
}

export default Usuarios;