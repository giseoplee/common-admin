import React, { Component } from 'react';
import { Container, Row, Col, Button, Card, CardTitle, CardText, Label, Input, FormGroup, FormFeedback, Form, ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import queryString from 'query-string';

import './detail.css';

class DetailIntent extends Component {
    constructor(props){
        super(props);

        this.state = {
            dropdownOpen: false,
            trainingPhrases: [],
            responses: [],
            inputContexts: [],
            outputContexts: []
        };

        this.goBlockList = this.goBlockList.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        if(this.props.match.params.intent_name === "new"){

        }
        else{

        }
    }

    toggle() {
        const {dropdownOpen, ...rest} = this.state;
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen,
          ...rest
        }));
    }

    goBlockList(scenarioId){
        const url = '/bot/'+this.props.match.params.bot_name+'/scnario/'+scenarioId;

        this.props.history.push(url);
    }

    render(){
        const {trainingPhrases, responses, inputContexts, outputContexts} = this.state;

        const trainingPhrasesList = trainingPhrases.map(
            phrase => (<ListGroupItem key={phrase.id} tag="button" action>{phrase.value}</ListGroupItem>)
        );

        const inputContextsList = inputContexts.map(
            inputcontext => (<ListGroupItem key={inputcontext.id} tag="button" action>{inputcontext.value}</ListGroupItem>)
        );

        const outputContextsList = outputContexts.map(
            outputcontext => (<ListGroupItem key={outputcontext.id} tag="button" action>{outputcontext.value}</ListGroupItem>)
        );

        const responsesList = responses.map(
            response => (<ListGroupItem key={response.id} tag="button" action>{response.value}</ListGroupItem>)
        );

        const query = queryString.parse(this.props.location.search);

        return(
            <Container fluid>
                <Row>
                    <Col sm="6" className="padding-none vertical-margin">
                        <Button color="ghost-success" onClick={() => {this.goBlockList(query.scenarioId);}}>
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
                        <Row>
                            <Col sm="12" className="padding-none">
                                <Card body>
                                    <CardTitle>컨텍스트 설정</CardTitle>
                                    <CardText>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="icon-arrow-right-circle icons d-block"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Input 컨텍스트" />
                                        </InputGroup>
                                        <ListGroup flush>
                                            {inputContextsList}
                                        </ListGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="icon-arrow-left-circle icons d-block"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Output 컨텍스트" />
                                        </InputGroup>
                                        <ListGroup flush>
                                            {outputContextsList}
                                        </ListGroup>
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col sm="12" className="padding-none">
                                <Card body>
                                    <CardTitle>화행 입력</CardTitle>
                                    <CardText>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="icon-speech icons d-block"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input />
                                        </InputGroup>
                                        <ListGroup flush>
                                            {trainingPhrasesList}
                                        </ListGroup>
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col sm="12" className="padding-none">
                                <Card body>
                                    <CardTitle>출력</CardTitle>
                                    <CardText>
                                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                            <DropdownToggle caret>
                                                새 반응 추가하기
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem tag="button"><i className="icon-pencil icons"></i>텍스트 형식</DropdownItem>
                                                <DropdownItem tag="button"><i className="icon-check icons"></i>되묻기</DropdownItem>
                                                <DropdownItem tag="button"><i className="icon-link icons"></i>URL</DropdownItem>
                                                <DropdownItem tag="button"><i className="icon-grid icons"></i>버튼 리스트</DropdownItem>
                                            </DropdownMenu>
                                            <ListGroup flush>
                                                {responsesList}
                                            </ListGroup>
                                        </Dropdown>
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default DetailIntent;