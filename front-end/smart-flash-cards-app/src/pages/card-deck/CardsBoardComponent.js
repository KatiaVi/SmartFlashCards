import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';

class CardsBoard extends React.Component {
  constructor(props){
    super(props);
    this.playPronunciation = this.playPronunciation.bind(this);
  }

  playPronunciation(e, deckId, cardId) {
    e.preventDefault();
    const audioEl = document.getElementsByClassName("audio-element"+cardId)[0];
    audioEl.play();
  }

  render(){
    if (this.props.cards){
    const allCards = this.props.cards.map(card => {
      const pronunciation = "https://pronunciations-smart-flash-cards.s3.us-east-2.amazonaws.com/"+card.id+".mp3";
      return(<div>
        <br/>
      <Card>
        <CardHeader>{card.translation}</CardHeader>
        <CardBody>
          <p>English Translation: {card.source}</p>
          <audio className={"audio-element"+card.id}>
            <source src={pronunciation}></source>
          </audio>
          <Button color="primary" type="submit" onClick={(e) => this.playPronunciation(e, card.deckId, card.id)}>Play Pronunciation</Button><br/><br/>
          <Button className="home-page-button" onClick={(e) => this.props.triggerEditCardPopup(e, card)}>Edit this Card</Button>
          <Button className="home-page-button" color="danger" onClick={(e) => {
            this.props.deleteCard(card.deckId, card.id);
            window.location.reload(true);
          }}>Delete this Card</Button>
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