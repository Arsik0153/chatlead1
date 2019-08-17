import React from 'react';
import {Link} from 'react-router-dom';
import style from './signUp.module.sass';
import SignUpForm from '../../componens/forms/signUpForm/signUpForm';
import chatLead from '../../images/chatlead.png';

const SignUp = (props) => {


    return (
        <div className={style.mainContainer}>
            <div className={style.formContainer}>
                <img src={chatLead} alt={'logo'} />
                <SignUpForm />
            </div>
            <div className={style.authContainer}>
                <Link to={'/auth'} className={style.link}>Войти</Link>
            </div>

        </div>
    )
};

export default SignUp;
