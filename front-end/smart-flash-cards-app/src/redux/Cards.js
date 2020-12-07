import * as ActionTypes from './ActionTypes';

export const Cards = (state = {
    isLoading: true,
    errMess: null,
    cards: null,
    currentCard: null
}, action) => {
    switch(action.type){
        case ActionTypes.GET_CARDS:
            return {...state, isLoading: true, errMess:null, cards: action.payload}
        
        case ActionTypes.UPDATE_CURRENT_CARD:
            console.log(action.payload);
            alert("HAHA");
            return {...state, currentCard: action.payload}
            
        case ActionTypes.CREATE_CARD:
            const newCards = state.cards ? Array(state.cards).push(action.payload) : [];
            return {...state, isLoading: true, errMess:null, cards: newCards}

        case ActionTypes.CARD_LOADING:
            return {...state, isLoading: true, errMess: null,  cards: null}

        case ActionTypes.CARD_FAILED:
            return {...state, isLoading: false, errMess: action.payload,  cards: null}

        default:
            return state
    }
};