import PhotoMarket from '../abis/PhotoMarket.json'
import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Navbar from './components/Navbar'
import Main from './components/Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      decentragram: null,
      images: [],
      loading: true,
      accountBalance: 0
    }

    this.uploadImage = this.uploadImage.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render(){
      return (
        <div className="App">
          <Navbar account = {this.state.account}
                  accountBalance = {this.state.accountBalance}/>
        </div>
  );}
}

export default App;
