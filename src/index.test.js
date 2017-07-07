import React from 'react';
import ReactDOM from 'react-dom';
//import Index from './index';
import renderer from 'react-test-renderer';
import TeamworkCard from './components/TeamworkCard.js';
import TeamworkCardContainer from './containers/TeamworkCardContainer';
import SortTable from './components/SortTable.js';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import TeamworkApp from './reducers/TeamworkApp';

it('TeamworkCardContainer renders', () => {
    // This does everything Index does without actually using Index.
    const div = document.createElement('div');
    let store = createStore(TeamworkApp); 
    var Index = <Provider store={store}><TeamworkCardContainer /></Provider>
    ReactDOM.render(Index, div);
});

it('Index renders', () => {
    var Index;
    const div = document.createElement('div');

    ReactDOM.render(Index, document.getElementById('root'));
});


//describe("TWCC", () => {
//    const initialState = {
//        projects: [],
//        tasklists: [],
//        columns: [],
//        tasks: [],
//        selectedItems: {}
//    };
//    const mockStore = configureStore();

//    let store, container;

//    beforeEach(() => {
//        store = mockStore(initialState);
//        container = shallow(<TeamworkCardContainer state={store} />);
//    });

//    it('test1', () => {
//        expect(container.length).toEqual(1);
//    });
//});