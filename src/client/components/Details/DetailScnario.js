import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import { AppSwitch } from '@coreui/react'

import ScnarioCard from '../Cards/ScnarioCard';
import './detail.css';

class DetailScnario extends Component {

    constructor(props){
        super(props);

        this.state = {
            activeTab: '1',
            scnarioes: [],
            modal: false, 
            newScnario: ''
        }

        this.handleRemove = this.handleRemove.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleWrite = this.handleWrite.bind(this);
        this.tabToggle = this.tabToggle.bind(this);
    }

    id = 4;

    componentDidMount(){
        // match.params.bot_name 으로 DB에서 관련 시나리오 가져오기

        let data = [];

        if(!this.props.match.params.bot_name){
            console.log('잘못된 접근!');
        }

        if(this.props.match.params.bot_name == '1'){
            data = [{
                id: 0,
                title: '시나리오 #1',
                blocks: 4
            }, {
                id: 1,
                title: '시나리오 #2',
                blocks: 0
            }, {
                id: 2,
                title: '시나리오 #3',
                blocks: 1
            }, {
                id: 3,
                title: '시나리오 #4',
                blocks: 2
            }];
        }
        else{
            data = [{
                id: 0,
                title: '시나리오 #11',
                blocks: 4
            }, {
                id: 1,
                title: '시나리오 #12',
                blocks: 0
            }, {
                id: 2,
                title: '시나리오 #13',
                blocks: 1
            }, {
                id: 3,
                title: '시나리오 #14',
                blocks: 2
            }];
        }

        this.setState({
            activeTab: '1',
            scnarioes: data,
            modal: false,
            newScnario: ''
        });
    }

    handleRemove(id){
        this.setState({
            scnarioes: this.state.scnarioes.filter(scnario => scnario.id !== id),
        });
    }

    toggle() {
        this.setState({
            activeTab: this.state.activeTab,
            scnarioes: this.state.scnarioes,
            modal: !this.state.modal,
            newScnario: this.state.newScnario
        });
    }

    tabToggle(tab) {
        const {activeTab, ...rest} = this.state;
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab, 
            ...rest
          });
        }
    }

    handleWrite(){
        let newScnario = this.state.newScnario;
    
        let newScnarioList = [...this.state.scnarioes, {
            id: ++this.id,
            title: newScnario,
            blocks: 0
        }];
    
        this.setState({
            activeTab: this.state.activeTab,
            scnarioes: newScnarioList,
            modal: false,
            newScnario: ''
        });
    }

    handleChange(e) {
        let nextState = {};
    
        nextState[e.target.name] = e.target.value;
    
        this.setState(nextState);
    }

    render (){
        const {scnarioes, modal, newScnario} = this.state;

        const scnario_list = scnarioes.map(
            scnario => (<ScnarioCard key={scnario.id} thisscnario={scnario} onRemove={this.handleRemove} bot_id={this.props.match.params.bot_name} />)
        );

        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.tabToggle('1'); }}
                        >
                        목록
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.tabToggle('2'); }}
                        >
                        설정
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Container fluid>
                            <Row>
                                {scnario_list}
                            </Row>
                            <Row>
                            <Col>
                            <Button color="warning" size="lg" block onClick={this.toggle}>새 시나리오 만들기</Button>
                            </Col>
                        </Row>
                        </Container>
                        <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle} close={closeBtn}>새 시나리오</ModalHeader>
                            <ModalBody>
                            <Form>
                                <FormGroup>
                                <Label for="scnario-title">시나리오 제목</Label>
                                <Input type="text" name="newScnario" id="scnario-title" valid onChange={this.handleChange}/>
                                <FormFeedback valid>Sweet! that name is available</FormFeedback>
                                </FormGroup>
                            </Form>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={this.handleWrite}>생성</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>취소</Button>
                            </ModalFooter>
                        </Modal>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col xs="12">기본 블록</Col>
                            <Col xs="12">
                                <ListGroup>
                                    <ListGroupItem tag="button" action>
                                        <Col xs="9" className="display-inline padding-none">웰컴 블록</Col>
                                        <Col xs="3" className="display-inline padding-none text-right">
                                            <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} checked size={'sm'} />
                                        </Col>
                                    </ListGroupItem>
                                    <ListGroupItem tag="button" action>
                                        <Col xs="9" className="display-inline padding-none">폴백 블록</Col>
                                        <Col xs="3" className="display-inline padding-none text-right">
                                            <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} checked size={'sm'} />
                                        </Col>
                                    </ListGroupItem>
                                    <ListGroupItem tag="button" action>
                                        <Col xs="9" className="display-inline padding-none">탈출 블록</Col>
                                        <Col xs="3" className="display-inline padding-none text-right">
                                            <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} checked size={'sm'} />
                                        </Col>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">되묻기 질문 유효 조건</Col>
                            <Col xs="12">
                                <ListGroup>
                                    <ListGroupItem>
                                        <Col xs="3" className="display-inline">
                                            <FormGroup>
                                                <Label for="maxNumber">최대 횟수</Label>
                                                <Input type="select" name="maxNumSelect" id="maxNumber">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="9" className="display-inline">
                                            <FormGroup>
                                                <Label for="maxNumText">초과 시 안내 메세지</Label>
                                                <Input type="text" name="maxNumText" id="maxNumText" defaultValue="무슨 말인지 이해하지 못했어요."/>
                                            </FormGroup>
                                        </Col>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Col xs="3" className="display-inline">
                                            <FormGroup>
                                                <Label for="maxTime">최대 시간</Label>
                                                <Input type="select" name="maxTimeSelect" id="maxTime">
                                                    <option>10</option>
                                                    <option>20</option>
                                                    <option>30</option>
                                                    <option>40</option>
                                                    <option>50</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="9" className="display-inline">
                                            <FormGroup>
                                                <Label for="maxTimeText">초과 시 안내 메세지</Label>
                                                <Input type="text" name="maxTimeText" id="maxTimeText" defaultValue="시간이 초과하였습니다. 다시 입력해주세요."/>
                                            </FormGroup>
                                        </Col>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-right">
                                <Button color="primary">저장</Button>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
          </div>
        );
    }
}

export default DetailScnario;