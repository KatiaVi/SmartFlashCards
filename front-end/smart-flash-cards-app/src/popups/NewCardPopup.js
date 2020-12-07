import React from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form'
import LANGUAGES from '../helpers/Languages';
import { withRouter } from "react-router-dom";

class NewCardPopup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            source: this.props.currentCard && this.props.currentCard.source,
            translation: this.props.currentCard && this.props.currentCard.translation,
            pronunciationUrl: null,
            inEditMode: this.props.inEditMode
        }
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleTranslationChange = this.handleTranslationChange.bind(this);
        this.handlePronunciation = this.handlePronunciation.bind(this);
        this.handleCreateCard = this.handleCreateCard.bind(this);
        this.handleGetTranslation = this.handleGetTranslation.bind(this);
    }

    componentDidMount(){
        if(this.props.translation && this.props.source){
            this.setState({ translation: this.props.translation, source: this.props.source })
        }
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
    handleGetTranslation(e){
        e.preventDefault();
        this.props.getTranslation(this.props.currentCard, this.state.source, this.props.deckLanguage, this.state.inEditMode);
    }

    handleCreateCard(e){
        e.preventDefault();
        if (this.props.deckLanguage && this.props.deckId){
            if (!this.state.inEditMode){
                this.props.postCard(this.props.deckId, this.state.translation, this.state.source, this.props.deckLanguage);
            } else if (this.props.currentCard){
                this.props.updateCard(this.props.currentCard.deckId, this.props.currentCard.id, this.state.translation, this.state.source, this.props.deckLanguage)
            }
            setInterval(function(){ window.location.reload(true); }, 4000);
        }
    }

    render(){

        const languageName = LANGUAGES.filter(obj => obj.languageCode === this.props.deckLanguage )[0].language;
        return(
            <Card>
                <CardHeader>Create a New Card</CardHeader>
                <CardBody>
                <Form>
                    <Form.Group controlId="deckTitle">
                        <Form.Label>Word in English</Form.Label>
                        <Form.Control type="text" placeholder={this.state.source} onChange={this.handleTranslationChange}/>
                    </Form.Group>

                    <Form.Group controlId="deckLanguage">
                        <Form.Label>Word in {languageName}</Form.Label>
                        <Form.Control type="text" placeholder={this.state.translation} onChange={this.handleSourceChange}/>
                        <Button color="primary" type="submit" onClick={this.handleGetTranslation}>Auto-Translate</Button>
                    </Form.Group>

                    <Form.Group controlId="deckLanguage">
                        <Form.Label>Pronunciation Audio will be auto-generated.</Form.Label>
                    </Form.Group>

                    <Button color="success" type="submit" onClick={this.handleCreateCard}>
                        {this.state.inEditMode ? "Save Card Changes" : "Create Card"}
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