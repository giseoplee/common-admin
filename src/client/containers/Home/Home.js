import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Container, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import { getStatusRequest } from '../../actions/AuthActions';
import { getBotsRequest } from '../../actions/BotActions';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// routes config
import routes from '../../routes';
import { Aside, Header } from '../../components/Page';
import CardComponent from '../../components/Card/CardComponent';

import './Home.css';

class Home extends Component {

  id = 0;

  constructor(props){
    super(props);

    this.state = {
      bots: [],
      bot_number: 0,
      modal: false,
      newbotname:'',
      newbotdesc:''
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
              bot_number: data.length,
              modal: this.state.modal,
              newbotname:this.state.newbotname,
              newbotdesc: this.state.newbotdesc
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
      bot_number: data.length,
      modal: this.state.modal,
      newbotname:this.state.newbotname,
      newbotdesc: this.state.newbotdesc
    });

    this.id = data.length;
  };

  shouldComponentUpdate(nextProps, nextState) {

    if (nextState.bots.length !== nextState.bot_number) return false;
    return true;
  }

  handleWrite(){
    let newbotname = this.state.newbotname;
    let newbotdesc = this.state.newbotdesc;

    let newbotlist = [...this.state.bots, {
      id: ++this.id,
      name: newbotname,
      description: newbotdesc,
      createdAt: new Date(),
      updatedAt: new Date()
    }];

    this.setState({
      bots: newbotlist,
      bot_number: ++this.state.bot_number,
      modal: false,
      newbotname:'',
      newbotdesc: ''
    });
  }

  handleRemove(id){

    this.setState({
      bots: this.state.bots.filter(bot => bot.id !== id),
      bot_number: --this.state.bot_number,
      modal: this.state.modal,
      newbotname:'',
      newbotdesc: ''
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
      bot_number: this.state.bot_number,
      modal: !this.state.modal,
      newbotname:this.state.newbotname,
      newbotdesc: this.state.newbotdesc
    });
  }

  render() {
    const {bots, bot_number, modal, newbotname, newbotdesc} = this.state;

    const bot_list = bots.map(
      bot => (<CardComponent key={bot.id} thisbot={bot} onRemove={this.handleRemove} />)
    );

    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

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
                  <h4>내 봇<Badge color="danger">{bot_number}</Badge></h4>
                </Col>
              </Row>
              <Row>
                {bot_list}
              </Row>
              <Row>
                <Col>
                  <Button color="warning" size="lg" block onClick={this.toggle}>봇 생성</Button>
                </Col>
              </Row>
            </Container>
          </main>
          <AppAside fixed hidden>
            <Aside />
          </AppAside>
        </div>
        <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>봇 생성</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
              <Label for="bot-name">봇 이름</Label>
              <Input type="text" name="newbotname" id="bot-name" invalid value={newbotname} onChange={this.handleChange}/>
              <FormFeedback invalid>봇 이름을 설정해주세요!</FormFeedback>
              <Label for="bot-desc">봇 설명</Label>
              <Input type="textarea" name="newbotdesc" id="bot-desc" value={newbotdesc} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleWrite}>생성</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>취소</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      status: state.authentication.status,
      bots: state.bot.bot_list
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
