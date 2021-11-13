import React,{ Component} from "react";
import Identicon from 'identicon.js';

class Main extends Component{
    render()
    {
        return(
            
            <section className="text-gray-600 body-font">
    
            <div className="container px-5 py-24 mx-auto">
                <form className="md:w-1/2 flex form-control"  onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.imageDescription.value
                    this.props.uploadImage(description)
                }} >
                    <div className="relative mb-4 flex">
                    <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                    </div>
                <div className="relative mb-4">
                        
                        <textarea id="imageDescription"
                            type="text"
                            ref={(input) => { this.imageDescription = input }}
                            placeholder="Image description..."
                            required
                            className="form-control w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                {this.props.uploading ?
                <button type="submit" class="btn btn-block btn-lg" style={{background:"white",color:"gray"}} disabled>Uploading!</button>
            :<button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>}
                
                </div>
                
                </form>
                <div className="flex-wrap -m-4">
                { this.props.images.slice(0).reverse().map((image, key) => {
                return(
                    <div className="p-4 md:w-1/2" style={{margin:"0 auto"}}>
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <div className="p-6 flex">
                    <img
                        className='mr-2'
                        width='30'
                        height='30'
                        style={{borderRadius:"40px"}}
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                      />
                      {image.author}
                    </div>
                    <img className=" w-full object-cover object-center" src={`https://ipfs.infura.io/ipfs/${image.hash}`} alt="blog"/>
                    <div className="p-6">
                        <div className="flex items-center flex-wrap" style={{borderBottom: "1px solid #dbdbdb6e" ,marginBottom: "20px"}}>
                            <p className="leading-relaxed mb-3">{image.description}</p> 

                        </div>
                        <div className="flex items-center flex-wrap ">
                        <button 
                            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 btn-primary"
                            name={image.id}
                            style={{backgroundColor: "#2d9167"}}
                            onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipImageOwner(event.target.name, tipAmount)
                          }}>Give 0.1 ETH
                                        <img className='ml-2'
                        width='20'
                        height='20'
                        style={{borderRadius:"40px"}}
                        src ="/eth.png"/>
                        </button>
                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <img className='mr-2'
                        width='20'
                        height='20'
                        style={{borderRadius:"40px"}}
                        src ="/eth.png"/>
                            {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </span>

                        </div>
                    </div>
                    </div>
                </div>
                )}
                )}

    
                </div>
            </div>

        </section>
    );
}


}
export default Main;