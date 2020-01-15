import {combineReducers} from  'redux'
import  authReducer from './authReducers'

const  allReducers  =  combineReducers({
    auth:  authReducer,
});

export  default  allReducers;