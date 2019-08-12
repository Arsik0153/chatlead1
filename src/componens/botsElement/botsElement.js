import React from 'react';
import style from './botsElement.module.sass';
import trash from '../../images/trash.png';


const BotsElement = (props) => {
    const {botId} = props;


    return (
        <div className={style.mainContainer}>
            <h1>ID бота: {botId}</h1>
            <div className={style.controls}>
                <div className={style.buttonEdit}>Изменить</div>
                <img src={trash} alt={'trash'} />
            </div>
        </div>
    )
};

export default BotsElement;