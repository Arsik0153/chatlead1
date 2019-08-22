import React, {useEffect} from 'react';
import style from './broadcast.module.sass';
import Header from "../../componens/header/header";
import NavBar from '../../componens/navbar/navbar';
import BroadCastContainer from '../../componens/broadCastContainer/broadCastContainer';
import {getAllBroadCasts} from "../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


const BroadCast = (props) => {

    useEffect(() => {
        props.getBroadCasts(props.match.params.botId);
    }, []);

    console.log(props.broadCastData);


    return (
        <div className={style.mainContainer}>
            <Header/>
            <NavBar/>
            <div className={style.contentBlock}>
                <BroadCastContainer/>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const {broadCastData, isFetching, error} = state.broadCastReducers;

    return {
        broadCastData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    getBroadCasts: (botId) => dispatch(getAllBroadCasts(botId))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroadCast));