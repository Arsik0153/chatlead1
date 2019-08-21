import React, {useState} from 'react';
import style from './scenariosContainer.module.sass';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TriggersContainer from '../../scenariosAndTriggers/triggersContainer/triggersContainer';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {addNewScenario, deleteScenario} from "../../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import trashImage from '../../../images/trash.png';
import {ScenarioIdContext} from "../../../utils/Contexts";


const ScenariosContainer = (props) => {

    const [changedScenarioId, changeScenarioId] = useState(false);


    const newScenarioHandler = () => {

        props.addScenario(props.match.params.botId);
    };



    if(changedScenarioId) {
        return (
            <div className={style.triggersContainer}>
                   <ScenarioIdContext.Provider value={changedScenarioId}>
                       <ScenarioIdContext.Consumer>
                           {scenarioId => (
                               <TriggersContainer
                                   changedScenarioId={changedScenarioId}
                                   scenarioId={scenarioId}
                               />
                           )}
                       </ScenarioIdContext.Consumer>
                   </ScenarioIdContext.Provider>
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
                        <div className={style.scenariosElement}>
                            <h2 onClick={() => changeScenarioId(elem.id)}>{elem.trigger_text}</h2>
                            <img src={trashImage} alt={'trash'} onClick={() => props.deleteScenario({
                                botId: props.match.params.botId,
                                idScenario: elem.id
                            })}/>
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
    addScenario: (botId) => dispatch(addNewScenario(botId)),
    deleteScenario: (scenarioData) => dispatch(deleteScenario(scenarioData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScenariosContainer));