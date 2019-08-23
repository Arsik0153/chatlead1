/* like mutation */
import ACTION from '../actions/actionTypes';

const initialState = {
    botScenarios: [],
    scenariosForScenarioContainer: [],
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {

        case ACTION.SINGLE_BOT_DATA_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION.SINGLE_BOT_DATA_RESPONSE: {
            const scenariosForScenarioContainer
                = action.dataScenarios.filter(elem => elem.destination === 'undefined');


            return {
                ...state,
                botScenarios: action.dataScenarios,
                scenariosForScenarioContainer: scenariosForScenarioContainer,
                isFetching: false,
                error: null
            }
        }
        case ACTION.SINGLE_BOT_DATA_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}

