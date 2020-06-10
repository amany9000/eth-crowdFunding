import React, { Component } from 'react';
import Account from '../components/Pages/Account/Account';
import Campaign from '../components/Pages/Campaigns/Campaigns';

class Auth extends Component {
    constructor(props) {
        super();
        this.state = {
            web3: '',
          };
          this.handleWeb3 = this.handleWeb3.bind(this);
    }

    handleWeb3(value) {
        this.setState({
            web3: value
        });
    }
  render() {
    if(this.state.web3 === '') {
        return(
            <Account handleWeb3={this.handleWeb3} />
        );
    }
    else {
        return(
            <Campaign web3={this.state.web3} />
        );
    }
  }
}

export default Auth;
