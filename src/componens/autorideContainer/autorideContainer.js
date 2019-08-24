import React, {useState, useEffect} from 'react';
import style from './autorideContainer.module.sass';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import trashImage from "../../images/trash.png";
import {ScenarioIdContext} from "../../utils/Contexts";
import TriggersContainer from "../scenariosAndTriggers/triggersContainer/triggersContainer";
import {addNewAutoride, deleteAutoride} from "../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import vk from '../../images/imageForTable/vk-icon.png';
import telegram from '../../images/imageForTable/tlg-icon.png';
import facebook from '../../images/imageForTable/fb-icon.png';
import viber from '../../images/imageForTable/wh-icon.png';
import edit from '../../images/buttons/edit.png';
import trash from '../../images/buttons/trash.png';
import copy from '../../images/duplicate.jpg';
import {destinationScenario} from "../../constants/defaultValues";


const AutorideContainer = (props) => {
    const [changedScenarioId, changeScenarioId] = useState(false);
    const [autoridesDataInFilter, setautoridesDataInFilter] = useState([]);
    const [isOpenCreateScenarioFild, setStatusCreateScenarioFild] = useState(false);


    useEffect(() => {
        setautoridesDataInFilter(props.autoridesData)
    }, [props.autoridesData]);

    const newAutorideHandler = () => {
        props.appendAutoride(props.match.params.botId, isOpenCreateScenarioFild);
        // // props.addScenario(props.match.params.botId, destinationScenario.default, isOpenCreateScenarioFild);
        setStatusCreateScenarioFild(false);
    };


    if(isOpenCreateScenarioFild) {
        return (
            <div className={style.newScenarioContainer}>
                <div className={style.buttonsContainer}>
                    <div
                        className={style.before}
                        onClick={() => setStatusCreateScenarioFild(false)}
                    >
                        Назад к списку
                    </div>
                    <div className={style.next} onClick={newAutorideHandler}>Далее</div>
                </div>
                <div className={style.contentContainer}>
                    <h2>Воронка</h2>
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
                            />
                        )}
                    </ScenarioIdContext.Consumer>
                </ScenarioIdContext.Provider>
            </div>
        )
    }


    const dynamicSearchData = (searchString) => {
        const scenariosData = [];
        props.autoridesData.forEach(elem => {
            if(searchString) {
                if(elem.scenario.trigger_text.toLowerCase().indexOf(searchString.toLowerCase()) != -1) {
                    scenariosData.push(elem);
                }
            }else if(!searchString) {
                scenariosData.push(elem);
            }
        });
        setautoridesDataInFilter(scenariosData);
    };


    return (
        <div className={style.mainContainer}>
            <div className={style.controls}>
                <div className={style.createButton} onClick={() => setStatusCreateScenarioFild(true)}>
                    Создать автоворонку
                </div>
                <div className={style.hardLine} />
                <div className={style.infoBlock}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    <div className={style.infoText}>
                        <p>Ответы на популярные вопросы и уроки по настройке бота находятся в Руководстве.</p>
                        <span>Перейти в руководство</span>
                    </div>
                </div>
            </div>
            <div className={style.scenariosContainer}>
                <div className={style.inputContainer}>
                    <h2>Автоворонка</h2>
                    <input
                        type={'text'}
                        className={style.searchString}
                        placeholder={'Найти автоворонку'}
                        onInput={(e) => dynamicSearchData(e.target.value)}
                    />
                </div>
                <table>
                    <tr>
                        <td>Название</td>
                        <td>Каналы</td>
                        <td />
                    </tr>
                    {
                        autoridesDataInFilter.map(elem => (
                            <tr>
                                <td className={style.keyWord} onClick={() => changeScenarioId(elem.scenario.id)}>
                                    Сообщение в точности совпадает с <span>{elem.scenario.trigger_text}</span>
                                </td>
                                <td>
                                    <img src={vk} alt={'vk'} />
                                    <img src={telegram} alt={'tg'} />
                                    <img src={facebook} alt={'fb'} />
                                    <img src={viber} alt={'viber'} />
                                </td>
                                <td className={style.controlsImages}>
                                   <div className={style.icon}>
                                       <img src={edit} alt={'edit'} />
                                   </div>
                                    <div className={style.icon}>
                                        <img src={copy} alt={'copy'} />
                                    </div>
                                    <div
                                        className={style.icon}
                                        onClick={() => props.deleteAutoride(props.match.params.botId, elem.id)}
                                    >
                                        <img src={trash} alt={'trash'} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </table>

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
   appendAutoride: (managerId, name) => dispatch(addNewAutoride(managerId, name)),
    deleteAutoride: (managerId, autorideId) => dispatch(deleteAutoride(managerId, autorideId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AutorideContainer));