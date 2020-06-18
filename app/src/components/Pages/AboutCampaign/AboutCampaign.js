import React, { Component } from 'react';
import '../../../App.css';
import Web3 from 'web3';
import { Form, Input, Button} from 'antd';
import {Row, Col, Divider} from 'antd';
import { Switch, Space } from 'antd';
import { Card, InputNumber } from 'antd';
import reqwest from 'reqwest';
import { List, Avatar, Spin, Menu, Icon } from 'antd';
import {
  Link,
  withRouter
} from 'react-router-dom'
import {getCampaignDetails, contribute} from '../../../ethereum/campaigns';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const FormItem = Form.Item;
  
class About extends Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        campaign: null,
        approver : false,
        finVal : 5,
        web3 : '',
        balance : 0
      }

      sendVal = () => {
        contribute(this.props.match.params.campaignId, this.state.finVal ,this.state.web3)
          .then(() => alert("Contribution Made, thank you!!!!!"))
      }

    componentDidMount() {
      if (window.ethereum){
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();

        this.setState({web3 : this.props.location.web3 ? this.props.location.web3 : window.web3}, () => {
          getCampaignDetails(this.props.match.params.campaignId, this.state.web3).then((some) => {
            this.setState({
              campaign: some,
              loading: false,
              finVal : some.minContribution
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
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
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
    const { loading, loadingMore, showLoadingMore, data, campaign } = this.state;
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
          <Row style={{paddingBottom: 0}}>
            <Col span={10} offset={1}>
              <h1 style={{ justifyContent: "center", fontSize: "40px"}}>{this.state.campaign ? this.state.campaign.name : "Loading...."}</h1>
            </Col>
            <Col span={6} offset={7} style={{ justifyContent: "center", paddingTop: 20 }}>
              <Button style={{display: "flex", background : "#13c2c2", color : "#1f1f1f", marginLeft: 124}} 
                onClick={() => this.props.history.push({ pathname: `/add/request/${this.props.match.params.campaignId}`, web3 : this.state.web3})}>
                  Add Request
              </Button>
            </Col>
          </Row>
            
            <div style={{ background: '#ECECEC', padding: '10px' }}>

            <Row type="flex" justify="center">
                <Col span={6} push={18}>
                    <Form layout={formLayout} className="pt-5">
                        <FormItem
                            label="Contribute"
                            {...formItemLayout}
                            onChange={(evt)=> this.setState({finVal : evt.target.value})}
                        >
                        <InputNumber min={0} value={this.state.finVal}/>
                        </FormItem>
                        <FormItem {...buttonItemLayout}>
                            <Button type="primary" onClick={()=> this.sendVal()} >Contribute</Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={16} pull={4}>
                    {
                      campaign?
                      <div>
                        <h2>{campaign.description}</h2>
                        <p><b>Manager:</b> {campaign.manager}</p>
                        <p><b>Min. Contribution:</b> {`${campaign.minContribution} Finney`}</p>
                        <p><b>Campaign's Approver Count:</b> {`${campaign.approversCount}`}</p>
                        <p><b>Accoutn Balance:</b> {`${this.state.balance} Finney`}</p>
                        <br /> <br />
                        <h1>Request List</h1>
                        <List
                            className="demo-loadmore-list"
                            loading={loading}
                            itemLayout="horizontal"
                            loadMore={loadMore}
                            dataSource={this.state.campaign.reqList}
                            renderItem={(item, index) => (
                            <List.Item>
                            {/* <List.Item actions={[<a>edit</a>, <a>more</a>]}> */}
                                <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a 
                                  onClick={() => this.props.history.push({ pathname: `/requests/${this.props.match.params.campaignId}/${this.state.campaign.reqList.length - index - 1}`, web3 : this.state.web3})}                  
                                  >{item.requestDescription}</a>}
                                description={`To: ${item.recipient}`}
                                />
                                <div><h4>Requested value={`${item.value} Finney`}</h4></div>
                            </List.Item>
                            )}
                        />
                      </div>
                    :
                    null
                    }
                </Col>
            </Row>
        </div>
        {/* <Row type="flex" justify="center">
            <span style={{fontSize: "40px", marginTop: "16px"}}>Contributors</span>
            <Divider ></Divider>
            <Col xs={20} sm={16} md={12} lg={18} xl={12}>
                <List
                    className="demo-loadmore-list"
                    loading={loading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={this.state.campaign.reqDetailList}
                    renderItem={item => (
                    <List.Item>
                    {/* <List.Item actions={[<a>edit</a>, <a>more</a>]}> 
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={item.address}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </List.Item>
                    )}
                />
            </Col>
        </Row> */}


        </div>
    );
  }
}


export default withRouter(About);
