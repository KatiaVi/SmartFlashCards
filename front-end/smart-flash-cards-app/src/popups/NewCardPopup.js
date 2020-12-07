import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form'
import LANGUAGES from '../helpers/Languages';
import './popups.css';
import { withRouter } from "react-router-dom";
import { Link, useLocation, Redirect } from "react-router-dom";


class NewCardPopup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            source: null,
            translation: null,
            pronunciationUrl: null
        }
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleTranslationChange = this.handleTranslationChange.bind(this);
        this.handlePronunciation = this.handlePronunciation.bind(this);
        this.handleCreateCard = this.handleCreateCard.bind(this);
    }

    handleTranslationChange(e) {
        this.setState({ source: e.target.value });
    }

    handleSourceChange(e) {
        this.setState({ translation: e.target.value });
    }
    handlePronunciation(e) {
        this.setState({ pronunciationUrl: e.target.value });
    }

    async handleCreateCard(e){
        if (this.props.deckLanguage && this.props.deckId){
            await this.props.postCard(this.props.deckId, this.state.translation, this.state.source, this.props.deckLanguage);
        }
    }

    render(){
        const languageName = LANGUAGES.filter(obj => obj.languageCode == this.props.deckLanguage )[0].language;
        return(
            <Card>
                <CardHeader>Create a New Card</CardHeader>
                <CardBody>
                <Form>
                    <Form.Group controlId="deckTitle">
                        <Form.Label>Word in English</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={this.handleTranslationChange}/>
                    </Form.Group>

                    <Form.Group controlId="deckLanguage">
                        <Form.Label>Word in {languageName}</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={this.handleSourceChange}/>
                        <Button color="primary" type="submit" onClick={this.handleCreateCard}>Auto-Translate</Button>
                    </Form.Group>

                    <Form.Group controlId="deckLanguage">
                        <Form.Label>Pronunciation (Audio)</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={this.handlePronunciation}/>
                        <Button color="primary" type="submit" onClick={this.handleCreateCard}>Auto-Generate Pronunciation</Button>
                    </Form.Group>

                    <Button color="success" type="submit" onClick={this.handleCreateCard}>
                        Create Card
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
export default withRouter(NewCardPopup);