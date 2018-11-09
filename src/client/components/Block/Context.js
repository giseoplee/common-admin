import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Badge, Button, Card, CardHeader, CardTitle, CardText, CardBody, CardFooter, Label, Input, FormGroup, FormFeedback, Form, ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Context extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputContexts: [],
            new_input_context: ''
        };

        this.handleInputContext = this.handleInputContext.bind(this);
        this.removeInputContext = this.removeInputContext.bind(this);
    }

    current_input_id = -1;

    componentDidMount(){
        if(this.props.intent_name === "new"){
            this.current_input_id = -1;
        }
        else{
            // db에서 화행 읽어와서 current_input_id, setState 설정 
        }
    }

    removeInputContext(id) {
        this.setState({
            inputContexts:  this.state.inputContexts.filter(input => input.id !== id),
            new_input_context: this.state.new_input_context
        });
    }

    handleInputContext(){
        let newInputContext = {
            id: ++this.current_input_id,
            value: this.state.new_input_context
        }

        let newInputContextList = [
            ...this.state.inputContexts,
            newInputContext
        ]

        this.setState({
            inputContexts: newInputContextList,
            new_input_context: ''
        });
    }

    render(){
        const {inputContexts} = this.state;

        const {handleKeyPress, handleChange, placeholderValue, icon} = this.props;

        const inputContextsList = inputContexts.map(
            inputcontext => (<h3 className="display-inline"><Badge key={inputcontext.id} pill className="custom-badge" onClick={() => {this.removeInputContext(inputcontext.id)}}>{inputcontext.value}&nbsp;&nbsp;<i className="cui-circle-x icons"></i></Badge></h3>)
        );

        return (
            <Fragment>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className={icon+" icons d-block"}></i></InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder={placeholderValue} name="new_input_context" onChange={()=>{handleChange(event, this);}} value={this.state.new_input_context} onKeyPress={() => {handleKeyPress(event, this.handleInputContext);}}/>
                </InputGroup>
                <Container fluid>{inputContextsList}</Container>
            </Fragment>
        );
    }
}

export default Context;