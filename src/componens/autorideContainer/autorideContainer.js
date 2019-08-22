import React, {useState} from 'react';
import style from './autorideContainer.module.sass';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import trashImage from "../../images/trash.png";
import {ScenarioIdContext} from "../../utils/Contexts";
import TriggersContainer from "../scenariosAndTriggers/triggersContainer/triggersContainer";
import {addNewAutoride} from "../../actions/actionCreator";
import {withRouter} from "react-router-dom";


const AutorideContainer = (props) => {
    const [changedScenarioId, changeScenarioId] = useState(false);


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

    const newAutoride = () => {
        props.appendAutoride(props.match.params.botId);
    };


    return (
        <div className={style.mainContainer}>
            <div className={style.controls}>
                <div className={style.createButton} onClick={newAutoride}>Создать автоворонку</div>
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
                    props.autoridesData.map(elem => (
                        <div className={style.autoridesElement}>
                            <h2 onClick={() => changeScenarioId(elem.scenario.id)}>{elem.scenario.trigger_text}</h2>
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
    const {autoridesData, isFetching, error} = state.autoridesReducers;

    return {
        autoridesData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
   appendAutoride: (managerId) => dispatch(addNewAutoride(managerId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AutorideContainer));