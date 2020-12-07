import * as ActionTypes from './ActionTypes';

export const Decks = (state = {
    isLoading: true,
    errMess: null,
    decks: null,
    editMode: false,
    practicePopupOpen: false
}, action) => {
    switch(action.type){
        case ActionTypes.GET_DECKS:
            return {...state, isLoading: true, errMess:null, decks: action.payload, currentDeck: null}
        
        case ActionTypes.UPDATE_CURRENT_DECK:
            return {...state, currentDeck: action.payload[0], editMode: action.payload[1], practicePopupOpen: action.payload[2]}
            
        case ActionTypes.CREATE_DECK:
            const newDecks = state.decks ? Array(state.decks).push(action.payload) : [];
            return {...state, isLoading: true, errMess:null, decks: newDecks, currentDeck: null}
        
        case ActionTypes.DELETE_CARD:
            const updatedDecks = Array(state.decks).filter(deck => deck.id !== action.payload)
            return {...state, isLoading: true, errMess:null, decks: updatedDecks}
        
        case ActionTypes.PRACTICE_POPUP_OPEN:
            return {...state, practicePopupOpen: action.payload}

        case ActionTypes.DECK_LOADING:
            return {...state, isLoading: true, errMess: null,  decks: null, currentDeck: null}

        case ActionTypes.DECK_FAILED:
            return {...state, isLoading: false, errMess: action.payload,  decks: null, currentDeck: null}

        default:
            return state
    }
};