import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Card, CardTitle } from 'reactstrap';
import classnames from 'classnames';
import { AppSwitch } from '@coreui/react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ScenarioCard from '../../components/Card/ScenarioCard';

import { getJsonRequest } from '../../actions/BotJsonActions';

class Scenario extends Component {

    

    constructor(props){
        super(props);

        this.state = {
            activeTab: '1',
            scenarios: [],
            modal: false, 
            newScenario: '',
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

    botId = this.props.match.params.bot_name;

    componentDidMount(){
        // match.params.bot_name 으로 DB에서 관련 시나리오 가져오기

        let data = [];

        if(!this.botId){
            return this.props.history.push('/');
        }

        this.props.getJsonRequest(this.botId).then(_ => {

            if(this.props.jsonScenarioList.status === 'SUCCESS'){
                data = JSON.parse(this.props.jsonScenarioList.scenarios);
                
                let scenarioArray = [];

                this.id = Object.values(data.scenarios).length;

                Object.values(data.scenarios).forEach((element, index) => { 
                    scenarioArray.push({
                        id: `scenario_${ (index+1) < 10 ? `0${index+1}` : `${index+1}` }`,
                        title: element.name,
                        blocks: Object.values(element.list),
                    });
                });

                this.setState({
                    activeTab: '1',
                    scenarios: scenarioArray,
                    modal: false,
                    newScenario: '',
                    welcomeId: `${this.botId}_welcome`,
                    fallbackId: `${this.botId}_fallback`,
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
                scenarios: this.state.scenarios,
                modal: this.state.modal,
                newScenario: this.state.newScnario,
                welcomeId: this.state.welcomeId,
                fallbackId: this.state.fallbackId,
                welcomeState: !this.state.welcomeState,
                fallbackState: this.state.fallbackState
            }) 
            : this.setState({
                activeTab: this.state.activeTab,
                scenarios: this.state.scenarios,
                modal: this.state.modal,
                newScenario: this.state.newScenario,
                welcomeId: this.state.welcomeId,
                fallbackId: this.state.fallbackId,
                welcomeState: this.state.welcomeState,
                fallbackState: !this.state.fallbackState
            })
    }

    handleRemove(id){
        this.setState({
            activeTab: this.state.activeTab,
            scenarios: this.state.scenarios.filter(scenario => scenario.id !== id),
            modal: this.state.modal,
            newScenario: this.state.newScenario,
            welcomeId: this.state.welcomeId,
            fallbackId: this.state.fallbackId,
            welcomeState: this.state.welcomeState,
            fallbackState: this.state.fallbackState
        });
    }

    toggle() {
        this.setState({
            activeTab: this.state.activeTab,
            scenarios: this.state.scenarios,
            modal: !this.state.modal,
            newScenario: this.state.newScenario,
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
        let newScenario = this.state.newScenario;
        ++this.id;

        let newScenarioList = [...this.state.scenarios, {
            id: `scenario_${ this.id < 10 ? `0${this.id}` : `${this.id}` }`,
            title: newScenario,
            blocks: []
        }];
    
        this.setState({
            activeTab: this.state.activeTab,
            scenarios: newScenarioList,
            modal: false,
            newScenario: '',
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
            const url = `/bot/${this.botId}/intent/${id}`;
            return this.props.history.push(url);
        }
    }

    render (){
        const { scenarios, modal, newScenario, activeTab } = this.state;

        const scenarioList = scenarios.map(
            scenario => (<ScenarioCard key={ scenario.id } thisScenario={ scenario } onRemove={ this.handleRemove } botId={ this.botId } />)
        );

        const closeBtn = <button className="close" onClick={ this.toggle }>&times;</button>;

        return (
            <div>
                <Nav tabs className="custom-navitem">
                    <NavItem className="custom-navitem">
                        <NavLink
                        className={ classnames({ active: activeTab === '1' }, 'custom-navlink') }
                        onClick={ () => this.tabToggle('1') }
                        >
                        목록
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={ classnames({ active: activeTab === '2' }, 'custom-navlink') }
                        onClick={ () => this.tabToggle('2') }
                        >
                        설정
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={ activeTab } className="detail-tab-content">
                    <TabPane tabId="1">
                        <Container fluid className="padding-none">
                            <Row>
                                { !scenarioList || scenarioList.length === 0? <Col className="text-center"><p>시나리오가 없습니다.</p></Col> : scenarioList }
                            </Row>
                            <Row>
                                <Col>
                                    <Button color="warning" size="lg" block onClick={ this.toggle }>새 시나리오 만들기</Button>
                                </Col>
                            </Row>
                        </Container>
                        <Modal isOpen={ modal } toggle={ this.toggle } className={ this.props.className }>
                            <ModalHeader toggle={ this.toggle } close={ closeBtn }>새 시나리오</ModalHeader>
                            <ModalBody>
                            <Form>
                                <FormGroup>
                                <Label for="scenario-title">시나리오 제목</Label>
                                <Input type="text" name="newScenario" id="scenario-title" value={ newScenario } invalid onChange={ this.handleChange } onKeyPress={ this.handleKeyPress }/>
                                <FormFeedback invalid>시나리오명을 입력하세요.</FormFeedback>
                                </FormGroup>
                            </Form>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={ this.handleWrite }>생성</Button>{' '}
                            <Button color="secondary" onClick={ this.toggle }>취소</Button>
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
                                        <Row>
                                            <Col sm="6">
                                                <Fragment><i className="icon-badge icons"></i>&nbsp;&nbsp;웰컴 블록</Fragment>
                                            </Col>
                                            <Col sm="6" className="text-right">
                                                <Button className="padding-none" color="link" onClick={ ()=> this.goBlock(event, this.state.welcomeId) }><i className="icon-link icons"></i>&nbsp;&nbsp;설정</Button>
                                                &nbsp;&nbsp;
                                                <AppSwitch size="sm" className={ classnames('mx-1', 'vertical-middle') } variant={ 'pill' } color={ 'danger' } checked={ this.state.welcomeState } onChange={ () => this.setOffSwitch(this.state.welcomeId) }/>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col sm="6">
                                                <Fragment><i className="icon-loop icons"></i>&nbsp;&nbsp;폴백 블록</Fragment>
                                            </Col>
                                            <Col sm="6" className="text-right">
                                                <Button className="padding-none" color="link" onClick={ ()=> this.goBlock(event, this.state.fallbackId) }><i className="icon-link icons"></i>&nbsp;&nbsp;설정</Button>
                                                &nbsp;&nbsp;
                                                <AppSwitch size="sm" className={ classnames('mx-1', 'vertical-middle') } variant={ 'pill' } color={ 'danger' } checked={ this.state.fallbackState } onChange={ () => this.setOffSwitch(this.state.fallbackId) }/>
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
        jsonScenarioList: state.parsing.jsonScenarioList
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Scenario));