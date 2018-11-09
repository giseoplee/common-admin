import React, { Component, Fragment } from 'react';
import { PaginationLink, PaginationItem, Pagination, Table, Container, Row, Col, Badge, Button, Card, CardHeader, CardTitle, CardText, CardBody, CardFooter, Label, Input, FormGroup, FormFeedback, Form, ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './block.css';

class Quarter extends Component {
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
        const lastTdWidth = {
            width: '150px'
        };

        return (
            <Fragment>
                <Row>
                    <Col sm="12" className="padding-none">
                        <Card body>
                            <CardTitle>블록 분기 설정</CardTitle>
                            <CardText>
                                <Row>
                                    <Col>
                                        <InputGroup>
                                            <Input name="search" />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText><a href="#" className="transparent-a"><i className="icon-magnifier icons d-block"></i></a></InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>블록명</th>
                                    <th>Description</th>
                                    <th>Base Route</th>
                                    <th>Status</th>
                                    <th>Date registered</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>GRS CHATBOT ANGEL</td>
                                    <td>Description</td>
                                    <td>/GRS/v1/</td>
                                    <td>
                                    <Badge color="success">Published</Badge>
                                    </td>
                                    <td>2012-01-01</td>
                                    <td style={lastTdWidth}>
                                    <Button size="sm" className="margin-left-20" outline color="info">Edit</Button>
                                    <Button size="sm" className="margin-left-8" outline color="danger">Delete</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>GRS CHATBOT RIA</td>
                                    <td>Description</td>
                                    <td>/GRS/v2/</td>
                                    <td>
                                    <Badge color="warning">Created</Badge>
                                    </td>
                                    <td>2012-01-01</td>
                                    <td style={lastTdWidth}>
                                    <Button size="sm" className="margin-left-20" outline color="info">Edit</Button>
                                    <Button size="sm" className="margin-left-8" outline color="danger">Delete</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>L-MESSAGE REST API</td>
                                    <td>Description</td>
                                    <td>/lmessage/rest/</td>
                                    <td>
                                    <Badge color="warning">Created</Badge>
                                    </td>
                                    <td>2012-01-01</td>
                                    <td style={lastTdWidth}>
                                    <Button size="sm" className="margin-left-20" outline color="info">Edit</Button>
                                    <Button size="sm" className="margin-left-8" outline color="danger">Delete</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>INSIGHT REST API</td>
                                    <td>Description</td>
                                    <td>/insight/v1/</td>
                                    <td>
                                    <Badge color="warning">Created</Badge>
                                    </td>
                                    <td>2012-01-01</td>
                                    <td style={lastTdWidth}>
                                    <Button size="sm" className="margin-left-20" outline color="info">Edit</Button>
                                    <Button size="sm" className="margin-left-8" outline color="danger">Delete</Button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <Row col="12">
                                <Col xs="4"></Col>
                                <Col xs="4">
                                <Pagination listClassName="justify-content-center">
                                    <PaginationItem>
                                    <PaginationLink previous tag="button"></PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem active>
                                    <PaginationLink tag="button">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink tag="button">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink tag="button">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink tag="button">4</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink next tag="button"></PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                                </Col>
                                <Col xs="3"></Col>
                                <Col xs="1"><Button block size="sm" standard color="primary" tag="Link" to="/home" >Add</Button></Col>
                            </Row>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Quarter;