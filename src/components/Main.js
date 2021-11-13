import React,{ Component} from "react";
import Identicon from 'identicon.js';

class Main extends Component{
    render()
    {
        return(
            
            <section className="text-gray-600 body-font">
    
            <div className="container px-5 py-24 mx-auto">
                <form className="md:w-1/2" style={{margin:"0 auto"}} onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.imageDescription.value
                    this.props.uploadImage(description)
                }} >
                <div className="relative mb-4">
                        <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                        <textarea id="imageDescription"
                            type="text"
                            ref={(input) => { this.imageDescription = input }}
                            placeholder="Image description..."
                            required
                            className="form-control w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
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
                        style={{borderRadius:"30px"}}
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                      />
                      {image.author}
                    </div>
                    <img className=" w-full object-cover object-center" src={`https://ipfs.infura.io/ipfs/${image.hash}`} alt="blog"/>
                    <div className="p-6">
                        
                        <p className="leading-relaxed mb-3">{image.description}</p> 
                        <div className="flex items-center flex-wrap ">
                        <button 
                            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                            name={image.id}
                            onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipImageOwner(event.target.name, tipAmount)
                          }}>Give Tips 0.1 ETH
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                            </svg>{window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
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