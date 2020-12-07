import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form'
import LANGUAGES from '../helpers/Languages';
import './popups.css';
import { withRouter } from "react-router-dom";
import { Link, useLocation, Redirect } from "react-router-dom";


class DeckPopup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: null,
            languageCode: null,
        }
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCreateDeck = this.handleCreateDeck.bind(this);
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleLanguageChange(e) {
        this.setState({ languageCode: e.target.value });
    }

    async handleCreateDeck(e){
        if (this.props.user){
            this.props.postDeck(this.props.user.id, this.state.title, this.state.languageCode);
        }
    }

    render(){
        const languageOptions = LANGUAGES.map(obj =>  <option value={obj.languageCode}>{obj.language}</option>);
        return(
            <Card>
                <CardHeader>Create a New Deck</CardHeader>
                <CardBody>
                <Form>
                    <Form.Group controlId="deckTitle">
                        <Form.Label>Name your Flash Card Deck</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={this.handleTitleChange}/>
                    </Form.Group>

                    <Form.Group controlId="deckLanguage">
                        <Form.Label>Learning Leanguage for this Deck</Form.Label>
                        <Form.Control as="select" onChange={this.handleLanguageChange}><option>Choose a Language</option>{languageOptions}</Form.Control>
                    </Form.Group>
                    <Button color="success" type="submit" onClick={this.handleCreateDeck}>
                        Create Deck
                    </Button>
                    <Button color="danger" outline onClick={this.props.closePopup}>
                        Cancel
                    </Button>
                </Form>
                </CardBody>
            </Card>
        );
    }
}
export default withRouter(DeckPopup);