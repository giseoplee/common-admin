import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem, Input, FormFeedback } from 'reactstrap';

import './detail.css';

class DetailBlockList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blocks: []
        };

        this.goScenarioList = this.goScenarioList.bind(this);
        this.createNewBlock = this.createNewBlock.bind(this);
        this.goBlock = this.goBlock.bind(this);
        this.AddFollowIntent = this.AddFollowIntent.bind(this);
        this.removeBlock = this.removeBlock.bind(this);
    }

    id = 3;

    /* 하위 인텐트 추가 혹은 인텐트 제거 시 ListGroupItem 버튼 이벤트 실행을 방지하기 위한 변수 */
    addEvent = false;
    removeEvent = false;

    componentDidMount(){
        let data = [];

        data = [{
            id: 0,
            parent: null,
            name: 'block_1'
        }, {
            id: 1,
            parent: null,
            name: 'block_2'
        }, {
            id: 2,
            parent: null,
            name: 'block_3'
        }, {
            id: 3,
            parent: null,
            name: 'block_4'
        }
        ];

        this.setState({
            blocks: data
        });

        this.id = data.length;
    }

    removeBlock(id){
        this.setState({
            blocks: this.state.blocks.filter(block => block.id !== id)
        });

        this.removeEvent = true;
    }

    AddFollowIntent(id, name){
        let newFollowIntent = {
            id: ++this.id,
            parent: id,
            name: name+'-follow-up'
        };

        let parentIndex = this.state.blocks.findIndex(x => x.id === id);

        console.log(parentIndex);

        let newBlocks = JSON.parse(JSON.stringify(this.state.blocks));

        newBlocks.splice(parentIndex+1, 0, newFollowIntent);

        console.log(newBlocks);

        this.setState({
            blocks: newBlocks
        });

        this.addEvent = true;
    }

    goScenarioList() {
        const url = '/bot/'+this.props.match.params.bot_name+'/scnario';
        this.props.history.push(url);
    }

    createNewBlock() {
        const url = '/bot/'+this.props.match.params.bot_name+'/intent/new?scenarioId='+this.props.match.params.scenario_name;
        this.props.history.push(url);
    }

    goBlock(id){
        if(this.addEvent || this.removeEvent){
            this.addEvent = this.removeEvent = false;
            return;
        }
        else{
            const url = '/bot/'+this.props.match.params.bot_name+'/intent/'+id+'?scenarioId='+this.props.match.params.scenario_name;
            this.props.history.push(url);
        }
    }

    render () {
        const {blocks} = this.state;

        const blockList = blocks.map(
            block => (
            <ListGroupItem key={block.id} tag="button" action onClick={() => {this.goBlock(block.id);}}>
                <Row>
                    <Col sm="6">
                        {block.parent !== null? <Fragment>&nbsp;&nbsp;&nbsp;</Fragment>: <Fragment></Fragment>}
                        {block.name}
                    </Col>
                    <Col sm="6" className="text-right">
                        <Button color="link" onClick={() => {this.AddFollowIntent(block.id, block.name);}}><i className="icon-layers icons"></i>&nbsp;Add follow-up intent</Button>
                        <Button color="ghost-success" onClick={() => {this.removeBlock(block.id);}}><i className="icon-trash icons"></i></Button>
                    </Col>
                </Row>
            </ListGroupItem>)
        );
        return (
            <Container fluid>
                <Row className="vertical-margin">
                    <Col xs="12" className="padding-none">
                        <Button color="ghost-success" onClick={() => {this.goScenarioList();}}>
                            <i className="icon-arrow-left-circle icons"></i>&nbsp;시나리오 목록
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm="11">
                        <Input type="text" name="ScenarioName" id="scenario-name" placeholder="시나리오 이름" bsSize="lg" defaultValue="시나리오 #11" invalid />
                        <FormFeedback>시나리오 이름을 설정해주세요!</FormFeedback>
                    </Col>
                    <Col sm="1" className="text-right padding-none">
                        <Button color="secondary">저장</Button>
                    </Col>
                </Row>
                <ListGroup>{blockList}</ListGroup>
                <Row className="vertical-margin">
                    <Col xs="12" className="padding-none">
                        <Button color="danger" size="lg" outline block onClick={()=> {this.createNewBlock();}}>새 블록 만들기</Button>{' '}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DetailBlockList;