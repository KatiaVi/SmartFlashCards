import * as ActionTypes from './ActionTypes';

const axios = require('axios');
const baseUrl = 'http://localhost:8080/v1/'


// Action Creators to POST user
export const createUser = (user) => ({
    type: ActionTypes.CREATE_USER,
    payload: user
});

// Action Creators to POST a new deck
export const createDeck = (deck) => ({
    type: ActionTypes.CREATE_DECK,
    payload: deck
});

// Action Creators to GET all decks
export const createDecks = (decks) => ({
    type: ActionTypes.GET_DECKS,
    payload: decks
});

export const updateCurrentDeck = (deck, editMode, practiceMode) => ({
    type: ActionTypes.UPDATE_CURRENT_DECK,
    payload: [deck, editMode, practiceMode]
});

export const deleteDeckFromDecks = (deckId) => ({
    type: ActionTypes.DELETE_DECK,
    payload: deckId
});

export const createCards = (cards) => ({
    type: ActionTypes.GET_CARDS,
    payload: cards
});

export const createCard = (card) => ({
    type: ActionTypes.CREATE_CARD,
    payload: card
});

export const updateCurrentCard = (card, editMode) => ({
    type: ActionTypes.UPDATE_CURRENT_CARD,
    payload: [card, editMode]
});

export const deleteCardFromCards = (cardId) => ({
    type: ActionTypes.DELETE_CARD,
    payload: cardId
});

export const updateCurrentTranslation = (translation, source, editMode) => ({
    type: ActionTypes.UPDATE_TRANSLATION,
    payload: [translation, source, editMode]
});

export const updatePracticingCards = (practiceOpen) => ({
    type: ActionTypes.PRACTICE_POPUP_OPEN,
    payload: practiceOpen
});

export const postUser = (username, useremail) => (dispatch) => {
    const url = baseUrl + "Users";
    return axios({
        method: "POST",
        url,
        data:JSON.stringify({
            username: username,
            email: useremail
        }),
        headers:{'Content-Type': 'application/json; charset=utf-8'}
    }).then(response => dispatch(createUser(response["data"])))
    .catch(function (error) {
        alert(error);
    });
}

export const postDeck = (userId, title, languageCode) => (dispatch) => {
    const url = baseUrl + "Users/" + userId + "/Decks";
    return axios({
        method: "POST",
        url,
        data:JSON.stringify({
            title: title,
            language: languageCode
        }),
        headers:{'Content-Type': 'application/json; charset=utf-8'}
    }).then(response => {
        alert("Successfully created your new " + title + " deck.");
        dispatch(createDeck(response["data"]));
    })
    .catch(function (error) {
        alert(error);
    })
}

export const updateDeck = (userId, deckId, title, languageCode) => (dispatch) => {
    const url = baseUrl + "Users/" + userId + "/Decks/" + deckId;
    return axios({
        method: "PUT",
        url,
        data:JSON.stringify({
            title: title,
            language: languageCode
        }),
        headers:{'Content-Type': 'application/json; charset=utf-8'}
    }).then(response => {
        alert("Successfully created your new " + title + " deck.");
        dispatch(createDeck(response["data"]));
    })
    .catch(function (error) {
        alert(error);
    })}

export const deleteDeck = (userId, deckId) => (dispatch) => {
    const url = baseUrl + "Users/" + userId + "/Decks/" + deckId;
    return axios({
        method: "DELETE",
        url
    }).then(response => {
        dispatch(deleteDeckFromDecks(deckId));
    })
    .catch(function (error) {
        alert(error);
    })}

export const getUserInfo = (userId) => (dispatch) => {
  const url = baseUrl + 'Users/' + userId
  return axios({
      method: "GET",
      url
  }).then(response => dispatch(createUser(response["data"])))
  .catch(error => alert(error));
}

export const getDecks = (userId) => (dispatch) => {
    const url = baseUrl + 'Users/' + userId + '/Decks'
    return axios({
        method: "GET",
        url
    }).then(response => dispatch(createDecks(response["data"])))
    .catch(error => alert(error));
  }

export const getDeckInfo = (userId, deckId) => (dispatch) => {
    const url = baseUrl + 'Users/' + userId + '/Decks/' + deckId
    return axios({
        method: "GET",
        url
    }).then(response => dispatch(updateCurrentDeck(response["data"], false, false)))
    .catch(error => alert(error));
}

export const getCards = (deckId) => (dispatch) => {
    const url = baseUrl + '/Decks/' + deckId + '/Cards'
    return axios({
        method: "GET",
        url
    }).then(response => dispatch(createCards(response["data"])))
    .catch(error => alert(error));
  }

export const postCard = (deckId, translation, source, languageCode) => (dispatch) => {
    const url = baseUrl + '/Decks/' + deckId + '/Cards'
    return axios({
        method: "POST",
        url,
        data:JSON.stringify({
            source: source,
            translation: translation,
            language: languageCode
        }),
        headers:{'Content-Type': 'application/json; charset=utf-8'}
    }).then(response => {
        console.log("Successfully created your new card for " + source + ".");
        return dispatch(createCard(response["data"]));
    })
    .catch(function (error) {
        alert(error);
    })
}

export const updateCard = (deckId, cardId, translation, source, languageCode) => (dispatch) => {
    const url = baseUrl + '/Decks/' + deckId + '/Cards/' + cardId
    return axios({
        method: "PUT",
        url,
        data:JSON.stringify({
            source: source,
            translation: translation,
            language: languageCode
        }),
        headers:{'Content-Type': 'application/json; charset=utf-8'}
    }).then(response => {
        console.log("Successfully created your new card for " + source + ".");
        return dispatch(createCard(response["data"]));
    })
    .catch(function (error) {
        alert(error);
    })
}

export const deleteCard = (deckId, cardId) => (dispatch) => {
    console.log("deckid ", deckId);
    const url = baseUrl + '/Decks/' + deckId + '/Cards/' + cardId
    return axios({
        method: "DELETE",
        url
    }).then(response => {
        console.log("Successfully deleted card " + cardId + ".");
        return dispatch(deleteCardFromCards(cardId));
    })
    .catch(function (error) {
        alert(error);
    })
}

export const getTranslation = (currentCard, source, languageCode, editMode) => (dispatch) => {
    const url = baseUrl + 'translation?source=' + source + '&language=' + languageCode;
    return axios({
        method: "GET",
        url
    }).then(response => {
        const newCurrentCard = { id: currentCard && currentCard.id, deckId: currentCard && currentCard.deckId, source: source, translation: response["data"]["translation"] }
        dispatch(updateCurrentCard(newCurrentCard, editMode))
    })
    .catch(error => alert(error));
}

export const setCurrentCard = (card, editMode) => (dispatch) => {
    dispatch(updateCurrentCard(card, editMode));
} 

export const setCurrentDeck = (deck, editMode, practiceMode) => (dispatch) => {
    dispatch(updateCurrentDeck(deck, editMode, practiceMode));
} 

export const setPracticingCards = (practicePopupOpen) => (dispatch) => {
    dispatch(updatePracticingCards(practicePopupOpen))
}