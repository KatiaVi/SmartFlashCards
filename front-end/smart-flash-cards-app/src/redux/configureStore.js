import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import { User } from './Users';
import {Decks} from './Decks';
import {Cards} from './Cards';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
            decks: Decks,
            cards: Cards
        }),
        applyMiddleware(thunk, logger)
    );
    

    return store;
}