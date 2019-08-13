import React, {useEffect, useState} from 'react';
import style from './singleBot.module.sass';
import Header from '../../componens/header/header';
import {getAllScenariesForBot} from "../../actions/actionCreator";
import {connect} from 'react-redux';
import ScenariosContainer from '../../componens/scenariosAndTriggers/scenariosContainer/scenariosContainer';
import NavBar from '../../componens/navbar/navbar';


const SingleBot = (props) => {

    useEffect(() => {
        props.getScenaries(props.match.params.botId)
    }, []);




    return (
        <div className={style.mainContainer}>
            <Header/>
            <NavBar/>
            <div className={style.contentBlock}>
                <ScenariosContainer/>
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
   getScenaries: (botId) => dispatch(getAllScenariesForBot(botId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleBot);