import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';
import  { withRouter } from 'react-router-dom';
import './cards.css';

class CardComponent extends Component {
    constructor(props){
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.onHref = this.onHref.bind(this);
    }

    handleRemove(){
        const {thisbot, onRemove} = this.props;

        onRemove(thisbot.id);
    }

    onHref(url){
        return this.props.history.push(url);
    }

    render(){
        const {thisbot: {id, name, description}} = this.props;

        let bot_url = "/bot/" + id + "/scenario";

        return (
            
            <Col xs="3">
                <Card body>
                    <CardTitle>
                        <Col xs="8" className="display-inline padding-none">{name}</Col>
                        <Col xs="4" className="display-inline text-right padding-none"><Button close onClick={this.handleRemove}/></Col>
                    </CardTitle>
                    <CardText className="text-center">{description}</CardText>
                    <Button onClick={() => {this.onHref(bot_url);}}>수정하기</Button>
                </Card>
            </Col>
        );
    }
}

export default withRouter(CardComponent);