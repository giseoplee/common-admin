import React, { Component, Fragment } from 'react';
import { Tooltip, PaginationLink, PaginationItem, Pagination, Table, Container, Row, Col, Badge, Button, Card, CardHeader, CardTitle, CardSubtitle, CardText, CardBody, CardFooter, Label, Input, FormGroup, FormFeedback, Form, ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './block.css';
import { AppSwitch } from '@coreui/react'
import classnames from 'classnames';

class Parameter extends Component {
    constructor(props){
        super(props);

        this.state = {
        tooltipOpen: false
        };

        this.tooltipToggle = this.tooltipToggle.bind(this);
    }

    componentDidMount(){
        if(this.props.intent_name === "new"){
        }
        else{
        }
    }

    tooltipToggle() {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
    }

    render(){
        const firstTdWidth = {
            width: '100px'
        };

        const lastTdWidth = {
            width: '300px'
        };

        return (
            <Fragment>
                <Row>
                    <Col sm="12" className="padding-none">
                        <Card body>
                            <CardTitle>사용자 입력값 설정</CardTitle>
                            <CardSubtitle><code>흐름 내 <strong>이전</strong> 블록들의 사용자 입력값을 선택하여 응답에서 사용할 수 있습니다.</code></CardSubtitle>
                            <CardText>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>사용 여부</th>
                                            <th>블록명</th>
                                            <th>입력값 타입</th>
                                            <th>대표 이름 설정&nbsp;<i className="icon-question icons" id="TooltipExample"></i></th>
                                            <Tooltip placement="bottom-start" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.tooltipToggle}>
                                                블록명 대신 응답에서 사용할 이름을 설정할 수 있습니다. 
                                            </Tooltip>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={firstTdWidth}>
                                                <AppSwitch checked size="sm" className={classnames('mx-1', 'vertical-middle')} variant={'pill'} color={'primary'}/>
                                            </td>
                                            <td>
                                                welcome
                                            </td>
                                            <td>
                                                none, text
                                            </td>
                                            <td style={lastTdWidth}>
                                                <Input type="text" name="0_parameter" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={firstTdWidth}>
                                                <AppSwitch checked size="sm" className={classnames('mx-1', 'vertical-middle')} variant={'pill'} color={'primary'}/>
                                            </td>
                                            <td>
                                                fallback
                                            </td>
                                            <td>
                                                unknown
                                            </td>
                                            <td style={lastTdWidth}>
                                                <Input type="text" name="0_parameter" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={firstTdWidth}>
                                                <AppSwitch checked size="sm" className={classnames('mx-1', 'vertical-middle')} variant={'pill'} color={'primary'}/>
                                            </td>
                                            <td>
                                                블록 1
                                            </td>
                                            <td>
                                                text
                                            </td>
                                            <td style={lastTdWidth}>
                                                <Input type="text" name="0_parameter" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={firstTdWidth}>
                                                <AppSwitch checked size="sm" className={classnames('mx-1', 'vertical-middle')} variant={'pill'} color={'primary'}/>
                                            </td>
                                            <td>
                                                블록 2
                                            </td>
                                            <td>
                                                button
                                            </td>
                                            <td style={lastTdWidth}>
                                                <Input type="text" name="1_parameter" />
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
                                    <Col xs="4"></Col>
                                </Row>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Parameter;