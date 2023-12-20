import React from "react";


export default function btn({number,btnClick,ele}){
    return (<>
    <div onClick={btnClick} className={`btn ${ele.isActive ? "active":""}`}>
    {number}
    </div>
    </>)
}