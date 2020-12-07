import * as ActionTypes from './ActionTypes';

export const Decks = (state = {
    isLoading: true,
    errMess: null,
    decks: null
}, action) => {
    switch(action.type){
        case ActionTypes.GET_DECKS:
            return {...state, isLoading: true, errMess:null, decks: action.payload, currentDeck: null}
        
        case ActionTypes.UPDATE_CURRENT_DECK:
            return {...state, currentDeck: action.payload}
            
        case ActionTypes.CREATE_DECK:
            const newDecks = state.decks ? Array(state.decks).push(action.payload) : [];
            return {...state, isLoading: true, errMess:null, decks: newDecks, currentDeck: null}

        case ActionTypes.DECK_LOADING:
            return {...state, isLoading: true, errMess: null,  decks: null, currentDeck: null}

        case ActionTypes.DECK_FAILED:
            return {...state, isLoading: false, errMess: action.payload,  decks: null, currentDeck: null}

        default:
            return state
    }
};