import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';
import  { withRouter } from 'react-router-dom';
import './Card.css';

class ScenarioCard extends Component {
    constructor(props){
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.onHref = this.onHref.bind(this);
    }

    handleRemove(){
        const {thisscenario, onRemove} = this.props;

        onRemove(thisscenario.id);
    }

    onHref(url){
        this.props.history.push(url);
    }

    render(){
        const {thisscenario: {id, title, blocks}, bot_id} = this.props;

        let scenarioUrl = "/bot/"+bot_id+"/scenario/"+{id}.id;

        return (
            <Col xs="3">
                <Card body>
                    <CardTitle>
                        <Col xs="8" className="display-inline padding-none">{title}</Col>
                        <Col xs="4" className="display-inline text-right padding-none"><Button close onClick={this.handleRemove}/></Col>
                    </CardTitle>
                    <CardText>{blocks.length}개의 블록</CardText>
                    <Button onClick={() => {this.onHref(scenarioUrl);}}>수정하기</Button>
                </Card>
            </Col>
        );
    }
}

export default withRouter(ScenarioCard);