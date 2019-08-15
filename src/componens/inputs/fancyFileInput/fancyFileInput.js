import React from 'react';
import style from './fancyFileInput.module.sass';
import {staticMedia} from "../../../api/baseURL";



const FancyFileInput = (props) => {
    const {type, accept, onChange, index, pictureForLabel, value} = props;
    let nameFile = value.split('/')[value.split('/').length - 1];

    if(pictureForLabel.label === 'image') {
        nameFile = <img src={staticMedia + value} alt={value} />
    }


    return (
        <>
            <input type={type} accept={accept} name={index} id={index} onChange={onChange} className={style.inputFile}/>
            <label htmlFor={index}>
                <div className={style.pictureContainer}>
                    <h2>{value.length > 0 ? nameFile : pictureForLabel.img}</h2>
                    <p>{value.length === 0 && pictureForLabel.label}</p>
                </div>
            </label>
        </>
    )
};

export default FancyFileInput;