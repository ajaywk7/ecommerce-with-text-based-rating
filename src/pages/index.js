import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {Container} from 'react-bootstrap';




class Index extends Component {
     

	state = {
        search : "",
        toSearch : false
	};
    
    onchange = (e) => this.setState({ [e.target.name]:e.target.value })


  

    searchFunction = async() =>{
       this.setState({
           toSearch:true
       })
    }
    
	render() {
        if(this.state.toSearch)
        {
            return (
                <Redirect to={{
                    pathname: '/search_result',
                    state: { search:this.state.search }
                }}
                 />
            )
        }

		return (
			<Container className="d-flex flex-row justify-content-center align-items-center" style={{height:600}} >
                    <div>
                    <img  src="./logomain.jpg" style={{height:250,objectFit:"cover",objectPosition:"center"}}  ></img>
                    <div className="d-flex justify-content-center w-100">
                    <input style={{width:300}} type="text" placeholder="Search.." onChange={this.onchange} name="search"/>
                    <button onClick={this.searchFunction}><img src="./search.ico"></img></button>
                    </div>
                    </div>
                    
            </Container>	
		);
		
	}
}


export default Index;