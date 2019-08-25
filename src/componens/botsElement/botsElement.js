import React from 'react';
import style from './botsElement.module.sass';

import edit from '../../images/buttons/edit.png'
import trash from '../../images/buttons/trash.png';
import facebookIcon from '../../images/facebook-messenger-logo-big.png'
import telegramIcon from '../../images/telegram-icon-big.png'
import vkIcon from '../../images/vk-logo-big.png'
import whatsappIcon from '../../images/whatsapp-big.png'

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createBot, deleteBot} from "../../actions/actionCreator";


const BotsElement = (props) => {
    const {name, id} = props;

    return (
        <li className={style.mainContainer}>
            <div className={style.nameContainer}>
                <h2>{name}</h2>
                <img src={edit} alt="Edit" className="btn-icon"/>
            </div>
            <div className={style.socialContainer}>
                <img src={facebookIcon} alt="Facebook" />
                <img src={telegramIcon} alt="Telegram" />
                <img src={vkIcon} alt="Facebook" />
                <img src={whatsappIcon} alt="WhatsApp" />
            </div>
            <h2>Тестовый период заканчивается через <span>14 дней</span></h2>
            <div className={style.controls}>
                <Link to={`/bots/${id}/scenario`} className={style.link}>Изменить</Link>
                <img src={trash} alt="Delete" onClick={() => props.deleteBot({
                    manager_id: id
                })}/>
            </div>

        </li>
    )
};

const mapDispatchToProps = dispatch => ({
    deleteBot: (botData) => dispatch(deleteBot(botData))
});

export default connect(null, mapDispatchToProps)(BotsElement);