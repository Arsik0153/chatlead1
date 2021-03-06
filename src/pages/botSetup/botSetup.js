import React, {useEffect} from 'react';
import style from './botSetup.module.sass';
import SetupContainer from "../../componens/setupContainer/setupContainer"
import Header from '../../componens/header/header';
import MainHeader from '../../componens/mainHeader/mainHeader';
import NavBar from '../../componens/navbar/navbar';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {changeScenarioId, getManager} from "../../actions/actionCreator";
import {ScenarioIdContext} from "../../utils/Contexts";
import TriggersContainer from "../../componens/scenariosAndTriggers/triggersContainer/triggersContainer";


const BotSetup = (props) => {
    const {changeScenarioId, changedScenarioId} = props;
    const {botSetupData} = props;
    
    useEffect(() => {
        props.getManager(props.match.params.botId);
    }, []);

    const contentContainer = () => {

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

        return (
            <main id="main">
                <SetupContainer
                    {...botSetupData}/>
            </main>
        )
    };

    return(
        <div className="main_layout">
=           <Header/>
            <MainHeader/>
            <NavBar/>
            {contentContainer()}
        </div>
    )
};

const mapStateToProps = state => {
    const {botSetupData, isFetching, error} = state.botSetupReducers;
    const {changedScenarioId} = state.singleBotReducers;

    return {
        botSetupData, isFetching, error, changedScenarioId
    }
};

const mapDispatchToProps = dispatch => ({
    getManager: (botId) => dispatch(getManager(botId)),
    changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId))

});

export default connect(mapStateToProps, mapDispatchToProps)(BotSetup);
