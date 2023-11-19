import { configApi } from "../../../api/configApi";
import {getUsuarios, startIsLoadingUsers} from "./usersSlices";

const datos = localStorage.getItem('user');

export const getUsers = () =>{
    return async (dispatch) =>{

        dispatch( startIsLoadingUsers() );

        if (datos) {
            const {data} = await configApi('/users');
            dispatch( getUsuarios({
                Users: data,
                isLoading: false
            }));

        } else {
            dispatch( getUsuarios({
                Users: [{}],
                isLoading: false
            }));
        }

    }
}