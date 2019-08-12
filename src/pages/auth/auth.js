import React from 'react';
import style from './auth.module.sass';
import chatLead from "../../images/chatlead.png";
// import SignUpForm from "../signUp/signUp";
import AuthForm from '../../componens/forms/authForm/authForm';
import {Link} from "react-router-dom";

const Auth = (props) => {

    return (
        <div className={style.mainContainer}>
            <div className={style.formContainer}>
                <img src={chatLead} alt={'logo'} />
                <AuthForm />
            </div>
            <div className={style.authContainer}>
                <Link to={'/signUp'} className={style.link}>Зарегистрироватся</Link>
                <Link to={'/auth'} className={style.link}>Востановить пароль</Link>
            </div>

        </div>
    )
};


export default Auth;