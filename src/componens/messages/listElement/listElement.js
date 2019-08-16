import React, {useState} from 'react';
import style from './listElement.module.sass';
import {staticMedia} from "../../../api/baseURL";
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";
import {connect} from 'react-redux';
import ButtonsContainer from '../buttonsContainer/buttonsContainer';

const ListElements = (props) => {
    const {type, index, pictureForLabel, value, changedTrigger} = props;



    const updateTrigger = (e, typeInput, indexListElement) => {
        const messagesCopy = changedTrigger.messages.concat();


        const updationData = {
            type: 'text'
        };
        if(typeInput === 'text' || typeInput === 'title') {
            Object.assign(messagesCopy[index][type][indexListElement], {
                [typeInput]: e.target.value
            });
        }else {
            Object.assign(updationData, {
                file: e.target.files[0],
                type: 'photo'
            })
        }

        const triggerData = {
            ...changedTrigger,
            index,
            type,
            changedSlide: indexListElement,
            messages: messagesCopy,
            botId: props.match.params.botId
        };


        if(typeInput === 'text' || typeInput === 'title') {
            props.updateTrigger(triggerData);
        }else {
            props.updateTrigger(triggerData, updationData);
        }

    };

    const newListElementHanlder = () => {
        const messagesCopy = changedTrigger.messages.concat();
        messagesCopy[index][type].push({photo: '', title: '', text: '', keyboard: {}});
        const triggerData = {
            ...changedTrigger,
            index: index,
            messages: messagesCopy,
            botId: props.match.params.botId
        };
        props.updateTrigger(triggerData);
    };



    return (
        <div className={style.mainContainer}>
            {
                value.map((elem, index) => (
                    <div className={style.listElement}>
                        <div className={style.inputContainer}>
                            <input
                                type={'text'}
                                defaultValue={elem.title}
                                placeholder={'Введите титульное слово'}
                                onBlur={(e) => updateTrigger(e, 'title', index)}
                            />
                            <input
                                type={'text'}
                                defaultValue={elem.text}
                                placeholder={'Введите текст'}
                                onBlur={(e) => updateTrigger(e, 'text', index)}
                            />
                            <ButtonsContainer
                                {...props}
                                changedSlideOrElement={index}
                            />
                        </div>
                        <div className={style.pictureContainer}>
                            <input
                                type={'file'}
                                accept={'image/*'}
                                name={index}
                                id={index}
                                onChange={(e) => updateTrigger(e, 'file', index)}
                                className={style.inputFile}
                            />
                            <label htmlFor={index}>
                                <div className={style.pictureContainer}>
                                    <h2>
                                        {
                                            elem.photo.length > 0 ?
                                                <img src={staticMedia + elem.photo} alt={value} />
                                                : pictureForLabel.img
                                        }
                                    </h2>
                                    <p>{value.length === 0 && pictureForLabel.label}</p>
                                </div>
                            </label>
                        </div>
                    </div>
                ))
            }
            <h2 onClick={newListElementHanlder}>+element</h2>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)(ListElements));