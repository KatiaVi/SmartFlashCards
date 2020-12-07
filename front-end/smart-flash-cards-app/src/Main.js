import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import CardDeckPage from './pages/CardDeckPage';
import LearningSpacePage from './pages/LearningSpacePage';
import { Route, Switch, Redirect, withRouter, BrowserRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { postDeck, postUser, getUserInfo, getDecks, getDeckInfo, getCards, postCard, getCard } from './redux/ActionCreators';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      decks: state.decks.decks,
      currentDeck: state.decks.currentDeck,
      cards: state.cards.cards,
      currentCard: state.cards.currentCard
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
    getCard: (deckId, cardId) => dispatch(getCard(deckId, cardId))
    // postCard: (source, translation, languageCode) => {dispatch(fetchDishes(source, translation, languageCode))}
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
            user={this.props.user}
            decks={this.props.decks} />);
        };

        const CardDeckPageComponent = (userId, deckId) => {
          return(
            <CardDeckPage 
              userId={userId}
              deckId={deckId}
              deck={this.props.currentDeck}
              cards={this.props.cards}
              currentCard={this.props.currentCard}
              getDeckInfo={this.props.getDeckInfo}
              getCards={this.props.getCards}
              postCard={this.props.postCard}
              getCard={this.props.getCard}
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