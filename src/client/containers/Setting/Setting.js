import React, { Component } from 'react';
import { Container, Row, Col, Button, Card, CardTitle, Alert, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBotDetail } from '../../actions/bot/settingActions';

class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            botName: '',
            botDescription: '',
            botUrl: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.props.getBotDetail({ id: 1 });
    }

    componentWillReceiveProps(nextProps) {
        log('nextProps > ', nextProps.botInformation);
        const { botInformation } = nextProps;
        
        this.props.botInformation !== nextProps.botInformation
        ? this.setState({
            botName: botInformation.data.name,
            botDescription: botInformation.data.description,
            botUrl: botInformation.data.token
        }) : undefined
    }

    handleChange(){
        let nextState = {};
    
        nextState[e.target.name] = e.target.value;
    
        this.setState(nextState);
    }

    render(){
        const { botName, botDescription, botUrl } = this.state;
        return(
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card body>
                            <CardTitle>기본 설정</CardTitle>
                            <Label for="bot-name">이름</Label>
                            <Input type="text" name="bot_name" id="bot-name" value={ botName }/>
                            <Label for="bot-desc">설명</Label>
                            <Input type="text" name="bot_desc" id="bot-desc" value={ botDescription }/>
                            <Label for="bot-api-url">API URL (변경 불가)</Label>
                            <Input type="text" name="bot_api_url" id="bot-api-url" disabled value={ botUrl }/>
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

const mapStateToProps = (state) => {
    log('Update State > ', state.bot.information);
    return {
        botInformation: state.bot.information
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBotDetail: id => {
            return dispatch(getBotDetail(id));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Setting));
