import React, { Component } from 'react';
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
import {getCampaignDetails, contribute} from '../../../ethereum/campaigns';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const FormItem = Form.Item;

function onChange(value) {
    console.log('changed', value);
}
  
class About extends Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        campaign: null,
        approver : false,
        finVal : 5
      }

      sendVal = () => {
        contribute(this.props.match.params.campaignId, this.state.finVal ,this.props.location.web3)
          .then(() => alert("Contribution Made, thank you!!!!!"))
      }

      componentDidMount() {
        this.getData((res) => {
          this.setState({
            data: res.results,
            finVal : 5
          });
        });

        getCampaignDetails(this.props.match.params.campaignId, this.props.location.web3).then((some) => {
          this.setState({
            campaign: some,
            loading: false,
          });
        })
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
            <h1 style={{display: "flex", justifyContent: "center", fontSize: "50px"}}>About</h1>
            <div style={{ background: '#ECECEC', padding: '30px' }}>

            <Row type="flex" justify="center">
                <Col span={6} push={18}>
                    <Form layout={formLayout}>
                        <FormItem {...buttonItemLayout}>
                            <Switch checkedChildren="Approver" unCheckedChildren="Not Approver"/>

                        </FormItem>
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
                        <h2>{this.props.match.params.campaignId}</h2>
                        <h2>{campaign.campaignDesc}</h2>
                        <p><b>Founder:</b> {campaign.creatorName}</p>
                        <p><b>Contact:</b> {campaign.creatorContact}</p>
                        <br /> <br />
                        <h1>Request List</h1>
                        <List
                            className="demo-loadmore-list"
                            loading={loading}
                            itemLayout="horizontal"
                            loadMore={loadMore}
                            dataSource={this.state.campaign.reqDetailList}
                            renderItem={(item, index) => (
                            <List.Item>
                            {/* <List.Item actions={[<a>edit</a>, <a>more</a>]}> */}
                                <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a 
                                  onClick={() => this.props.history.push({ pathname: `/requests/${item.address}/${index}`, web3 : this.props.location.web3})}                  
                                  >{item.address}</a>}
                                  description={item.description}
                                />
                                <div><h4>Requested value={item.value}</h4></div>
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
