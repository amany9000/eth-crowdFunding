import React, { Component } from 'react';

import Web3 from 'web3';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
import { Row, Col, Divider } from 'antd';
import { Switch } from 'antd';
import { Card, InputNumber } from 'antd';
import reqwest from 'reqwest';
import { List, Avatar, Spin, Menu, Icon } from 'antd';

import {
  Link,
  withRouter
} from 'react-router-dom'

import {getReqDetails, finalizeRequest, approveRequest} from "../../../ethereum/campaigns";

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const FormItem = Form.Item;

function onChange(value) {
}

class About extends Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        request: null,
        value: '',
        web3 : '',
        balance : 0
      }

      componentDidMount() {
        if (window.ethereum){
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
          this.setState({web3 : this.props.location.web3 ? this.props.location.web3 : window.web3}, () => {
            getReqDetails(this.props.match.params.campaignId,this.props.match.params.requestId, this.state.web3).then((some) => {
              console.log("aboutReeeeq", some)
              this.setState({
                request: some,
                loading: false
              });
            })
          });

          window.web3.eth.getBalance(this.props.match.params.campaignId, (err, result) => {
            this.setState({balance : window.web3.utils.fromWei(result,'finney')})
          })
        }
      }

      getData = (callback) => {
        reqwest({
          url: fakeDataUrl,
          type: 'json',
          method: 'get',
          contentType: 'application/json',
          success: (res) => {
            callback(res);
          },
        });
      }
      onLoadMore = () => {
        this.setState({
          loadingMore: true,
        });
        this.getData((res) => {
          const data = this.state.data.concat(res.results);
          this.setState({
            data,
            loadingMore: false,
          }, () => {
            window.dispatchEvent(new Event('resize'));
          });
        });
      }
    constructor() {
        super();
        this.state = {
          formLayout: 'horizontal',
        };
      }
      
  render() {
    const { loading, loadingMore, showLoadingMore, data, request } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    const { TextArea } = Input;
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 6 },
    } : null;
    return (
        <div>
            <h1 style={{display: "flex", justifyContent: "center", fontSize: "40px"}}>{this.state.request ? this.state.request.requestDescription : "Request Details"}</h1>
            <div style={{ background: '#ECECEC', padding: '30px' }}>

            <Row type="flex" justify="center">
                <Col span={6} push={18}>
                    <Form layout={formLayout}>
                        <FormItem {...buttonItemLayout}>
                            <Button type="success" onClick={()=> approveRequest(this.props.match.params.campaignId, this.props.match.params.requestId, this.state.web3).then(() => alert("Request Approved"))}>Approve</Button>
                        </FormItem>
                        <FormItem {...buttonItemLayout}>
                            <Button type="primary" onClick={()=> {
                              if(parseInt(this.state.request.value) <= parseInt(this.state.balance))
                                finalizeRequest(this.props.match.params.campaignId, this.props.match.params.requestId, this.state.web3).then(() => alert("Request Finalized"))
                              else
                               alert("Request's value is more than contract balance");
                            }
                            }>Finalize</Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={16} pull={4}>
                        {request?
                        <div>
                    <h2><strong>{`${request.value} Finney`}</strong></h2>
                    <p><strong>Reciepient:</strong> {request.recipient}</p>
                    <p><strong>Total Approvals:</strong> {request.approvalCount}</p>
                    <p><strong>Completed:</strong> {request.complete?"Yes":"No"}</p>
                    </div>
                        :
                        null}
                </Col>
            </Row>
        </div>
        </div>
    );
  }
}


export default withRouter(About);
