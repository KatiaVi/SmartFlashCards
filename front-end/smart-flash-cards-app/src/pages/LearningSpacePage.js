import React from 'react';
import CardDecksBoard from './learning-space/CardDecksBoardComponent';
import { Container, Row, Col, Button } from 'reactstrap';

const LearningSpacePage = props => {
    return (
        <Container className="content">
            <Row>
                <Col xs="12">
                    <h1>Katia's Learning Space</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <CardDecksBoard />
                </Col>
            </Row>
        </Container>
      );
};

export default LearningSpacePage;