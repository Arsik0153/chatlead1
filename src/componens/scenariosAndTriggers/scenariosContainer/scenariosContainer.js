import React, {useState} from 'react';
import style from './scenariosContainer.module.sass';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TriggersContainer from '../../scenariosAndTriggers/triggersContainer/triggersContainer';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {addNewScenario} from "../../../actions/actionCreator";
import {withRouter} from "react-router-dom";


const ScenariosContainer = (props) => {

    const [changedScenarioId, changeScenarioId] = useState(false);

    const newScenarioHandler = () => {

        props.addScenario(props.match.params.botId);
    };



    if(changedScenarioId) {
        return (
            <div className={style.triggersContainer}>
                    <TriggersContainer
                        changedScenarioId={changedScenarioId}
                    />
            </div>
        )
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.controls}>
                <div className={style.createButton} onClick={newScenarioHandler}>Создать команду</div>
                <div className={style.infoBlock}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    <div className={style.infoText}>
                        <p>Ответы на популярные вопросы и уроки по настройке бота находятся в Руководстве.</p>
                        <p>Перейти в руководство</p>
                    </div>
                </div>
            </div>
            <div className={style.scenariosContainer}>
                {
                    props.botScenarios && props.botScenarios.map(elem => (
                        <div className={style.scenariosElement} onClick={() => changeScenarioId(elem.id)}>
                            <h2>{elem.trigger_text}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const {botScenarios, isFetching, error} = state.singleBotReducers;

    return {
        botScenarios, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    addScenario: (botId) => dispatch(addNewScenario(botId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScenariosContainer));