import { combineReducers } from 'redux';
import { TitleRedux } from './Title/TitleRedux';

const titleRedux = new TitleRedux();

const rootReducer = combineReducers({
    title: titleRedux.reduce
});

export default rootReducer;
