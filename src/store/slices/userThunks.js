import { configApi } from "../../api/configApi";
import {getUsuario, startLoadigUser} from "./userSlice";

const datos = localStorage.getItem('user');

export const getUser = () =>{
    return async (dispatch) =>{

        dispatch( startLoadigUser() );
        if (datos) {
            await configApi.get(`/user/${datos}`)
            .then((response) => {
                dispatch( getUsuario({
                    user: response.data,
                    isSession: true,
                    isLoading: false
                }));
            })
            .catch((error) =>{
                console.log('error',error);
            });

        } else {
            dispatch( getUsuario({
                user: {},
                isSession: false,
                isLoading: false
            }));
        }

    }
}