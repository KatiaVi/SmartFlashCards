import React, { useState, useEffect } from "react";
import CardsBoard from './card-deck/CardsBoardComponent';
import { Container, Row, Col, Button } from 'reactstrap';
import NewCardPopup from "../popups/NewCardPopup";

class CardDeckPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            popupOpen: false,
        }
        this.showPopup = this.showPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    showPopup(){
        this.setState({
            popupOpen: true
        })
    }

    closePopup(){
        this.setState({
            popupOpen: false
        }) 
    }

    componentDidMount() {
        if (this.props.deck == null && this.props.userId && this.props.deckId){
            this.props.getDeckInfo(this.props.userId, this.props.deckId);
        }
        if(this.props.deck && this.props.cards == null){
          this.props.getCards(this.props.deckId);
        }
    }

    render(){
      const cardsBoard = (<Row>
        <Col xs="12">
            <CardsBoard 
            cards={this.props.cards} 
            deck={this.props.deck}
            currentCard={this.props.currentCard}
            getCard={this.props.getCard}
            />
        </Col>
      </Row>);

        if (this.state.popupOpen && this.props.deck){
            return(
                <NewCardPopup 
                    deckId={this.props.deck.id}
                    deckLanguage={this.props.deck.language}
                    postCard={this.props.postCard}
                />
            );
        }
        else {
            return (
                <Container className="content">
                    <Row>
                        <Col xs="12">
                            <h1>{this.props.deck && this.props.deck.title} Card Deck</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Button className="home-page" color="success" onClick={this.showPopup}>Create a New Card</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col xs="12">
                            {this.props.deck ? cardsBoard : <div></div>}
                        </Col>
                    </Row>
                    
                </Container>
            );
            }
    }
}
export default CardDeckPage;