import React, { useState, useEffect } from "react";
import CardsBoard from './card-deck/CardsBoardComponent';
import { Container, Row, Col, Button } from 'reactstrap';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);
  
    return [playing, toggle];
  };

const CardDeckPage = props => {
    const [playing, toggle] = useAudio("https://pronunciations-smart-flash-cards.s3.us-east-2.amazonaws.com/sample-audio1.mp3");
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
<div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
                </Col>
            </Row>
        </Container>
      );
};

export default CardDeckPage;