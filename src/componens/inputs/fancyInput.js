import React, {useState} from 'react';
// import { Field } from 'redux-form';

import style from './fansyInput.module.sass';

const FancyInput = (props) => {
    const {
        input,
        label,
        type,
        onClick,
        isValidation = true,
        meta: { asyncValidating, touched, error }
    } = props;
    const [isFocusInInput, setStatusForFocus] = useState(false);



    return(
        <div className={style.mainContainer}>
            {
                isFocusInInput && (
                    <label htmlFor={input.name} onClick={onClick}>
                        {label}
                    </label>
                )
            }
            <div className={style.inputContainer}
                 onFocus={() => setStatusForFocus(true)}
                 onBlur={() => setStatusForFocus(false)}
            >
                <input
                    {...input}
                    id={input.name}
                    type={type}
                    className={isFocusInInput ? style.inputFocus : style.input}
                    placeholder={!isFocusInInput && label}

                />
                {/*{*/}
                    {/*isFocusInInput && (*/}
                        {/*<div className={style.hr}/>*/}
                    {/*)*/}
                {/*}*/}

                {touched && error && <span className={style.errorMessage}>{error}</span>}
            </div>
        </div>
    );
};


export default (FancyInput);