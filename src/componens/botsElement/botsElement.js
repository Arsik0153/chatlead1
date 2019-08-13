import React from 'react';
import style from './botsElement.module.sass';
import trash from '../../images/trash.png';
import {Link} from 'react-router-dom';


const BotsElement = (props) => {
    const {botId} = props;


    return (
        <div className={style.mainContainer}>
            <h1>ID бота: {botId}</h1>
            <div className={style.controls}>
                <Link to={`/bots/${botId}/scenario`} className={style.link}>Изменить</Link>
                <img src={trash} alt={'trash'} />
            </div>
        </div>
    )
};

export default BotsElement;