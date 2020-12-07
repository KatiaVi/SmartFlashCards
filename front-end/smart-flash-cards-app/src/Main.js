import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import CardDeckPage from './pages/CardDeckPage';
import LearningSpacePage from './pages/LearningSpacePage';
import { Route, Switch, withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { postDeck, postUser, getUserInfo, getDecks, getDeckInfo, getCards, postCard, getTranslation, updateCard, setCurrentCard, setCurrentDeck, updateDeck, deleteCard, deleteDeck, setPracticingCards } from './redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      decks: state.decks.decks,
      currentDeck: state.decks.currentDeck,
      cards: state.cards.cards,
      currentCard: state.cards.currentCard,
      translation: state.cards.translation,
      editMode: state.cards.editMode,
      source: state.cards.source,
      editDeckMode: state.decks.editMode,
      practicePopupOpen: state.decks.practicePopupOpen
    }
  };
  
  const mapDispatchToProps = (dispatch) => ({
    postUser: (username, email) => dispatch(postUser(username, email)),
    postDeck: (userId, title, languageCode) => dispatch(postDeck(userId, title, languageCode)),
    getUserInfo: (userId) => dispatch(getUserInfo(userId)),
    getDecks: (userId) => dispatch(getDecks(userId)),
    getDeckInfo: (userId, deckId) => dispatch(getDeckInfo(userId, deckId)),
    getCards: (deckId) => dispatch(getCards(deckId)),
    postCard: (deckId, translation, source, languageCode) => dispatch(postCard(deckId, translation, source, languageCode)),
    updateCard: (deckId, cardId, translation, source, languageCode) => dispatch(updateCard(deckId, cardId, translation, source, languageCode)),
    getTranslation: (card, source, languageCode, editMode) => dispatch(getTranslation(card, source, languageCode, editMode)),
    setCurrentCard: (card, editMode) => dispatch(setCurrentCard(card, editMode)),
    setCurrentDeck: (deck, editMode, practiceMode) => dispatch(setCurrentDeck(deck, editMode, practiceMode)),
    updateDeck: (userId, deckId, title, languageCode) => dispatch(updateDeck(userId, deckId, title, languageCode)),
    deleteCard: (deckId, cardId) => dispatch(deleteCard(deckId, cardId)),
    deleteDeck: (userId, deckId) => dispatch(deleteDeck(userId, deckId)),
    setPracticingCards: (practiceCardsOpen) => dispatch(setPracticingCards(practiceCardsOpen))
  });

class Main extends Component {

    render() {
        const HomePageComponent = () => {
            return (
            <HomePage 
            postDeck={this.props.postDeck}
            postUser={this.props.postUser}
            user={this.props.user} />);
        };

        const LearningSpacePageComponent = (userId) => {
            return (
            <LearningSpacePage 
            userId={userId}
            postDeck={this.props.postDeck}
            getUserInfo={this.props.getUserInfo}
            getDecks={this.props.getDecks}
            setCurrentDeck={this.props.setCurrentDeck}
            user={this.props.user}
            decks={this.props.decks}
            currentDeck={this.props.currentDeck}
            inEditMode={this.props.editDeckMode}
            updateDeck={this.props.updateDeck}
            deleteDeck={this.props.deleteDeck}
            getCards={this.props.getCards}
            cards={this.props.cards}
            practicePopupOpen={this.props.practicePopupOpen}
            setPracticingCards={this.props.setPracticingCards}
            />);
        };

        const CardDeckPageComponent = (userId, deckId) => {
          return(
            <CardDeckPage 
              userId={userId}
              deckId={deckId}
              deck={this.props.currentDeck}
              cards={this.props.cards}
              currentCard={this.props.currentCard}
              translation={this.props.translation}
              source={this.props.source}
              editMode={this.props.editMode}
              getDeckInfo={this.props.getDeckInfo}
              getCards={this.props.getCards}
              postCard={this.props.postCard}
              getTranslation={this.props.getTranslation}
              updateCard={this.props.updateCard}
              setCurrentCard={this.props.setCurrentCard}
              deleteCard={this.props.deleteCard}
            />
          );
        };
        return(
            <div>
                {/* <Route path="/learning-space/card-deck/" component={CardDeckPage} />
                <Route path="/learning-space/" component={LearningSpacePage} /> */}
                <Switch>
                <Route exact path="/" component={HomePageComponent}/>
                <Route path="/learning-space/:userId/deck/:deckId" component={ () => {
                  let {userId, deckId} = useParams();
                  return CardDeckPageComponent(userId, deckId)
                  }} />
                <Route path="/learning-space/:userId" component={() => {
                  let {userId} =  useParams();
                  return LearningSpacePageComponent(userId);
                }} />
                </Switch>
                {/* <Route path="/">
                    <Redirect to="/" component={HomePage} />
                </Route> */}
            </div>
      )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));