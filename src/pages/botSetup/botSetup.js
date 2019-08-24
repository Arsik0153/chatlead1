import React, {useEffect} from 'react';
import style from './botSetup.module.sass';
import SetupContainer from "../../componens/setupContainer/setupContainer"
import Header from '../../componens/header/header';
import NavBar from '../../componens/navbar/navbar';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {getManager} from "../../actions/actionCreator";


const BotSetup = (props) => {
    const {botSetupData} = props;
    
    useEffect(() => {
        props.getManager(props.match.params.botId);
    }, []);

    return(
        <div className="main_layout">
            <Header/>
            <main id="main">
                <NavBar/>
                <SetupContainer
                {...botSetupData}/>
            </main>
        </div>
    )
}

const mapStateToProps = state => {
    const {botSetupData, isFetching, error} = state.botSetupReducers;

    return {
        botSetupData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    getManager: (botId) => dispatch(getManager(botId))
});

export default connect(mapStateToProps, mapDispatchToProps)(BotSetup);
