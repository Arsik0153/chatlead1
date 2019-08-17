import React, {useState} from 'react';
import style from './buttonsContainer.module.sass';
import {buttonsTypes} from "../../../constants/defaultValues";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";
import ClickOutsideHandler from "../../hoc/clickOutside";
import ContextMenu from './contextMenu/contextMenu';



const ButtonsContainer = (props) => {
    const [indexOpenButton, setIndexOpenButton] = useState(false);
    const {
        type,
        index,
        pictureForLabel,
        value,
        changedTrigger,
        changedSlideOrElement,
        changedSocialClub
    } = props;

    const countMessage = () => {
        let count = 0;
        Object.values(value[changedSlideOrElement].keyboard).forEach(elem => {
            count = count + elem.length
        });

        return count;
    };


    const appendNewButton = () => {

        const messagesCopy = changedTrigger.messages.concat();
        let text_button_Copy = null;

        if(changedSlideOrElement || changedSlideOrElement === 0) {
            const buttons = messagesCopy[index][type][changedSlideOrElement].keyboard;

            text_button_Copy = buttons[buttonsTypes.text_buttons];

            if(!text_button_Copy) {
                text_button_Copy = [];
            }
            text_button_Copy.push({
                caption: 'Новая Кнопка',
                isEmpty: true
            });

            Object.assign(buttons, {
                [buttonsTypes.text_buttons]: text_button_Copy
            });

            const triggerData = {
                ...changedTrigger,
                index,
                type,
                messages: messagesCopy,
                botId: props.match.params.botId
            };

            props.updateTrigger(triggerData);


        }else {
            text_button_Copy = messagesCopy[index][type].keyboard[buttonsTypes.text_buttons];
        }

        // text_button_Copy.push({
        //     caption: 'Новая Кнопка',
        //     isEmpty: true
        // });

        // console.log();

        // console.log(messagesCopy[index][type][changedSlideOrElement], {
        //     keyboard: push
        // });

        // if(changedSlideOrElement || changedSlideOrElement === 0) {
        //     Object.assign(messagesCopy[index][type][changedSlideOrElement], {
        //         keyboard: e.target.value
        //     });
        // }


        // const updationData = {
        //     type: 'text'
        // };
        // if(typeInput === 'text' || typeInput === 'title') {
        //     Object.assign(messagesCopy[index][type][indexListElement], {
        //         [typeInput]: e.target.value
        //     });
        // }else {
        //     Object.assign(updationData, {
        //         file: e.target.files[0],
        //         type: 'photo'
        //     })
        // }

        // const triggerData = {
        //     ...changedTrigger,
        //     index,
        //     type,
        //     changedSlide: changedSlideOrElement,
        //     messages: messagesCopy,
        //     botId: props.match.params.botId
        // };
        //
        //
        // props.updateTrigger(triggerData);

    };

    const allButtonsInMessage = () => {
        const messagesCopy = changedTrigger.messages.concat();
        const buttonsArray = [];

        const buttons
            = changedSlideOrElement || changedSlideOrElement === 0 ?
                    messagesCopy[index][type][changedSlideOrElement].keyboard :
                    messagesCopy[index][type].keyboard;


        Object.keys(buttons).forEach(typeButton => {
            buttons[typeButton].forEach(button => {
                button.type = typeButton;
                buttonsArray.push(button);
            });
        });

        console.log(buttonsArray);

        return buttonsArray;
    };

    const editButton = () => {

    };
    //
    // const menuContainer = (changedButton) => {
    //     if((changedSlideOrElement || changedSlideOrElement === 0) && indexOpenButton) {
    //         return (
    //             <div>
    //                 <label>Заголовок кнопки</label>
    //                 <input type={'text'} />
    //                 <label>Тип кнопки</label>
    //                 <div>Отправить сообщение</div>
    //                 <div>Открыть веб-сайт</div>
    //                 <div>Быстрая кнопка</div>
    //             </div>
    //         )
    //
    //     }
    // };


    return (
        <div className={style.mainContainer}>

            {
                allButtonsInMessage().map((elem, index) => (

                    <div className={style.buttonElement} onClick={() => setIndexOpenButton(index)}>
                        <ClickOutsideHandler onClickedOutside={() => setIndexOpenButton(false)}>
                           <div>
                               <div>{elem.caption}{elem.isEmpty ? `(empty)` : elem.type}</div>
                               {
                                   indexOpenButton === index && (
                                       <ContextMenu
                                           buttonEditHandler={editButton}
                                           typeButton={elem.isEmpty ? 'empty' : elem.type}
                                       />
                                   )

                               }
                           </div>
                        </ClickOutsideHandler>
                    </div>
                ))
            }
            {/*<div className={style.contentContainer}>*/}
                {/*{*/}
                    {/*Object.keys(value[changedSlideOrElement].keyboard).map(keyBoardElem => {*/}
                        {/*keyBoardElem.map(elem => (*/}
                            {/*<div>{elem}</div>*/}
                        {/*))*/}
                    {/*})*/}
                {/*}*/}
                {/*{*/}
                    {/*menuContainer()*/}
                {/*}*/}

            {/*</div>*/}

            <div className={style.controls}>

                {
                    changedSlideOrElement || changedSlideOrElement === 0 ?
                        countMessage() === 0 && <h2 onClick={() => appendNewButton()}>+ Кнопка</h2>
                        : countMessage() < 3 && <h2 onClick={() => appendNewButton()}>>+ Кнопка</h2>
                }
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default withRouter(connect(null, mapDispatchToProps)(ButtonsContainer));