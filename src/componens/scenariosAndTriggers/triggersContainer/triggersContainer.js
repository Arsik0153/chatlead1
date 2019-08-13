import React, {useState} from 'react';
import style from './triggersContainer.module.sass';
import {addNewTrigger} from "../../../actions/actionCreator";
import {connect} from 'react-redux';


const TriggersContainer = (props) => {
    const {changedScenario} = props;
    const [changedTrigger, changeTrigger] = useState(changedScenario[0]);

    const newTriggerHandler = () => {
        console.log(changedScenario, props.botsData);
        // const triggerData = {
        //   scenario_id: changedScenario.id,
        //   manager_id:
        // };
    };


    return (
        <div className={style.mainContainer}>
            <div className={style.sideContainer}>
                {
                    changedScenario.map(trigger => (
                        <div
                            className={style.singleTriggerContainer}
                            onClick={() => changeTrigger(trigger)}
                        >
                            <h2>{trigger.caption}</h2>
                        </div>
                    ))
                }
                <div onClick={newTriggerHandler}>+Новый триггер</div>
            </div>
            <div className={style.contentContainer}>
                {
                    changedTrigger.messages.map(elem => (
                        <div className={style.message}>
                            {elem.text}
                        </div>
                    ))
                }
            </div>
            <div className={style.phone}>
                phone
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const {botScenarios, isFetching, error} = state.singleBotReducers;
    const {botsData} = state.botsReducers;

    return {
        botScenarios, isFetching, error, botsData
    }
};

const mapDispatchToProps = dispatch => ({
   addNewTrigger: (triggerData) => dispatch(addNewTrigger(triggerData))
});


export default connect(mapStateToProps, mapDispatchToProps)(TriggersContainer);
