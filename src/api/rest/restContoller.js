import axios from 'axios';
import { restURL } from '../baseURL';


export const signUp = (signUpData) => (
    axios.post(`${restURL}/CreateUser/`, signUpData)
);

export const auth = (authData) => (
    axios.post(`${restURL}/GetUserToken/`, authData)
);

export const createBot = (createBotData) => (
  axios.post(`${restURL}/CreateManager/`, createBotData)
);

export const getAllBotsForUser = (userData) => (
    axios.post(`${restURL}/GetUserManagers/`, userData)
);