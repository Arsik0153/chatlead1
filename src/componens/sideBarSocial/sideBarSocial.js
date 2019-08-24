import React from 'react';
import style from './sideBarSocial.module.sass';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateSocialInTrigger} from "../../actions/actionCreator";
import faceBookMassanger from '../../images/facebook-messenger-logo-big.png';
import telegram from '../../images/telegram-icon-big.png';
import vk from '../../images/vk-logo-big.png';
import whatsApp from '../../images/whatsapp-big.png';


const SideBarSocial = (props) => {
    const {changedTrigger} = props;


    const updateSocialInTriggerHandler = (e) => {
        const updatedTrigger = {
            ...changedTrigger,
            social: e.target.value,
            botId: props.match.params.botId
        };
        props.updateSocialInTrigger(updatedTrigger);

    };
    

    return (
        <div className={style.mainContainer}>
            <h2>Каналы</h2>

            <div className={style.inputGroup}>
                <input
                    type="radio"
                    id="Facebook Messenger"
                    name="social"
                    value="facebook"
                    checked={changedTrigger.social === 'facebook'}
                    onChange={updateSocialInTriggerHandler}
                />
                <label htmlFor={'Facebook Messenger'}>
                    <img src={faceBookMassanger} alt={'facebook'} />
                    Facebook Messenger
                </label>
            </div>
            <div className={style.inputGroup}>
                <input
                    type="radio"
                    id="Telegram"
                    name="social"
                    value='telegram'
                    checked={changedTrigger.social === 'telegram'}
                    onChange={updateSocialInTriggerHandler}
                />
                <label htmlFor={'Telegram'}>
                    <img src={telegram} alt={'telegram'} />
                    Telegram
                </label>
            </div>
            <div className={style.inputGroup}>
                <input
                    type="radio"
                    id="vk"
                    name={'social'}
                    value={'vk'}
                    checked={changedTrigger.social === 'vk'}
                    onChange={updateSocialInTriggerHandler}
                />
                <label htmlFor={'vk'}>
                    <img src={vk} alt={'vk'} />
                    ВКонтакте
                </label>
            </div>
            <div className={style.inputGroup}>
                <input
                    type="radio"
                    id="WhatsApp"
                    name={'social'}
                    value={'whatsapp'}
                    onChange={updateSocialInTriggerHandler}
                    checked={changedTrigger.social === 'whatsapp'}
                />
                <label htmlFor={'WhatsApp'}>
                    <img src={whatsApp} alt={'whatsApp'} />
                    WhatsApp
                </label>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateSocialInTrigger: (triggerData) => dispatch(updateSocialInTrigger(triggerData)),
});


export default withRouter(connect(null, mapDispatchToProps)(SideBarSocial));