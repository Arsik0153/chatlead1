import React, {useEffect} from 'react';
import style from '../bots/bots.module.sass';
import Header from '../../componens/header/header';
import CreateBotForm from '../../componens/forms/createBotForm/createBotForm';
import {connect} from 'react-redux';
import {getAllBotsForUser} from "../../actions/actionCreator";
import BotsElement from '../../componens/botsElement/botsElement';

const Bots = (props) => {
    const {botsData} = props;

    useEffect(() => {
        props.getAllBots();
    }, [props.userData]);


    return (
        <div className={style.mainContainer}>
            <Header/>
            <CreateBotForm/>

            <div className={style.botsMainContainer}>
                {
                    botsData.managers && botsData.managers.map(elem => (
                        <BotsElement
                            {...elem}
                        />
                    ))
                }
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const {botsData, isFetching, error} = state.botsReducers;

    return {
        botsData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    getAllBots: () => dispatch(getAllBotsForUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bots);