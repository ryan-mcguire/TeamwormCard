import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import TeamworkApp from './reducers/TeamworkApp';
import TeamworkController from './components/TeamworkController.js';
import TeamworkCardContainer from './containers/TeamworkCardContainer.js';
//import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

let store = createStore(TeamworkApp); 
//let store = createStore(TeamworkApp, 
//                        {projects: [], tasklists: [], tasks: [], columns: [], selectedItems: {}}, 
//                        applyMiddleware(reduxImmutableStateInvariant()));

var Index = <Provider store={store}><TeamworkCardContainer /></Provider>

ReactDOM.render(Index, document.getElementById('root'));
//ReactDOM.render(<TeamworkController />, document.getElementById('root'));

//registerServiceWorker();

export default Index