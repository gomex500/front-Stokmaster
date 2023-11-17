import React from "react";

const Input = ({nm, cls, val, tp, fun, id}) =>{
    return(
        <input className={cls} name={nm} value={val} onChange={fun} id={id} type={tp}/>
    );
}

export default Input;