import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import LANGUAGES from '../../helpers/Languages';

class CardDecksBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
    }
    this.handleEditDeck = this.handleEditDeck.bind(this);
  }

  componentDidMount(){
    if (this.props.user && this.props.decks == null){
      this.props.getDecks(this.props.user.id);
    }
  }

  handleEditDeck(e, deckId) {
    e.preventDefault();
    window.location.href = (window.location.href).replace("?", '') + '/deck/' + deckId;
  }

  render(){
    const allDecksArr = this.props.decks || [];
    const allDecks = allDecksArr.map(deck => {
      const languageName = LANGUAGES.filter(obj => obj.languageCode === deck.language )[0].language;
      return(
        <div>
        <br/>
          <Card>
            <CardHeader>{deck.title}</CardHeader>
            <CardBody>
              <p>Language: {languageName}</p>
              <Button className="home-page-button" color="primary" onClick={e => this.props.triggerPracticeDeck(e,deck)}>Practice Deck</Button>
              <Button className="home-page-button" color="success" onClick={e => this.handleEditDeck(e, deck.id)}>View Your Cards</Button><br/><br/>
              <Button className="home-page-button" color="primary" onClick={e => this.props.triggerEditDeck(e, deck)}>Edit Deck Info</Button>
              <Button className="home-page-button" color="danger" onClick={e => {
                this.props.deleteDeck(deck.userId, deck.id)
                window.location.reload(true)
              }}>Delete Deck</Button>
            </CardBody>
          </Card>
      </div>
      )}
    );
    return (
      <Container>
        <Row><Col xs="12"><h2>Card Decks</h2></Col></Row>
        <Row><Col xs="12">{allDecks}</Col></Row>
      </Container>
    );
  }
}

export default CardDecksBoard;