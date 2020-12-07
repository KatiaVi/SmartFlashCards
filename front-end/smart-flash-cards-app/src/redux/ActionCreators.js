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

export const updateCurrentDeck = (deck) => ({
    type: ActionTypes.UPDATE_CURRENT_DECK,
    payload: deck
});

export const createCards = (cards) => ({
    type: ActionTypes.GET_CARDS,
    payload: cards
});

export const createCard = (card) => ({
    type: ActionTypes.CREATE_CARD,
    payload: card
});

export const updateCurrentCard = (card) => ({
    type: ActionTypes.UPDATE_CURRENT_CARD,
    payload: card
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
        alert("Successfully created your new " + title + "deck.");
        dispatch(createDeck(response["data"]));
    })
    .catch(function (error) {
        alert(error);
    })
}

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
    }).then(response => dispatch(updateCurrentDeck(response["data"])))
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
    alert(translation);
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
        alert("Successfully created your new card for " + source + ".");
        dispatch(createCard(response["data"]));
    })
    .catch(function (error) {
        alert(error);
    })
}

export const getCard = (deckId, cardId) => (dispatch) => {
    const url = baseUrl + 'Decks/' + deckId + '/Cards/' + cardId;
    alert(url);
    return axios({
        method: "GET",
        url
    }).then(response => dispatch(updateCurrentCard(response["data"])))
    .catch(error => alert(error));
  }