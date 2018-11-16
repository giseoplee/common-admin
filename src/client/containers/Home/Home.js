import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Container, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import { getStatusRequest } from '../../actions/AuthActions';
import { getBotsRequest } from '../../actions/BotActions';

import {
  AppAside,
  AppHeader
} from '@coreui/react';

import { Aside, Header } from '../../components/Page';
import CardComponent from '../../components/Card/CardComponent';

import './Home.css';

class Home extends Component {

  id = 0;

  constructor(props){
    super(props);

    this.state = {
      bots: [],
      botNumber: 0,
      modal: false,
      newBotName:'',
      newBotDesc:''
    }

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleWrite = this.handleWrite.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {};

    nextState[e.target.name] = e.target.value;

    this.setState(nextState);
  }

  componentDidMount() {
    /* Session Validation Part (Now Commented) */
    /*
    
    this.props.getStatusRequest().then(_ => {
        
        if(!this.props.status.valid){
            return this.props.history.push('/login');
        }

        this.props.getBotsRequest(this.props.status.currentUser.toString()).then(_ => {

          if(this.props.bots.status !== 'FAILURE'){
            let data = JSON.parse(this.props.bots.bots);
    
            this.setState({
              bots: data,
              botNumber: data.length,
              modal: this.state.modal,
              newBotName:this.state.newBotName,
              newBotDesc: this.state.newBotDesc
            });

            this.id = data.length;
          }
        });
    });

    */

    let data = [
      {
        id: 0,
        name: '문의 봇',
        description: '문의 담당 봇',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1,
        name: '정보 알림 봇',
        description: '마트 정보 알리미 봇',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.setState({
      bots: data,
      botNumber: data.length,
      modal: this.state.modal,
      newBotName:this.state.newBotName,
      newBotDesc: this.state.newBotDesc
    });

    this.id = data.length;
  };

  shouldComponentUpdate(nextProps, nextState) {

    if (nextState.bots.length !== nextState.botNumber) return false;
    return true;
  }

  handleWrite(){
    let newBotName = this.state.newBotName;
    let newBotDesc = this.state.newBotDesc;

    let newBotList = [...this.state.bots, {
      id: ++this.id,
      name: newBotName,
      description: newBotDesc,
      createdAt: new Date(),
      updatedAt: new Date()
    }];

    this.setState({
      bots: newbotlist,
      botNumber: ++this.state.botNumber,
      modal: false,
      newBotName:'',
      newBotDesc: ''
    });
  }

  handleRemove(id){

    this.setState({
      bots: this.state.bots.filter(bot => bot.id !== id),
      botNumber: --this.state.botNumber,
      modal: this.state.modal,
      newBotName:'',
      newBotDesc: ''
    });
  }

  handleKeyPress(e) {
    if(e.charCode === 13){
      e.preventDefault();
      this.handleWrite();
    }
  }

  toggle() {
    this.setState({
      bots: this.state.bots,
      botNumber: this.state.botNumber,
      modal: !this.state.modal,
      newBotName:this.state.newBotName,
      newBotDesc: this.state.newBotDesc
    });
  }

  render() {
    const {bots, botNumber, modal, newBotName, newBotDesc} = this.state;

    const botList = bots.map(
      bot => (<CardComponent key={ bot.id } thisBot={ bot } onRemove={ this.handleRemove } />)
    );

    const closeBtn = <button className="close" onClick={ this.toggle }>&times;</button>;

    return (
      <div className="app">
        <AppHeader fixed>
          <Header page="main"/>
        </AppHeader>
        <div className="app-body">
          <main className="main margin-left-0">
            <Container fluid>
              <Row>
                <Col className="align-items-center">
                  <h4>내 봇<Badge color="danger">{botNumber}</Badge></h4>
                </Col>
              </Row>
              <Row>
                { botList }
              </Row>
              <Row>
                <Col>
                  <Button color="warning" size="lg" block onClick={ this.toggle }>봇 생성</Button>
                </Col>
              </Row>
            </Container>
          </main>
          <AppAside fixed hidden>
            <Aside />
          </AppAside>
        </div>
        <Modal isOpen={ modal } toggle={ this.toggle } className={ this.props.className }>
          <ModalHeader toggle={ this.toggle } close={ closeBtn }>봇 생성</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
              <Label for="bot-name">봇 이름</Label>
              <Input type="text" name="newBotName" id="bot-name" invalid value={newBotName} onChange={this.handleChange}/>
              <FormFeedback invalid>봇 이름을 설정해주세요!</FormFeedback>
              <Label for="bot-desc">봇 설명</Label>
              <Input type="textarea" name="newBotDesc" id="bot-desc" value={newBotDesc} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ this.handleWrite }>생성</Button>{' '}
            <Button color="secondary" onClick={ this.toggle }>취소</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      status: state.authentication.status,
      bots: state.bot.jsonBotList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      getStatusRequest: () => {
          return dispatch(getStatusRequest());
      },
      getBotsRequest: (id) => {
        return dispatch(getBotsRequest(id));
      }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
