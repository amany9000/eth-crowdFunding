import React, { Component } from 'react';
import '../../../App.css';
import { List, Avatar, Button, Spin, Menu, Card } from 'antd';
import { Row, Col } from 'antd';
import { FacebookOutlined, YoutubeOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

class ContactUs extends Component {
  render() {
    return (
      <div align="center" style={{ background: '#ECECEC', padding: '30px' }}>
        <Card>
            <h1 style={{fontSize: "50px"}}>Contact Us</h1>
            <h3>
              <b>Phone Number :</b> 6394130795
            </h3>
            <h3>
            <b>Email :</b> amanyadavlko2502@gmal.com
            </h3>
                <FacebookOutlined style={{ fontSize: '32px', color: 'blue', margin: '20px' }}/>
                <YoutubeOutlined style={{ fontSize: '32px', color: 'red', margin: '20px' }}/>
                <TwitterOutlined style={{ fontSize: '32px', color: '#08c', margin: '20px' }}/>
                <InstagramOutlined style={{ fontSize: '32px', color: 'pink', margin: '20px' }}/>
            </Card>
      </div>
    );
  }
}


export default ContactUs;
