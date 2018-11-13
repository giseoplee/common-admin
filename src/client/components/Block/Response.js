import React, { Component, Fragment } from 'react';
import { Tooltip , Alert, Container, Row, Col, Badge, Button, Card, CardHeader, CardTitle, CardText, CardBody, CardFooter, Label, Input, FormGroup, FormFeedback, Form, ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import {TextType} from './ReponseType';

class Response extends Component {
    constructor(props){
        super(props);

        this.state = {
            dropdownOpen: false,
            responses: []
        };

        this.toggle = this.toggle.bind(this);

        this.handleResponse = this.handleResponse.bind(this);
        this.removeResponse = this.removeResponse.bind(this);

        this.addText = this.addText.bind(this);
        this.removeText = this.removeText.bind(this);
        this.handleResponseTextChange = this.handleResponseTextChange.bind(this);
    }

    current_response_id = -1;

    toggle() {
        const {dropdownOpen, ...rest} = this.state;
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen,
          ...rest
        }));
    }

    componentDidMount(){
        if(this.props.intent_name === "new"){
            this.current_response_id = -1;
        }
        else{
             // db에서 데이터 꺼내오는 건 여기서 한다!
            this.setState({
                dropdownOpen: false,
                responses: [{
                    id: 0,
                    type: "text",
                    text: [
                        "성함을 입력하세요.",
                        "이름을 입력하세요."
                    ]
                }]
            });

            this.current_response_id = 0;
        }
    }

    handleResponse (responseType) {

        if(responseType == "text"){

            let newResponse = {
                "id": ++this.current_response_id,
                "type": responseType,
                "text": [""]
            };

            this.setState({
                dropdownOpen: this.state.dropdownOpen,
                responses: this.state.responses.push(newResponse)
            });
        }
    }

    removeResponse(id) {
        this.setState({
            dropdownOpen: this.state.dropdownOpen,
            responses: this.state.responses.filter(response => response.id !== id)
        });
    }

    addText(id){
        let responseIndex = this.state.responses.findIndex(x => x.id === id);
        let newResponses = JSON.parse(JSON.stringify(this.state.responses));
        newResponses[responseIndex].text.push("");

        this.setState({
            dropdownOpen: this.state.dropdownOpen,
            responses: newResponses
        });
    }

    removeText(id, index){

        console.log("id: "+id+", index: "+index);

        let responseIndex = this.state.responses.findIndex(x => x.id === id);
        let newResponses = JSON.parse(JSON.stringify(this.state.responses));

        if(newResponses[responseIndex].text.length == 1){

            return (
                alert('텍스트 응답은 한 개 이상이어야 합니다!')
            );
        }
        
        newResponses[responseIndex].text.splice(index, 1);

        this.setState({
            dropdownOpen: this.state.dropdownOpen,
            responses: newResponses
        });
    }

    handleResponseTextChange(e, id, index) {
        let responseIndex = this.state.responses.findIndex(x => x.id === id);
        let newResponses = JSON.parse(JSON.stringify(this.state.responses));
        newResponses[responseIndex].text[index] = e.target.value;

        this.setState({
            dropdownOpen: this.state.dropdownOpen,
            responses: newResponses
        });
    }
    
    render (){
        const {responses} = this.state;

        const responsesList = responses.map(
            (response, index) => (
                <ListGroupItem key={response.id}>
                    <Row>
                        <Col sm="6">
                            <h6>응답 {index+1}</h6>
                        </Col>
                        <Col sm="6" className="text-right">
                            <Button color="ghost-success" onClick={() => {this.removeResponse(response.id);}}><i className="icon-trash icons"></i></Button>
                        </Col>
                    </Row>
                    {response.type === "text"? <TextType response={response} addText={this.addText} removeText={this.removeText} handleResponseTextChange={this.handleResponseTextChange}/> : null}
                </ListGroupItem>)
        );

        return (
            <Row>
                <Col sm="12" className="padding-none">
                    <Card body>
                        <CardTitle>응답</CardTitle>
                        <CardText>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    새 반응 추가하기
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag="button" onClick={() => {this.handleResponse("text");}}><i className="icon-pencil icons"></i>텍스트 형식</DropdownItem>
                                    <DropdownItem tag="button"><i className="icon-check icons"></i>되묻기</DropdownItem>
                                    <DropdownItem tag="button"><i className="icon-link icons"></i>웹 URL</DropdownItem>
                                    <DropdownItem tag="button"><i className="icon-picture icons"></i>이미지 URL</DropdownItem>
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
        );
    }
}

export default Response;