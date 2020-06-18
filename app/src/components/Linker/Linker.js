import React, { Component } from 'react';
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import { List, Avatar, Button, Spin, Menu} from 'antd';
import { FacebookOutlined, YoutubeOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

import Campaigns from '../Pages/Campaigns/Campaigns.js';
import AddCampaign from "../Pages/AddCampaign/AddCampaign.js";
import AboutCampaign from "../Pages/AboutCampaign/AboutCampaign.js";
import RequestList from '../Pages/RequestList/RequestList.js';
import NewRequest from '../Pages/NewRequest/NewRequest.js';
import AboutRequest from '../Pages/AboutRequest/AboutRequest.js';
import Home from '../Pages/Home/Home.js';
import AboutUs from '../Pages/AboutUs/AboutUs.js';
import ContactUs from '../Pages/Contactus/Contactus.js';
import Account from '../Pages/Account/Account.js';
import Auth from '../../container/auth';

class Linker extends Component {
  render() {
    return (
        <Router>
        <div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={"1"}
                style={{ lineHeight: '64px' }}
                breakpoint="lg"
                collapsedWidth="0"
            >
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/contribute">Contribute</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/aboutus">About Us</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/contactus">Contact Us</Link></Menu.Item>
                <span style={{
                    marginRight: '20px',
                    float: 'right'
                }} >
                <FacebookOutlined style={{ fontSize: '20px', color: 'blue', margin: '10px' }}/>
                <YoutubeOutlined style={{ fontSize: '20px', color: 'red', margin: '10px' }}/>
                <TwitterOutlined style={{ fontSize: '20px', color: '#08c', margin: '10px' }}/>
                <InstagramOutlined style={{ fontSize: '20px', color: 'pink', margin: '10px' }}/>
                </span>
            </Menu>
          <Switch>  
            <Route exact path="/" component={Home}/>
            <Route exact path="/account" component={Account}/>
            <Route exact path="/contribute" component={Auth}/>
            <Route exact path="/campaigns" component={Campaigns}/>
            <Route exact path="/add/campaign/"  component={AddCampaign} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/campaigns/:campaignId" component={AboutCampaign} />
            <Route exact path="/requests" component={RequestList} />
            <Route exact path="/add/request/:campaignId"  component={NewRequest} />
            <Route exact path="/requests/:campaignId/:requestId" component={AboutRequest} />
            <Route component={Home} />    
          </Switch>      
        </div>
    </Router>
    );
  }
}

export default Linker;
