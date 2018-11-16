import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem, Input, FormFeedback, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Block extends Component {
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
        this.recursivePushArray = this.recursivePushArray.bind(this);
    }

    id = 0;

    /* 하위 인텐트 추가 혹은 인텐트 제거 시 ListGroupItem 버튼 이벤트 실행을 방지하기 위한 변수 */
    addEvent = false;
    removeEvent = false;

    /* state에 flow를 고려해서 블록들을 저장하기 위한 배열 */
    blockArray = [];

    /* json데이터를 파싱한 전체 블록 리스트 저장 */
    wholeBlocks = [];

    botId = this.props.match.params.bot_name;
    scenarioId = this.props.match.params.scenario_name;

    recursivePushArray(nextjson, parent, tree){

        let nextArray = Object.values(nextjson);

        nextArray.forEach((element) => {

            if(element !== "welcome" && element !== "fallback"){
                if(this.blockArray.findIndex(x => x.id === element) < 0){
                    let parentindex = parseInt(element.split('_')[2]);

                    this.blockArray.push({
                        id: element,
                        name: this.wholeBlocks[parentindex].name,
                        parent: parent,
                        tree: tree
                    });

                    if(this.wholeBlocks[parentindex].next !== null){
                        this.recursivePushArray(this.wholeBlocks[parentindex].next, element, tree+1);
                    }
                }
            }
        });
    }

    componentDidMount(){
        let data = [];

        /* 다른 시나리오 선택 시 기존 로컬 스토리지 내 데이터 삭제 */
        if(localStorage.getItem('currentScenario') !== this.scenarioId){
            localStorage.removeItem('currentBlockList');
        }

        /* 새로고침 눌렀을 때 이미 데이터를 가지고 있으므로 로컬 스토리지의 데이터로 setState */
        if(localStorage.getItem('currentBlockList')){
            return this.setState({
                blocks: JSON.parse(localStorage.getItem('currentBlockList'))
            });
        }

        if(this.props.jsonBlockList.status === 'SUCCESS'){
            data = JSON.parse(this.props.jsonBlockList.scenarios);

            let current_blocks = JSON.parse(JSON.stringify(data.scenarios[this.scenarioId].list));

            let startBlocks = data.scenarios[this.scenarioId].head;

            this.wholeBlocks = Object.values(current_blocks);

            /* head 배열의 블록부터 state에 저장 */
            startBlocks.forEach((element) => {
                let toInt = parseInt(element);

                this.blockArray.push({
                    id: `${this.scenarioId}_${toInt}`,
                    name: this.wholeBlocks[toInt].name,
                    parent: null,
                    tree: 0
                });
    
                /* head 배열의 블록들에 next flow가 있을 시 재귀 함수 돌면서 저장 */
                if(this.wholeBlocks[toInt].next !== null) {
                    this.recursivePushArray(this.wholeBlocks[toInt].next, `${this.scenarioId}_${toInt}`, 1);
                }
            });

            this.setState({
                blocks: this.blockArray
            });

            /* 로컬스토리지를 갱신해야 하는지 판단하기 위해 저장 */
            localStorage.setItem('currentScenario', this.scenarioId);

            /* 새로고침 누를 시 redux state가 유지되지 않으므로 로컬 스토리지에 저장 */
            localStorage.setItem('currentBlockList', JSON.stringify(this.blockArray));
        }
        
        this.id = this.blockArray.length;
    }

    removeBlock(id){
        this.setState({
            blocks: this.state.blocks.filter(block => block.id !== id)
        });

        this.removeEvent = true;
    }

    AddFollowIntent(id, name, tree){
        let newFollowIntent = {
            id: `${this.scenarioId}_${this.id}`,
            parent: id,
            tree: ++tree,
            name: `${name}-follow-up`
        };

        let parentIndex = this.state.blocks.findIndex(x => x.id === id);


        let newBlocks = JSON.parse(JSON.stringify(this.state.blocks));

        newBlocks.splice(parentIndex+1, 0, newFollowIntent);

        this.setState({
            blocks: newBlocks
        });

        this.id++;

        this.addEvent = true;
    }

    goScenarioList() {
        const url = `/bot/${this.botId}/scenario`;
        this.props.history.push(url);
    }

    createNewBlock() {
        const url = `/bot/${this.botId}/intent/new?scenarioId=${this.scenarioId}`;
        this.props.history.push(url);
    }

    goBlock(id){
        if(this.addEvent || this.removeEvent){
            return this.addEvent = this.removeEvent = false;
        }
        else{
            const url = `/bot/${this.botId}/intent/${id}?scenarioId=${this.scenarioId}`;
            this.props.history.push(url);
        }
    }

    render () {
        const { blocks } = this.state;

        const blockList = blocks.map(
            block => (
            <ListGroupItem key={ block.id } tag="button" action onClick={ () => this.goBlock(block.id) }>
                <Row>
                    <Col sm="6" className={ block.parent !== null ? "block_tree_"+block.tree : "" }>
                        { block.parent !== null ? <Fragment>└&nbsp;</Fragment> : <Fragment><Badge color="info" className="color-white">flow start</Badge>&nbsp;</Fragment> }
                        { block.name }
                    </Col>
                    <Col sm="6" className="text-right">
                        <Button color="link" onClick={ () => this.AddFollowIntent(block.id, block.name, block.tree) } className="custom-link-btn"><i className="icon-layers icons"></i>&nbsp;다음 연결 블록 추가하기</Button>
                        <Button color="ghost-success" onClick={ () => this.removeBlock(block.id) }><i className="icon-trash icons"></i></Button>
                    </Col>
                </Row>
            </ListGroupItem>)
        );

        return (
            <Container fluid>
                <Row className="vertical-margin">
                    <Col xs="12" className="padding-none">
                        <Button color="ghost-success" onClick={ () => this.goScenarioList() }>
                            <i className="icon-arrow-left-circle icons"></i>&nbsp;시나리오 목록
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm="11">
                        <Input type="text" name="currentScenario" id="current_scenario" placeholder="시나리오 이름" bsSize="lg" defaultValue="시나리오 #11" invalid />
                        <FormFeedback>시나리오 이름을 설정해주세요!</FormFeedback>
                    </Col>
                    <Col sm="1" className="text-right padding-none">
                        <Button color="secondary">저장</Button>
                    </Col>
                </Row>
                <ListGroup>{ blockList.length === 0 ? <ListGroupItem><Col className="text-center"><p>블록이 없습니다.</p></Col></ListGroupItem> : blockList }</ListGroup>
                <Row className="vertical-margin">
                    <Col xs="12" className="padding-none">
                        <Button color="danger" size="lg" outline block onClick={ ()=> this.createNewBlock() }>새 블록 만들기</Button>{' '}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        jsonBlockList: state.parsing.jsonScenarioList
    };
};

export default withRouter(connect(mapStateToProps)(Block));