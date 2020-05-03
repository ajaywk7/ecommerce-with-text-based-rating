import React,{Component} from "react";
import {withRouter,Redirect} from 'react-router-dom';

import { Container ,Card,Col,Button } from "react-bootstrap";

class Product extends Component{
    state={
        image : "",
        name : "",
        price:"",
        data : "",
        rating:0,
        view_product:false
    }

    componentDidMount(){
      
        var data = this.props.data;
        console.log(data);
        var image = JSON.parse(data.image)[0];
        var name = data.product_name;
        this.setState({
            image:image,
            name :name,
            price:data.discounted_price,
            rating:data.rating
        });
    }

    onClick = () => {
        this.setState({
            view_product:true
        });
    }

    render(){
        if(this.state.view_product)
        {
            return (
                <Redirect to={{
                    pathname: '/view_product',
                    state:{ data: this.props.data}
                }}
                 />
            )
        }
        
        return (
            <Col sm={12} md={6} className="p-3" style={{height:400}} >
                <Card className=" h-100 w-100 pointer-cursor d-flex" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 10px 25px 0 rgba(0, 0, 0, 0.19)"}} >
                <Card.Img className="d-block ml-auto mr-auto" src={this.state.image} variant="top" style={{height:200,width:300,objectFit:"contain"}}  />
                <Container className="p-2 text-center" style={{height:50}} fluid>
                
                <Card.Body  >
                <Card.Title className=" font-alegreya font-weight-bold  text-dark">
                    {this.state.name.slice(1,100)} ...
                </Card.Title>
                    <h6 className="text-dark">RS : {this.state.price} | upvotes : {this.state.rating}</h6>
                <Button variant="primary" onClick={this.onClick}>View Product</Button>
                </Card.Body>
                </Container>
            </Card>   
            </Col>
        )
    }
}

export default withRouter(Product);