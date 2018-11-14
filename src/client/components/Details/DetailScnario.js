import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Card, CardTitle } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import { AppSwitch } from '@coreui/react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ScnarioCard from '../Cards/ScnarioCard';
import './detail.css';

import { getJsonRequest } from '../../actions/BotJsonActions';

class DetailScnario extends Component {

    constructor(props){
        super(props);

        this.state = {
            activeTab: '1',
            scnarioes: [],
            modal: false, 
            newScnario: '',
            welcomeId: '',
            fallbackId: '',
            welcomeState: true,
            fallbackState: true
        }

        this.handleRemove = this.handleRemove.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleWrite = this.handleWrite.bind(this);
        this.tabToggle = this.tabToggle.bind(this);
        this.goBlock = this.goBlock.bind(this);
        this.setOffSwitch = this.setOffSwitch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    id = -1;

    componentDidMount(){
        // match.params.bot_name 으로 DB에서 관련 시나리오 가져오기

        let data = [];

        if(!this.props.match.params.bot_name){
            return this.props.history.push('/home');
        }

        this.props.getJsonRequest(this.props.match.params.bot_name).then(_ => {

            if(this.props.scenario_list.status === 'SUCCESS'){
                data = JSON.parse(this.props.scenario_list.scenarios);
                
                let scenarioArr = [];

                console.log(Object.values(data.scenarios));

                this.id = Object.values(data.scenarios).length;

                Object.values(data.scenarios).forEach((element, index) => {
                    scenarioArr.push({
                        id: "scenario_0"+(index+1),
                        title: element.name,
                        blocks: Object.values(element.list),
                    });
                });

                this.setState({
                    activeTab: '1',
                    scnarioes: scenarioArr,
                    modal: false,
                    newScnario: '',
                    welcomeId: this.props.match.params.bot_name+'_welcome',
                    fallbackId: this.props.match.params.bot_name+'_fallback',
                    welcomeState: true,
                    fallbackState: true
                });
            }
        });
    }

    setOffSwitch(id){
        this.state.welcomeId === id? 
            this.setState({
                activeTab: this.state.activeTab,
                scnarioes: this.state.scnarioes,
                modal: this.state.modal,
                newScnario: this.state.newScnario,
                welcomeId: this.state.welcomeId,
                fallbackId: this.state.fallbackId,
                welcomeState: !this.state.welcomeState,
                fallbackState: this.state.fallbackState
            }) 
            : this.setState({
                activeTab: this.state.activeTab,
                scnarioes: this.state.scnarioes,
                modal: this.state.modal,
                newScnario: this.state.newScnario,
                welcomeId: this.state.welcomeId,
                fallbackId: this.state.fallbackId,
                welcomeState: this.state.welcomeState,
                fallbackState: !this.state.fallbackState
            })
    }

    handleRemove(id){
        this.setState({
            activeTab: this.state.activeTab,
            scnarioes: this.state.scnarioes.filter(scnario => scnario.id !== id),
            modal: this.state.modal,
            newScnario: this.state.newScnario,
            welcomeId: this.state.welcomeId,
            fallbackId: this.state.fallbackId,
            welcomeState: this.state.welcomeState,
            fallbackState: this.state.fallbackState
        });
    }

    toggle() {
        this.setState({
            activeTab: this.state.activeTab,
            scnarioes: this.state.scnarioes,
            modal: !this.state.modal,
            newScnario: this.state.newScnario,
            welcomeId: this.state.welcomeId,
            fallbackId: this.state.fallbackId,
            welcomeState: this.state.welcomeState,
            fallbackState: this.state.fallbackState
        });
    }

    tabToggle(tab) {
        if (this.state.activeTab !== tab) {
            const {activeTab, ...rest} = this.state;
          this.setState({
            activeTab: tab,
            ...rest
          });
        }
    }

    handleWrite(){
        let newScnario = this.state.newScnario;
        ++this.id;

        let prefix = "scenario_0";

        if(this.id >= 10){
            prefix = "scenario_"+(this.id/10);
        }

        let newScnarioList = [...this.state.scnarioes, {
            id: prefix+(this.id % 10),
            title: newScnario,
            blocks: []
        }];
    
        this.setState({
            activeTab: this.state.activeTab,
            scnarioes: newScnarioList,
            modal: false,
            newScnario: '',
            welcomeId: this.state.welcomeId,
            fallbackId: this.state.fallbackId,
            welcomeState: this.state.welcomeState,
            fallbackState: this.state.fallbackState
        });
    }

    handleKeyPress(e) {
        if(e.charCode === 13){
          e.preventDefault();
          this.handleWrite();
        }
      }

    handleChange(e) {
        let nextState = {};
    
        nextState[e.target.name] = e.target.value;
    
        this.setState(nextState);
    }

    goBlock(e, id) {
        if (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0) {
            const url = '/bot/'+this.props.match.params.bot_name+'/intent/'+id;
            return this.props.history.push(url);
        }
    }

    render (){
        const {scnarioes, modal, newScnario, activeTab} = this.state;

        const scnario_list = scnarioes.map(
            scnario => (<ScnarioCard key={scnario.id} thisscnario={scnario} onRemove={this.handleRemove} bot_id={this.props.match.params.bot_name} />)
        );

        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

        return (
            <div>
                <Nav tabs className="custom-navitem">
                    <NavItem className="custom-navitem">
                        <NavLink
                        className={classnames({ active: activeTab === '1' }, 'custom-navlink')}
                        onClick={() => { this.tabToggle('1'); }}
                        >
                        목록
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: activeTab === '2' }, 'custom-navlink')}
                        onClick={() => { this.tabToggle('2'); }}
                        >
                        설정
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="detail-tab-content">
                    <TabPane tabId="1">
                        <Container fluid className="padding-none">
                            <Row>
                                {!scnario_list || scnario_list.length === 0? <Col className="text-center"><p>시나리오가 없습니다.</p></Col>:scnario_list}
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
                                <Input type="text" name="newScnario" id="scnario-title" value={newScnario} invalid onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                                <FormFeedback invalid>시나리오명을 입력하세요.</FormFeedback>
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
                            <Col sm="12">
                            <Card body>
                                <CardTitle>기본 블록</CardTitle>
                                <ListGroup>
                                    <ListGroupItem>
                                        {/*onClick={()=>{this.goBlock(event, this.state.welcomeId);}}*/}
                                        <Row>
                                            <Col sm="6">
                                                <Fragment><i className="icon-badge icons"></i>&nbsp;&nbsp;웰컴 블록</Fragment>
                                            </Col>
                                            <Col sm="6" className="text-right">
                                                <Button className="padding-none" color="link" onClick={()=>{this.goBlock(event, this.state.welcomeId);}}><i className="icon-link icons"></i>&nbsp;&nbsp;설정</Button>
                                                &nbsp;&nbsp;
                                                <AppSwitch size="sm" className={classnames('mx-1', 'vertical-middle')} variant={'pill'} color={'danger'} checked={this.state.welcomeState} onChange={() => {this.setOffSwitch(this.state.welcomeId);}}/>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        {/*onClick={()=>{this.goBlock(event, this.state.fallbackId);}}*/}
                                        <Row>
                                            <Col sm="6">
                                                <Fragment><i className="icon-loop icons"></i>&nbsp;&nbsp;폴백 블록</Fragment>
                                            </Col>
                                            <Col sm="6" className="text-right">
                                                <Button className="padding-none" color="link" onClick={()=>{this.goBlock(event, this.state.fallbackId);}}><i className="icon-link icons"></i>&nbsp;&nbsp;설정</Button>
                                                &nbsp;&nbsp;
                                                <AppSwitch size="sm" className={classnames('mx-1', 'vertical-middle')} variant={'pill'} color={'danger'} checked={this.state.fallbackState} onChange={() => {this.setOffSwitch(this.state.fallbackId);}}/>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <Card body>
                                    <CardTitle>채팅 유효시간 설정</CardTitle>
                                    <Row>
                                        <Col sm="3" className="display-inline">
                                            <Label for="ttl">TTL</Label>
                                            <Input type="select" name="selectTTL" id="ttl">
                                                <option>10분</option>
                                                <option>20분</option>
                                                <option>30분</option>
                                                <option>40분</option>
                                                <option>50분</option>
                                            </Input>
                                        </Col>
                                        <Col sm="9" className="display-inline">
                                            <Label for="ttl-message">초과 시 메세지</Label>
                                            <Input type="text" name="TTLMessage" id="ttl-message"/>
                                        </Col>
                                        <Col sm="12" className="text-right">
                                            <Button color="primary">저장</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        scenario_list: state.parsing.scenario_list
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getJsonRequest: (BotId) => {
            return dispatch(getJsonRequest(BotId));
        }
    };
  };

//export default DetailScnario;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailScnario));