import React, { Component } from 'react';

import Web3 from 'web3';
import '../../../App.css';
import { Form, Input, Button} from 'antd';
import { Row, Col, Divider } from 'antd';
import { Switch } from 'antd';
import {withRouter} from 'react-router-dom';

import {createCampaign} from '../../../ethereum/store';

const FormItem = Form.Item;

class AddCampaign extends Component {
    constructor() {
        super();
        this.state = {
          formLayout: 'horizontal',
          name: '',
          description: '',
          minContribution:'',
          web3 : ''
        };
      }

    componentDidMount() {
        if (window.ethereum){
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            this.setState({web3 : this.props.location.web3 ? this.props.location.web3 : window.web3});
        }
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
                    <h1 style={{display: "flex", justifyContent: "center"}}>Add new Campaign</h1>
                    <Form layout={formLayout}>
                        <FormItem
                            label="Campaign Name"
                            {...formItemLayout}
                        >
                            <Input placeholder="Name of Campaign" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}/>
                        </FormItem>
                        <FormItem
                            label="Description"
                            {...formItemLayout}
                        >
                            <TextArea rows={4} value={this.state.description} onChange={(event) => this.setState({description: event.target.value})}/>
                        </FormItem>
                        <FormItem
                            label="Min. Contribution"
                            {...formItemLayout}
                        >
                            <Input placeholder="Minimum Contribution in Finney" value={this.state.minContribution} onChange={(event) => this.setState({minContribution: event.target.value})}/>
                        </FormItem>
                        <FormItem {...buttonItemLayout}>
                            <Button type="primary" onClick={()=> createCampaign(this.state.name, this.state.description, parseInt(this.state.minContribution), this.state.web3).then((res) => {
                                alert("Congrats, new Campaign Added!")})}>Submit</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
  }
}

export default withRouter(AddCampaign);
