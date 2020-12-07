import React from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form'
import { withRouter } from "react-router-dom";


class LearningSpacePopup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            email: null,
        }
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCreateLearningSpace = this.handleCreateLearningSpace.bind(this);
    }

    handleUserNameChange(e) {
        this.setState({ username: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    async handleCreateLearningSpace(e){
        await this.props.postUser(this.state.username, this.state.email);
        alert("Sending a unique link to " + this.state.email + " with your learning space.");
    }

    render(){
        return(
            <Card>
                <CardHeader>Create Your Learning Space</CardHeader>
                <CardBody>
                    <p>We will email you a unique link to your learning space.</p>
                    <Form>
                        <Form.Group controlId="deckTitle">
                            <Form.Label>Enter your Email</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={this.handleEmailChange}/>
                        </Form.Group>
                        <Form.Group controlId="deckTitle">
                            <Form.Label>Name Your Learning Space</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={this.handleUserNameChange}/>
                        </Form.Group>
                        <Button color="success" type="submit" onClick={this.handleCreateLearningSpace}>
                            Create Learning Space
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
export default withRouter(LearningSpacePopup);