import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Card, CardTitle, Alert } from 'reactstrap';

import './detail.css';

class DetailSetting extends Component {
    constructor(props){
        super(props);

        this.state = {
            bot_name: '',
            bot_desc: '',
            bot_api_url: ''
        }
    }

    componentDidMount(){
        this.setState({
            bot_name: 'bot_1',
            bot_desc: '첫번째 봇',
            bot_api_url: 'https://www.lotte.net'
        });
    }

    render(){
        const {bot_name, bot_desc, bot_api_url} = this.state;
        return(
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card body>
                            <CardTitle>기본 설정</CardTitle>
                            <Label for="bot-name">이름</Label>
                            <Input type="text" name="bot_name" id="bot-name" value={bot_name}/>
                            <Label for="bot-desc">설명</Label>
                            <Input type="text" name="bot_desc" id="bot-desc" value={bot_desc}/>
                            <Label for="bot-api-url">API URL (변경 불가)</Label>
                            <Input type="text" name="bot_api_url" id="bot-api-url" disabled value={bot_api_url}/>
                            <Col sm="12" className="text-right padding-none">
                                <Button color="primary">저장</Button>
                            </Col>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card body>
                            <CardTitle>봇 삭제</CardTitle>
                            <Alert color="danger">
                                <i className="icon-info icons"></i>&nbsp;&nbsp;한 번 삭제하면 다시 복구할 수 없습니다! 그래도 삭제하시겠습니까?
                            </Alert>
                            <Col xs="4" className="padding-none"><Button color="danger">영구 삭제</Button></Col>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DetailSetting;