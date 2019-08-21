import React from 'react';
import style from './autoride.module.sass';
import Header from "../../componens/header/header";
import NavBar from '../../componens/navbar/navbar';


const Autoride = (props) => {

    return (
        <div className={style.mainContainer}>
            <Header/>
            <NavBar/>
        </div>
    )
};

export default Autoride;