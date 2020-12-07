import * as ActionTypes from './ActionTypes';

export const User = (state = {
    isLoading: true,
    errMess: null,
    user: null
}, action) => {
    switch(action.type){
        case ActionTypes.CREATE_USER:
            return {...state, isLoading: true, errMess:null, user: action.payload}

        case ActionTypes.USER_LOADING:
            return {...state, isLoading: true, errMess: null,  user: null}

        case ActionTypes.USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload,  user: null}

        default:
            return state
    }
};