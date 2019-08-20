import React, {useEffect} from 'react';
import style from '../bots/bots.module.sass';
import MainHeader from '../../componens/mainHeader/mainHeader';
import CreateBotForm from '../../componens/forms/createBotForm/createBotForm';
import {connect} from 'react-redux';
import {getAllBotsForUser} from "../../actions/actionCreator";
import BotsElement from '../../componens/botsElement/botsElement';

const Bots = (props) => {
    const {botsData} = props;

    useEffect(() => {
        props.getAllBots();
    }, [props.userData]);

    // TODO styles
    return (
        <div className="main_layout">
            <MainHeader/>
            <main id="main">
                <section style={{marginTop: "10px"}}>
                    <div className="container">
                        <CreateBotForm/>

                        <ul className="bot-list">
                            {
                                botsData.managers && botsData.managers.map(elem => (
                                    <BotsElement
                                        {...elem}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                </section>
            </main>
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