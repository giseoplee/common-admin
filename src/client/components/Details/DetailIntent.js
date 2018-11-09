import React, { Component } from 'react';
import { Container, Row, Col, Badge, Button, Card, CardHeader, CardTitle, CardText, CardBody, CardFooter, Label, Input, FormGroup, FormFeedback, Form, ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import queryString from 'query-string';

import './detail.css';
import {Phrase, Context, Response, Parameter, Quarter} from '../Block';

class DetailIntent extends Component {
    constructor(props){
        super(props);

        this.goBlockList = this.goBlockList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e, func) {
        if(e.charCode === 13){
            e.preventDefault();
            func();
        }
    }

    handleChange(e, thisClass) {
        let nextState = {};
    
        nextState[e.target.name] = e.target.value;
    
        thisClass.setState(nextState);
    }

    goBlockList(query){
        if(typeof query.scenarioId === "undefined"){
            return this.props.history.push('/bot/'+this.props.match.params.bot_name+'/scnario');
        }

        const url = '/bot/'+this.props.match.params.bot_name+'/scnario/'+query.scenarioId;

        this.props.history.push(url);
    }

    render(){
        const query = queryString.parse(this.props.location.search);

        return(
            <Container fluid>
                <Row>
                    <Col sm="6" className="padding-none vertical-margin">
                        <Button color="ghost-success" onClick={() => {this.goBlockList(query);}}>
                            <i className="icon-arrow-left-circle icons"></i>&nbsp;블록 목록
                        </Button>
                    </Col>
                    <Col sm="6" className="padding-none vertical-margin text-right">
                        <Button color="secondary">저장</Button>
                    </Col>
                </Row>
                <Form>
                    <FormGroup>
                        <Row>
                            <Col sm="12" className="padding-none">
                                <Input type="text" name="newBLockName" id="block-name" placeholder="블록 이름" invalid />
                                <FormFeedback>블록 이름을 설정해주세요!</FormFeedback>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Quarter intent_name={this.props.match.params.intent_name}/>
                    </FormGroup>
                    <FormGroup>
                        <Parameter intent_name={this.props.match.params.intent_name}/>
                    </FormGroup>
                    {/*<FormGroup>
                        <Row>
                            <Col sm="12" className="padding-none">
                                <Card body>
                                    <CardTitle>컨텍스트 설정</CardTitle>
                                    <CardText>
                                        <Context icon={"icon-arrow-right-circle"} placeholderValue={"Input 컨텍스트"} intent_name={this.props.match.params.intent_name} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress}/>
                                        <Context icon={"icon-arrow-left-circle"} placeholderValue={"Output 컨텍스트"} intent_name={this.props.match.params.intent_name} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress}/>
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                    </FormGroup>*/}
                    <FormGroup>
                        <Phrase intent_name={this.props.match.params.intent_name} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress}/>
                    </FormGroup>
                    <FormGroup>
                        <Response intent_name={this.props.match.params.intent_name}/>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default DetailIntent;