import React from 'react';
import { createStore } from  'redux';
import { Provider } from  'react-redux';
import allReducers from './reducers/index.js'
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const  store  =  createStore(allReducers)  

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
