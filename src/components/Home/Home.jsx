import React from "react";
import {useNavigate}from 'react-router-dom';
import Button from "../Button/Button";

const Home=()=>{
    const navigate=useNavigate();

    return(
        <div>
            <h1>ホーム</h1>
            <Button
                onClickHandler={()=>{navigate('/quiz')}}
            >クイズページへ</Button>
        </div>
    );
};

export default Home;