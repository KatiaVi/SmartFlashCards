import React from 'react';
import CardDecksBoard from './learning-space/CardDecksBoardComponent';
import { Container, Row, Col, Button } from 'reactstrap';
import DeckPopup from '../popups/DeckPopup';
import PracticeCardsPopup from '../popups/PracticeCardsPopup';

class LearningSpacePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inCreateMode: false,
            inEditMode: this.props.inEditMode,
            practicePopupOpen: this.props.practicePopupOpen,
            practiceDeck: this.props.currentDeck
        }
        this.showPopup = this.showPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.showPopupWithEditState = this.showPopupWithEditState.bind(this);
        this.showPracticeCards = this.showPracticeCards.bind(this);
    }

    showPopup(){
        this.setState({
            inCreateMode: true
        })
    }

    closePopup(){
        this.setState({
            inCreateMode: false
        }) 
    }

    showPopupWithEditState(e, deck){
        e.preventDefault();
        this.setState({
            inEditMode: true,
        }, () => this.props.setCurrentDeck(deck, true, false));
    }

    showPracticeCards(e, deck){
        e.preventDefault();
        this.setState({ practicePopupOpen: true, practiceDeck: deck }, () => this.props.setCurrentDeck(deck, false, true));
    }

    componentDidMount() {
        if (this.props.user == null && this.props.userId){
            this.props.getUserInfo(this.props.userId);
        }
    }

    render(){
        const cardDecksBoard = (<Row>
            <Col xs="12">
                <CardDecksBoard 
                    decks={this.props.decks} 
                    user={this.props.user} 
                    getDecks={this.props.getDecks}
                    triggerEditDeck={this.showPopupWithEditState}
                    triggerPracticeDeck={this.showPracticeCards}
                    deleteDeck={this.props.deleteDeck}
                />
            </Col>
        </Row>);
        if (this.state.inCreateMode || (this.state.inEditMode && this.props.currentDeck)){
            return(
                <DeckPopup 
                    postDeck={this.props.postDeck} 
                    user={this.props.user}
                    inEditMode={this.state.inEditMode}
                    currentDeck={this.props.currentDeck}
                    updateDeck={this.props.updateDeck}
                />
            );
        } else if (this.state.practicePopupOpen && this.props.currentDeck){
            return(
                <PracticeCardsPopup 
                    deck={this.state.practiceDeck}
                    cards={this.props.cards}
                    getCards={this.props.getCards}
                    setPracticingCards={this.props.setPracticingCards}
                />
            );
        }
        else {
            return (
                <Container className="content">
                    <Row>
                        <Col xs="12">
                            <h1>{this.props.user && this.props.user.username}'s Learning Space</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Button className="home-page-button" color="success" onClick={this.showPopup}>Create a New Card Deck</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col xs="12">
                            {this.props.user ? cardDecksBoard : <div></div>}
                        </Col>
                    </Row>
                    
                </Container>
            );
            }
    }
}

export default LearningSpacePage;