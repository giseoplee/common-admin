import React, { Component } from 'react';
import { Badge, Container, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

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
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from '../../components/DefaultAside';
import DefaultHeader from '../../components/DefaultHeader';
import CardComponent from '../../components/Cards/CardComponent';

class DefaultLayout extends Component {

  id = 3;

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
  }

  handleChange(e) {
    let nextState = {};

    nextState[e.target.name] = e.target.value;

    this.setState(nextState);
  }

  componentDidMount() {

    // DB에서 봇 리스트 가져오기
    let data = [{
      id: 0,
      bot_name: 'bot_1',
      scnario: 4,
      desc: 'this is sample!'
    }, {
      id: 1,
      bot_name: 'bot_2',
      scnario: 4,
      desc: 'this is sample!'
    }, {
      id: 2,
      bot_name: 'bot_3',
      scnario: 4,
      desc: 'this is sample!'
    }, {
      id: 3,
      bot_name: 'bot_4',
      scnario: 4,
      desc: 'this is sample!'
    }];

    this.setState({
      bots: data,
      bot_number: data.length,
      modal: this.state.modal,
      newbotname:this.state.newbotname,
      newbotdesc: this.state.newbotdesc
    });
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
      bot_name: newbotname,
      scnario: 0,
      desc: newbotdesc
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
          <DefaultHeader page="main"/>
        </AppHeader>
        <div className="app-body">
          <main className="main">
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
            <DefaultAside />
          </AppAside>
        </div>
        <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>봇 생성</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
              <Label for="bot-name">봇 이름</Label>
              <Input type="text" name="newbotname" id="bot-name" valid onChange={this.handleChange}/>
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
              <Label for="bot-desc">봇 설명</Label>
              <Input type="textarea" name="newbotdesc" id="bot-desc" onChange={this.handleChange}/>
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

export default DefaultLayout;
