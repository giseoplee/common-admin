import React, { Component, Fragment } from 'react';
import { Container, Badge, Input, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';

class Context extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            inputContexts: [],
            newInputContext: ''
        };

        this.handleInputContext = this.handleInputContext.bind(this);
        this.removeInputContext = this.removeInputContext.bind(this);
    }

    current_input_id = -1;

    componentDidMount(){
        if (this.props.intent_name === "new"){
            this.current_input_id = -1;
        } else{
            // db에서 화행 읽어와서 current_input_id, setState 설정 
        }
    }

    removeInputContext(id) {
        this.setState({
            inputContexts:  this.state.inputContexts.filter(input => input.id !== id),
            newInputContext: this.state.newInputContext
        });
    }

    handleInputContext(){
        let newInputContext = {
            id: ++this.current_input_id,
            value: this.state.newInputContext
        }

        let newInputContextList = [
            ...this.state.inputContexts,
            newInputContext
        ]

        this.setState({
            inputContexts: newInputContextList,
            newInputContext: ''
        });
    }

    render(){
        const { inputContexts } = this.state;
        const { handleKeyPress, handleChange, placeholderValue, icon } = this.props;
        const inputContextsList = inputContexts.map(
            inputcontext => (
            <h3 className="display-inline">
                <Badge pill key={inputcontext.id} className="custom-badge" onClick={ () => this.removeInputContext(inputcontext.id) }>
                    {inputcontext.value}&nbsp;&nbsp;
                    <i className="cui-circle-x icons"></i>
                </Badge>
            </h3>)
        );

        return (
            <Fragment>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className={ `${icon} icons d-block` }></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                        placeholder={ placeholderValue } 
                        name="newInputContext" 
                        onChange={ () => handleChange(event, this) } 
                        value={ this.state.newInputContext } 
                        onKeyPress={ () => handleKeyPress(event, this.handleInputContext) }/>
                </InputGroup>
                <Container fluid>
                    { inputContextsList }
                </Container>
            </Fragment>
        );
    }
}

export default Context;