import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Container,Row} from "react-bootstrap";
import Product from "../components/product";


class Searchresult extends Component {
    state = {
        search :"",
        result :""
    }

    product =(data) => {
        var image = JSON.parse(data.image)[0];
        return (
       
                <Product data={data} />
        )
    }

    noResults = () => {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{height:600}}>
                <h1 className="text-center">No Results Found :(</h1>
            </Container>
        )
    }

    searchFunction = async(e) => {
        const response = await fetch("http://127.0.0.1:5000/", { 
                  method: "POST", 
                  body: JSON.stringify({ 
                        search: this.state.search
                }), 
                headers: { 
                "Content-type": "application/json; charset=UTF-8"
                } 
        }) 
        const data =await response.json();
        return data.result;

    }

    async componentDidMount(){
        await this.setState({
            search: this.props.location.state.search
        });
        var data =await this.searchFunction();
        var result =  this.noResults();
        if (data.length!=0  )
        {
            var result =await data.map(this.product);
        }
        await this.setState({
            result:result
        });
    }
    
	render() {
		return (
           <div>
               <Container>
                    <Row className="p-5">
                        {this.state.result}
                    </Row>
               </Container>
               
           </div>
        )
	}
}


export default withRouter(Searchresult);