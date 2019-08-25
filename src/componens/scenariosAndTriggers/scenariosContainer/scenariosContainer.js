import React, {useState, useEffect} from 'react';
import style from './scenariosContainer.module.sass';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TriggersContainer from '../../scenariosAndTriggers/triggersContainer/triggersContainer';
import {faAngleDown, faAngleUp, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {addNewScenario, deleteScenario, copyScenario, editScenario, changeScenarioId} from "../../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import {ScenarioIdContext} from "../../../utils/Contexts";
import {destinationScenario} from "../../../constants/defaultValues";
import edit from "../../../images/buttons/edit.png";
import copy from "../../../images/duplicate.jpg";
import trash from "../../../images/buttons/trash.png";
import leftArrow from "../../../svg/db/left-arrow.svg";
import ClickOutSide from '../../hoc/clickOutside';
import UserIcon from "../../../images/user.png";
import ContextMenuForEditScenario from './contextMenuForEditScenario/contextMenuForEditScenario';



const ScenariosContainer = (props) => {
    const {changeScenarioId, changedScenarioId} = props;

    // const [changedScenarioId, changeScenarioId] = useState(false);
    const [scenariosDataInFilter, setScenariosDataInFilter] = useState([]);
    const [isOpenCreateScenarioFild, setStatusCreateScenarioFild] = useState(false);
    const [idEditTriggerText, setIdEditTriggerText] = useState(false);

    useEffect(() => {
        setScenariosDataInFilter(props.scenariosForScenarioContainer)
    }, [props.scenariosForScenarioContainer]);

    console.log(props.changedScenarioId);


    const newScenarioHandler = () => {
        props.addScenario(props.match.params.botId, destinationScenario.default, isOpenCreateScenarioFild);
        setStatusCreateScenarioFild(false);
        if(!props.isFetching) {
            console.log(props.botScenarios[props.botScenarios.length - 1].id);
        }
    };

    console.log(props.botScenarios);

    const copyScenario = (id) => {
        const copyedScenario = props.botScenarios.filter(elem => elem.id === id)[0];
        Object.assign(copyedScenario, {
           managerId: props.match.params.botId
        });
        props.copyScenario(copyedScenario);
    };

    const editScenario = (e, scenarioId) => {
        props.editScenario({
            trigger_text: e.target.value,
            botId: props.match.params.botId,
            scenarioId: scenarioId
        })
    };


    if(isOpenCreateScenarioFild) {
        return (
            <div className={style.newScenarioContainer}>
                <div className={style.buttonsContainer}>
                    <div
                        className={style.before}
                        onClick={() => setStatusCreateScenarioFild(false)}
                    >
                        <img src={leftArrow} alt={'back'}/>
                        Назад к списку
                    </div>
                    <div className={style.next} onClick={newScenarioHandler}>Далее</div>
                </div>
               <div className={style.contentContainer}>
                   <h2>Команда</h2>
                   <div className={style.createScenarioContainer}>
                       <textarea
                           placeholder={'Введите ключевое слово'}
                           onInput={(e) => setStatusCreateScenarioFild(e.target.value)}
                       />
                   </div>
               </div>
            </div>
        )
    }


    if(changedScenarioId) {
        return (
            <div className={style.triggersContainer}>
                   <ScenarioIdContext.Provider value={changedScenarioId}>
                       <ScenarioIdContext.Consumer>
                           {scenarioId => (
                               <TriggersContainer
                                   changedScenarioId={changedScenarioId}
                                   scenarioId={scenarioId}
                                   changeScenarioId={changeScenarioId}
                               />
                           )}
                       </ScenarioIdContext.Consumer>
                   </ScenarioIdContext.Provider>
            </div>
        )
    }

    const dynamicSearhData = (searchString) => {
        const scenariosData = [];
        props.scenariosForScenarioContainer.forEach(elem => {
          if(searchString) {
              if(elem.trigger_text.toLowerCase().indexOf(searchString.toLowerCase()) != -1) {
                  scenariosData.push(elem);
              }
          }else if(!searchString) {
              scenariosData.push(elem);
          }
      });
      setScenariosDataInFilter(scenariosData);
    };


    return (

        <div className={style.mainContainer}>
            <div className={style.controls}>
                <div
                    className={style.createButton}
                    onClick={() => setStatusCreateScenarioFild(true)}
                >
                    Создать команду
                </div>
                <div className={style.hardLine} />
                <div className={style.infoBlock}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    <div className={style.infoText}>
                        <p>
                            Ответы на популярные вопросы и уроки по настройке бота находятся в Руководстве.
                        </p>
                        <span>
                            Перейти в руководство
                        </span>
                    </div>
                </div>
            </div>
            <div className={style.scenariosContainer}>
                <div className={style.inputContainer}>
                    <h2>Команды бота</h2>
                    <input type={'text'} className={style.searchString} placeholder={'Найти команду'} onInput={(e) => {
                        dynamicSearhData(e.target.value)
                    }}/>
                </div>
                <table>
                    <tr>
                        <td>Правило</td>
                        <td>Содержимое</td>
                        <td />
                    </tr>
                    {
                        scenariosDataInFilter.map(elem => (
                                <tr>
                                    <td
                                        className={style.keyWord}
                                        onClick={idEditTriggerText === elem.id ? null : () => changeScenarioId(elem.id)}
                                    >
                                        Сообщение в точности совпадает с <span>{elem.trigger_text}</span>
                                        <div className={style.mainEditScenario}>
                                            {
                                                idEditTriggerText === elem.id && (
                                                    <ContextMenuForEditScenario
                                                        onInput={(e) => editScenario(e, elem.id)}
                                                        defaultValue={elem.trigger_text}
                                                        setIdEditTriggerText={(id) => setIdEditTriggerText(id)}
                                                    />
                                                )
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        {elem.triggers.length} ответ
                                    </td>
                                    <td className={style.controlsImages}>
                                        <div
                                            className={style.icon}
                                            title={'Редактировать'}
                                            onClick={() => setIdEditTriggerText(elem.id)}
                                        >
                                            <img src={edit} alt={'edit'}/>
                                        </div>

                                        <div className={style.icon} title={'Копировать'}>
                                            <img src={copy} alt={'copy'} onClick={() => {
                                                copyScenario(elem.id)
                                            }}/>
                                        </div>
                                        <div
                                            className={style.icon}
                                            onClick={() => props.deleteScenario({
                                                botId: props.match.params.botId,
                                                idScenario: elem.id
                                            })}
                                            title={'Удалить'}
                                        >
                                            <img src={trash} alt={'trash'} />
                                        </div>
                                    </td>

                                </tr>
                            // )
                        ))
                    }
                </table>

            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const {botScenarios, scenariosForScenarioContainer, isFetching, error, changedScenarioId} = state.singleBotReducers;

    return {
        botScenarios, scenariosForScenarioContainer, isFetching, error, changedScenarioId
    }
};

const mapDispatchToProps = dispatch => ({
    addScenario: (botId, destination, trigger_text) => dispatch(addNewScenario(botId, destination, trigger_text)),
    deleteScenario: (scenarioData) => dispatch(deleteScenario(scenarioData)),
    copyScenario: (scenarioData) => dispatch(copyScenario(scenarioData)),
    editScenario: (scenarioData) => dispatch(editScenario(scenarioData)),
    changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScenariosContainer));