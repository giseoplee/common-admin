import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Badge, Button, Card, CardHeader, CardTitle, CardSubtitle, CardText, CardBody, CardFooter, Label, Input, FormGroup, FormFeedback, Form, ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Parameter extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(this.props.intent_name === "new"){
        }
        else{
        }
    }

    render(){
        return (
            <Fragment>
                <Row>
                    <Col sm="12" className="padding-none">
                        <Card body>
                            <CardTitle>블록 파라미터 설정</CardTitle>
                            <CardText>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Parameter;