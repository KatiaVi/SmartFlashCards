import React from 'react';
import CardsBoard from './card-deck/CardsBoardComponent';
import { Container, Row, Col, Button } from 'reactstrap';

const CardDeckPage = props => {
    return (
        <Container className="content">
            <Row>
                <Col xs="12">
                    <h1>Animals [insert korean flag here]</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <CardsBoard />
                </Col>
            </Row>
        </Container>
      );
};

export default CardDeckPage;