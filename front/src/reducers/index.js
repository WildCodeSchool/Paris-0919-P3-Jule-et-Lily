import {combineReducers} from  'redux'
import  authReducer  from  './authReducer'

const  allReducers  =  combineReducers({
    auth:  authReducer,
});

export  default  allReducers;