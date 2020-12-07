import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import DeckPopup from "../popups/DeckPopup";
import LearningSpacePopup from "../popups/LearningSpacePopup";


class HomePage extends React.Component {
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

    render(){
        if (this.state.popupOpen){
            return(
                <LearningSpacePopup 
                    postUser={this.props.postUser} 
                />
            );
        }
        else {
            return (
                <Container className="content">
                    <Row>
                        <Col xs="12">
                            <h1>Welcome to Smart Flashcards!!</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <p>Smart Flashcards lets you quickly create immersive language-learning flashcards <br/>
                            by automatically generating translations and audio for the word/phrases you want to learn. </p>
                            <p>If you already have a learning space, visit the unique URL sent to you over email.</p>
                            <p>If this is your first time ...</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Button className="home-page-button" color="success" onClick={this.showPopup}>Create a New Learning Space</Button>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}
export default HomePage;