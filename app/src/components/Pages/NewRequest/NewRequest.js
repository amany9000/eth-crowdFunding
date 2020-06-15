import React, { Component } from 'react';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
import { Row, Col, Divider } from 'antd';
import { Switch } from 'antd';
import {withRouter} from 'react-router-dom';

import { createRequest } from "../../../ethereum/campaigns";

const FormItem = Form.Item;


class NewRequest extends Component {
    constructor() {
        super();
        this.state = {
          formLayout: 'horizontal',
          address: '',
          description: '',
          value: ''
        };
    }
    
  submitRequest = () => {
    createRequest(this.props.location.address, this.state.description, parseInt(this.state.value), this.state.address, this.props.location.web3)
        .then( () => alert("Request Added"));
  }    
      
  render() {
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
            <Row type="flex" justify="center">
                <Col span={12}>
                    <br></br>
                    <h1 style={{display: "flex", justifyContent: "center"}}>Add a new Request</h1>
                    <Form layout={formLayout}>
                        <FormItem
                            label="Recipient"
                            {...formItemLayout}
                        >
                            <Input placeholder="Address" value={this.state.address} onChange={(event)=> this.setState({address: event.target.value})} />
                        </FormItem>
                        <FormItem
                            label="Description"
                            {...formItemLayout}
                        >
                            <TextArea rows={4} value={this.state.description} onChange={(event)=> this.setState({description: event.target.value})}/>
                        </FormItem>
                        <FormItem
                            label="Value (in Wei)"
                            {...formItemLayout}
                        >
                            <Input placeholder="Value of the request (in Wei)" value={this.state.value} onChange={(event)=> this.setState({value: event.target.value})} />
                        </FormItem>
                        <Form.Item {...{"wrapperCol": { "offset": 8, "span": 16 }}}>
                            <Button type="primary" htmlType="submit" onClick={() => this.submitRequest()}>
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
  }
}

export default withRouter(NewRequest);
