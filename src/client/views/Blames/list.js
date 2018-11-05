import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const TableHeader = (props) => {
  const { thContent } = props;
  return (
    <thead>
      <tr> { thContent.map(item => (<th>{item}</th>)) } </tr>
    </thead>
  );
}

class Board extends Component {

  /*componentDidMount() {
    fetch('/api/blame/list')
      .then(res => res.json())
      .then(user => {
        console.log(user);
        // this.setState({ username: user.username })
      });
  }*/

  render() {
    const lastTdWidth = { width: '150px' };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Common-Board
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No. </th>
                    <th>API name</th>
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
                  <Col xs="1"><Button block size="sm" standard color="primary" tag="Link" to="/dashboard" >Add</Button></Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Board;
