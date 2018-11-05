import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';

import './detail.css';

class DetailBlockList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blocks: []
        };
    }

    componentDidMount(){
        let data = [];

        data = [{
            id: 0,
            name: 'block_1'
        }, {
            id: 1,
            name: 'block_2'
        }, {
            id: 2,
            name: 'block_3'
        }, {
            id: 3,
            name: 'block_4'
        }
        ];

        this.setState({
            blocks: data
        });
    }

    render () {
        const {blocks} = this.state;

        const blockList = blocks.map(
            block => (<ListGroupItem key={block.id} tag="button" action>{block.name}</ListGroupItem>)
        );
        return (
            <div>
                <Row>
                    <Col xs="12">
                        <Button color="ghost-success">
                            <i className="fa fa-lightbulb-o"></i>&nbsp;시나리오 목록
                        </Button>
                    </Col>
                </Row>
                <ListGroup>{blockList}</ListGroup>
            </div>
        );
    }
}

export default DetailBlockList;