import React from 'react';
import CardDecksBoard from './learning-space/CardDecksBoardComponent';
import { Container, Row, Col, Button } from 'reactstrap';
import DeckPopup from '../popups/DeckPopup';

class LearningSpacePage extends React.Component {
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
        if (this.props.user == null && this.props.userId){
            this.props.getUserInfo(this.props.userId);
        }
    }

    render(){
        const cardDecksBoard = (<Row>
            <Col xs="12">
                <CardDecksBoard decks={this.props.decks} user={this.props.user} getDecks={this.props.getDecks}/>
            </Col>
        </Row>);
        if (this.state.popupOpen){
            return(
                <DeckPopup 
                    postDeck={this.props.postDeck} 
                    user={this.props.user}
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