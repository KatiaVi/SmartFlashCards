import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';

class CardsBoard extends React.Component {
  constructor(props){
    super(props);
    this.playPronunciation = this.playPronunciation.bind(this);
  }

  playPronunciation(e, deckId, cardId) {
    if(this.props.currentCard && cardId == this.props.currentCard.id){
      alert("PLAY");
      const audioEl = document.getElementsByClassName("audio-element"+cardId)[0];
      audioEl.play();
    }
    else {
      alert("GET" + deckId + cardId);
      this.props.getCard(deckId, cardId);
    }
    
  }

  render(){
    if (this.props.cards){
    const allCards = this.props.cards.map(card => {
      const pronunciation = require('../../audio/playback.mp3');
      return(<div>
        <br/>
      <Card>
        <CardHeader>{card.translation}</CardHeader>
        <CardBody>
          <p>English Translation: {card.source}</p>
          <audio className={"audio-element"+card.id}>
            <source src={pronunciation}></source>
          </audio>
          <Button color="primary" type="submit" onClick={(e) => this.playPronunciation(e, card.deckId, card.id)}>Play Pronunciation</Button>
          <p>Edit this card.</p>
        </CardBody>
      </Card>
      </div>);
    }
    );
    return (
      <Container>
        <Row><Col xs="12"><h2>Cards</h2></Col></Row>
        <Row><Col xs="12">{allCards}</Col></Row>
      </Container>
    );
    } else {
      return(<div></div>);
    }
  }
}

export default CardsBoard;