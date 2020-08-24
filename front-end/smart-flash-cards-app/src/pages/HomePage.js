import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

const HomePage = props => {
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
            </Col>
        </Row>
        <Row>
            <Col xs="12">
                <Button className="home-page-button" color="success">Create a New Flashcard Deck</Button>
            </Col>
        </Row>
    </Container>
  );
};

export default HomePage;