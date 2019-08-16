import React from 'react';
import style from './sideBarSocial.module.sass';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateSocialInTrigger} from "../../actions/actionCreator";


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

            <div className={style.socialContainer}>
                <label htmlFor={'Facebook Messenger'}>Facebook Messenger</label>
                <input
                    type="radio"
                    id="Facebook Messenger"
                    name="social"
                    value="facebook"
                    defaultChecked={changedTrigger.social === 'facebook'}
                    onChange={updateSocialInTriggerHandler}
                />
            </div>
            <div className={style.socialContainer}>
                <label htmlFor={'Telegram'}>Telegram</label>
                <input
                    type="radio"
                    id="Telegram"
                    name="social"
                    value='telegram'
                    defaultChecked={changedTrigger.social === 'telegram'}
                    onChange={updateSocialInTriggerHandler}
                />
            </div>
            <div className={style.socialContainer}>
                <label htmlFor={'ВКонтакте'}>ВКонтакте</label>
                <input
                    type="radio"
                    id="Вконтакте"
                    name={'social'}
                    value={'vk'}
                    defaultChecked={changedTrigger.social === 'vk'}
                    onChange={updateSocialInTriggerHandler}
                />
            </div>
            <div className={style.socialContainer}>
                <label htmlFor={'WhatsApp'} >WhatsApp</label>
                <input
                    type="radio"
                    id="WhatsApp"
                    name={'social'}
                    value={'whatsapp'}
                    onChange={updateSocialInTriggerHandler}
                    defaultChecked={changedTrigger.social === 'whatsapp'}
                />
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateSocialInTrigger: (triggerData) => dispatch(updateSocialInTrigger(triggerData)),
});


export default withRouter(connect(null, mapDispatchToProps)(SideBarSocial));