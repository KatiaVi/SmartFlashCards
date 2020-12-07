import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import LANGUAGES from '../helpers/Languages';
import { withRouter } from "react-router-dom";

class PracticeCardsPopup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            deck: this.props.deck,
            currentCardInDeck: 0,
            cards: this.props.cards,
            translationSide: true,
            translationSideFirst: true,
        }
        this.previousCard = this.previousCard.bind(this);
        this.nextCard = this.nextCard.bind(this);
        this.playPronunciation = this.playPronunciation.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.setTranslationSideFirst = this.setTranslationSideFirst.bind(this);
    }

    componentDidMount(){
        if (this.state.deck && !this.state.cards){
            this.props.getCards(this.state.deck.id);
        }
    }
    getCardInfo(index){
        const currentCard = this.state.cards[index]
        const pronunciation = "https://pronunciations-smart-flash-cards.s3.us-east-2.amazonaws.com/"+currentCard.id+".mp3";
        if (this.state.translationSide)
        return(
            <Container>
                <Row>
                    <Col xs="12">
                        <h2>{currentCard.translation}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <audio className={"audio-element"+currentCard.id}>
                            <source src={pronunciation}></source>
                        </audio>
                        <Button color="primary" type="submit" onClick={(e) => this.playPronunciation(e, currentCard.deckId, currentCard.id)}>Play Pronunciation</Button><br/><br/>
                    </Col>
                </Row>
            </Container>
        );
        else {
            return(
            <Container>
                <Row>
                    <Col xs="12">
                        <h2>{currentCard.source}</h2><br/><br/><br/>
                    </Col>
                </Row>
            </Container>
            );
        }
    }



    playPronunciation(e, deckId, cardId) {
        e.preventDefault();
        const audioEl = document.getElementsByClassName("audio-element"+cardId)[0];
        audioEl.load();
        audioEl.play();
      }

    previousCard(){
        const newIndex = Math.max(this.state.currentCardInDeck - 1, 0);
        this.setState({ currentCardInDeck: newIndex, translationSide: this.state.translationSideFirst })
    }
    nextCard(){
        const newIndex = Math.min(this.state.currentCardInDeck + 1, this.state.cards.length - 1);
        this.setState({ currentCardInDeck: newIndex, translationSide: this.state.translationSideFirst })
    }

    flipCard(){
        this.setState({ translationSide: !this.state.translationSide })
    }

    setTranslationSideFirst(){
        this.setState({ translationSideFirst: !this.state.translationSideFirst, translationSide: !this.state.translationSideFirst })
    }

    render(){
        const currentCardInfo = this.state.cards ? this.getCardInfo(this.state.currentCardInDeck) : <div/>;
        const languageName = LANGUAGES.filter(obj => obj.languageCode === this.state.deck.language )[0].language;
        return(
            <Card>
                <CardHeader>
                    <h2>Practice {this.state.deck.title} Cards</h2>
                    <Button color="primary" outline onClick={this.setTranslationSideFirst}>
                        {this.state.translationSideFirst ? "Show English Translation First" : "Show " + languageName + " Translation First"}
                    </Button>
                </CardHeader>
                <CardBody>
                    {currentCardInfo}
                    <Button color="success" type="submit" onClick={this.previousCard}>
                        Prev. Card
                    </Button>
                    <Button color="primary" outline onClick={this.flipCard}>
                        Flip Card
                    </Button>
                    <Button color="danger" outline onClick={() => window.location.reload(true)}>
                        Stop Practice
                    </Button>
                    <Button color="success" outline onClick={this.nextCard}>
                        Next Card
                    </Button>
                </CardBody>
            </Card>
        );
    }
}
export default withRouter(PracticeCardsPopup);