import React from "react";

const Btn = ({text, cls, tp, fun}) =>{
    return(
        <button className={cls} type={tp} onClick={fun}>
            {text}
        </button>
    );
}

export default Btn;