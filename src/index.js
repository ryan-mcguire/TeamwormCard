import React from 'react';
import ReactDOM from 'react-dom';
//import {Provider} from 'react-redux';
//import {createStore} from 'redux';
//import {TeamworkApp} from './reducers/TeamworkApp';
import TeamworkController from './components/TeamworkController.js';
//import registerServiceWorker from './registerServiceWorker';
import './index.css';

//let store = createStore(TeamworkApp);
//ReactDOM.render(
//    <Provider store={store}>
//        <TeamworkController />
//    </Provider>,
//    document.getElementById('root')
//);
ReactDOM.render(<TeamworkController />, document.getElementById('root'));

//registerServiceWorker();