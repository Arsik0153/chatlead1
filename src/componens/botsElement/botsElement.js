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
                <button class={style.bot_edit_btn+" bot-list__edit default-btn default-btn--icon-style default-btn--outline"}>
                    <img src={edit} alt="Edit" className={style.btn_edit_img}/>
                    <span class="text-tooltip text-tooltip--top">Редактировать</span>
                </button>
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
                {/*<div className={style.buttonBotDelete} onClick={() => props.deleteBot({*/}
                    {/*manager_id: id*/}
                {/*})}>*/}
                <img src={trash} alt="Delete" onClick={() => props.deleteBot({
                    manager_id: id
                })}/>
                {/*<span className="text-tooltip text-tooltip--top">Удалить</span>*/}
                {/*</div>*/}
            </div>
        {/*<div className="bot-list__header">*/}
            {/*<h2>{name}</h2>*/}
            {/*<button className="bot-list__edit default-btn default-btn--icon-style default-btn--outline">*/}
                {/*<img src={edit} alt="Edit" className="btn-icon"/>*/}
                {/*<span className="text-tooltip text-tooltip--top">Редактировать</span>*/}
            {/*</button>*/}
        {/*</div>*/}
        {/*<div className="bot-list__messengers">*/}
            {/*<img src={facebookIcon} alt="Facebook" />*/}
            {/*<img src={telegramIcon} alt="Telegram" />*/}
            {/*<img src={vkIcon} alt="Facebook" />*/}
            {/*<img src={whatsappIcon} alt="WhatsApp" />*/}
        {/*</div>*/}
        {/*<p className="bot-list__period">Тестовый период заканчивается церез <span>14 дней</span></p>*/}
        {/*<div className="bot-list__footer">*/}
            {/*<Link to={`/bots/${id}/scenario`} className="bot-list__change">Изменить</Link>*/}
            {/*<button className="bot-list__remove default-btn default-btn--icon-style" onClick={() => props.deleteBot({*/}
                {/*manager_id: id*/}
            {/*})}>*/}
                {/*<img src={trash} alt="Delete"/>*/}
                {/*<span className="text-tooltip text-tooltip--top">Удалить</span>*/}
            {/*</button>*/}
        {/*</div>*/}
        </li>
    )
};

const mapDispatchToProps = dispatch => ({
    deleteBot: (botData) => dispatch(deleteBot(botData))
});

export default connect(null, mapDispatchToProps)(BotsElement);