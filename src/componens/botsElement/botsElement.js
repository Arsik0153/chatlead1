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

    // TODO styles
    return (
        <li>
        <div className="bot-list__header">
            <h2>{name}</h2>
            <button className="bot-list__edit default-btn default-btn--icon-style default-btn--outline">
                <img src={edit} alt="Edit" className="btn-icon"/>
                <span className="text-tooltip text-tooltip--top">Редактировать</span>
            </button>
        </div>
        <div className="bot-list__messengers">
            <img src={facebookIcon} alt="Facebook" />
            <img src={telegramIcon} alt="Telegram" />
            <img src={vkIcon} alt="Facebook" />
            <img src={whatsappIcon} alt="WhatsApp" />
        </div>
        <p className="bot-list__period">Тестовый период заканчивается церез <span>14 дней</span></p>
        <div className="bot-list__footer">
            <Link to={`/bots/${id}/scenario`} className="bot-list__change">Изменить</Link>
            <button className="bot-list__remove default-btn default-btn--icon-style" onClick={() => props.deleteBot({
                manager_id: id
            })}>
                <img src={trash} alt="Delete"/>
                <span className="text-tooltip text-tooltip--top">Удалить</span>
            </button>
        </div>
        </li>
    )
};

const mapDispatchToProps = dispatch => ({
    deleteBot: (botData) => dispatch(deleteBot(botData))
});

export default connect(null, mapDispatchToProps)(BotsElement);