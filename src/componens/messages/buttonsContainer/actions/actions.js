import React, {useState} from 'react';
import style from './actions.module.sass';
import ActionsContextMenu from './actionsContextMenu/actionsContextMenu';
import {connect} from "react-redux";
import {updateTrigger} from "../../../../actions/actionCreator";
import {tagsTypes} from "../../../../constants/defaultValues";


const Actions = (props) => {
    const {buttonEditHandler, typeButton, scenarioId, indexButton, buttonData} = props;
    const [isOpenContextMenu, openContextMenu] = useState(false);

    const editTagsInButton = (typeTag) => {
        if(!buttonData[typeTag]) {
            Object.assign(buttonData, {
                [typeTag]: []
            });
        }
        buttonData[typeTag].push('');

        buttonEditHandler(typeButton, buttonData, indexButton, buttonData.isEmpty);

    };


    return (
        <div className={style.actionsMainContainer}>
            <h2>Дополнительные действия: </h2>
            {
                Object.keys(buttonData).map(key => (
                    (key === tagsTypes.AddTags || key === tagsTypes.Remove_Tags) && (
                        buttonData[key].map(elem => (
                            <div className={style.actionElement}>
                                <label>{key}</label>
                                <input type={'text'} defaultValue={elem} />
                            </div>
                        ))
                    )
                ))
            }
            <div className={style.controlsContainer} onClick={() => openContextMenu(true)}>
                {
                    isOpenContextMenu && (
                        <ActionsContextMenu
                            openContextMenu={openContextMenu}
                            editTagsInButton={editTagsInButton}
                        />
                    )
                }
                <div className={style.actionsContainer}>
                    + Действие
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default connect(mapDispatchToProps)(Actions);
