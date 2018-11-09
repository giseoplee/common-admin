import React, { Component } from 'react';
import { Container, Row, Col, Badge, Button, Card, CardHeader, CardTitle, CardText, CardBody, CardFooter, Label, Input, FormGroup, FormFeedback, Form, ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Phrase extends Component {
    constructor(props){
        super(props);

        this.state = {
            trainingPhrases: [],
            new_training_phrase: ''
        };

        this.handlePhrase = this.handlePhrase.bind(this);
        this.removePhrase = this.removePhrase.bind(this);
    }

    current_phrase_id = -1;

    componentDidMount(){
        if(this.props.intent_name === "new"){
            this.current_phrase_id = -1;
        }
        else{
            // db에서 화행 읽어와서 current_phrase_id와 setState 설정 
        }
    }

    removePhrase(id){
        this.setState({
            trainingPhrases: this.state.trainingPhrases.filter(phrase => phrase.id !== id),
            new_training_phrase: this.state.new_training_phrase
        });
    }

    handlePhrase() {
        let newPhrase = {
            id: ++this.current_phrase_id,
            value: this.state.new_training_phrase
        }

        let newPhraseList = [
            ...this.state.trainingPhrases,
            newPhrase
        ]

        this.setState({
            trainingPhrases: newPhraseList,
            new_training_phrase: ''
        });
    }

    

    render(){
        const {trainingPhrases} = this.state;

        const {handleKeyPress, handleChange} = this.props;

        const trainingPhrasesList = trainingPhrases.map(
            phrase => (
            <ListGroupItem key={phrase.id}>
                <Col sm="9" className="display-inline padding-none">{phrase.value}</Col>
                <Col sm="3" className="text-right display-inline padding-none">
                    <Button color="ghost-success" onClick={() => {this.removePhrase(phrase.id);}}><i className="icon-trash icons"></i></Button>
                </Col>
            </ListGroupItem>)
        );

        return (
            <Row>
                <Col sm="12" className="padding-none">
                    <Card body>
                        <CardTitle>화행 입력</CardTitle>
                        <CardText>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="icon-speech icons d-block"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="new_training_phrase" onChange={() => {handleChange(event, this);}} value={this.state.new_training_phrase} onKeyPress={() => {handleKeyPress(event, this.handlePhrase);}}/>
                            </InputGroup>
                            <ListGroup flush>
                                {trainingPhrasesList}
                            </ListGroup>
                        </CardText>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Phrase;