import * as ActionTypes from './ActionTypes';

export const Cards = (state = {
    isLoading: true,
    errMess: null,
    cards: null,
    currentCard: null,
    translation: null,
    editMode: false
}, action) => {
    switch(action.type){
        case ActionTypes.GET_CARDS:
            return {...state, isLoading: true, errMess:null, cards: action.payload }
        
        case ActionTypes.UPDATE_CURRENT_CARD:
            return {...state, currentCard: action.payload[0], editMode: action.payload[1]}

        case ActionTypes.UPDATE_TRANSLATION:
            return {...state, translation: action.payload[0], source: action.payload[1], editMode: action.payload[2] }

        case ActionTypes.CREATE_CARD:
            const newCards = state.cards ? Array(state.cards).push(action.payload) : [];
            return {...state, isLoading: true, errMess:null, cards: newCards}

        case ActionTypes.DELETE_CARD:
            const updatedCards = Array(state.cards).filter(card => card.id !== action.payload)
            return {...state, isLoading: true, errMess:null, cards: updatedCards}

        case ActionTypes.CARD_LOADING:
            return {...state, isLoading: true, errMess: null,  cards: null}

        case ActionTypes.CARD_FAILED:
            return {...state, isLoading: false, errMess: action.payload,  cards: null}

        default:
            return state
    }
};