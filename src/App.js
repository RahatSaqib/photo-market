import PhotoMarket from './abis/PhotoMarket.json'
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
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    let accountBalance = window.web3.utils.fromWei( await web3.eth.getBalance(accounts[0]))
      this.setState({accountBalance: accountBalance});
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = PhotoMarket.networks[networkId]
    if(networkData) {
      const photoMarket = new web3.eth.Contract(PhotoMarket.abi, networkData.address)
      this.setState({ photoMarket })
      const imagesCount = await photoMarket.methods.imageCount().call()
      this.setState({ imagesCount })
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await photoMarket.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }
      // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      this.setState({ loading: false})
    } else {
      window.alert('photoMarket contract not deployed to detected network.')
    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    this.setState({uploading : true})
    ipfs.add(this.state.buffer, (error, result) => {
      this.setState({uploading : false})
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.photoMarket.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.photoMarket.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      photoMarket: null,
      images: [],
      loading: true,
      accountBalance: 0,
      uploading: false
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
          { this.state.loading ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            : <Main
                images={this.state.images}
                captureFile={this.captureFile}
                uploadImage={this.uploadImage}
                tipImageOwner={this.tipImageOwner}
                uploading={this.state.uploading}
              />
          }
          
        </div>
  );}
}

export default App;
