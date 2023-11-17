import { configApi } from '../../api/configApi'
import { getPc, startLoadigPc } from "./pcSlices"; 

const datos = localStorage.getItem('data');

export const getPcs = () =>{
    return async (dispatch) =>{

        dispatch( startLoadigPc() );

        if (datos) {
            const {data} = await configApi('/pc');
            dispatch( getPc({
                pc: data,
                isLoading: false
            }));

        } else {
            dispatch( getPc({
                user: [{}],
                isLoading: false
            }));
        }

    }
}