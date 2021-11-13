import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

class Navbar extends Component{
    // var accountSplice  =  this.props.account.slice(0,4);

    render(){
        return(
            <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                <a className="mr-5 hover:text-gray-900 account">Account : {this.props.account.slice(0,5)}....{this.props.account.slice(-5)}</a>

                </nav>
                <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                <img src="/logo.png" style={{height:"50px",width:"50px",borderRadius:"20px"}}/>
                <span className="ml-3 text-xl headerTitle2" style ={{color :"black"}}>Photo <span className="text-xl headerTitle">Market</span></span>
                </a>
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                <a className="mr-5 hover:text-gray-900 account">Balance : {this.props.accountBalance}</a>

                </div>
            </div>
            </header>
        );
    }
}
export default Navbar;