import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';
import  { withRouter } from 'react-router-dom';
import './cards.css';

class ScnarioCard extends Component {
    constructor(props){
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.onHref = this.onHref.bind(this);
    }

    handleRemove(){
        const {thisscnario, onRemove} = this.props;

        onRemove(thisscnario.id);
    }

    onHref(url){
        this.props.history.push(url);
    }

    render(){
        const {thisscnario: {id, title, blocks}, bot_id} = this.props;

        let scnarioUrl = "/bot/"+bot_id+"/scenario/"+{id}.id;

        return (
            <Col xs="3">
                <Card body>
                    <CardTitle>
                        <Col xs="8" className="display-inline padding-none">{title}</Col>
                        <Col xs="4" className="display-inline text-right padding-none"><Button close onClick={this.handleRemove}/></Col>
                    </CardTitle>
                    <CardText>{blocks.length}개의 블록</CardText>
                    <Button onClick={() => {this.onHref(scnarioUrl);}}>수정하기</Button>
                </Card>
            </Col>
        );
    }
}

export default withRouter(ScnarioCard);