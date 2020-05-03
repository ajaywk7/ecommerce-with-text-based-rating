import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Container,Row,Col,Image,Button} from "react-bootstrap";


class Viewproduct extends Component {
    state = {
        id :"",
        image : "",
        name : "",
        price:"",
        data : "",
        description:"",
        bought:"",
        bought_value:"",
        comment:"",
        rating : 0
    }

    updation = async() => {
        const response = await fetch("http://127.0.0.1:5000/getone", { 
            method: "POST", 
            body: JSON.stringify({ 
                  id : this.state.id
          }), 
          headers: { 
          "Content-type": "application/json; charset=UTF-8"
          } 
        }); 
        const data =await response.json();
        var bought = data.result.bought;
        var bought_value = "";
        if(bought)
        {
            bought_value = "you have bough this product !";
        }
        this.setState({
            bought:!bought,
            bought_value:bought_value,
            rating:data.result.rating,
            comment:""
        })
    }

    

    async componentDidMount(){
        var data = this.props.location.state.data;
        console.log(data);
        var image = JSON.parse(data.image)[0];
        var name = data.product_name;
        var bought = data.bought;
        var description = data.description;
        var bought_value = "";
        var rating = data.rating;
        if(bought)
        {
            bought_value = "you have bough this product !";
        }
        await this.setState({
            id:data.uniq_id,
            image:image,
            name :name,
            description:description,
            price:data.discounted_price,
            bought:!bought,
            bought_value:bought_value,
            rating:rating
        });
        this.updation();
    }
    
    onChange = (e) => {
        this.setState(
            {
                comment:e.target.value
            }
        )
    }

    buy = async() => {
        const response = await fetch("http://127.0.0.1:5000/buy", { 
                  method: "POST", 
                  body: JSON.stringify({ 
                        id: this.state.id
                }), 
                headers: { 
                "Content-type": "application/json; charset=UTF-8"
                } 
        });
        this.updation();
    }

    addComment = async() => {
        const response = await fetch("http://127.0.0.1:5000/comment", { 
                  method: "POST", 
                  body: JSON.stringify({ 
                        id: this.state.id,
                        comment:this.state.comment
                }), 
                headers: { 
                "Content-type": "application/json; charset=UTF-8"
                } 
        });
        this.updation();
        
    }

	render() {
		return (
           <div>
               <Container>
               <br/><br/>

               <h1 className="display-4 text-center font-weight-bold text-dark">{this.state.name}</h1>
                     <br/>
                    <Row>
                        <Col sm={12} md={6}>
                        <Image className=" d-block ml-auto mr-auto" src={this.state.image} style={{height:400,width:500,objectFit:"contain"}}/>

                        </Col>
                        <Col className="d-flex flex-row justify-content-center align-items-center" sm={12} md={6}>
                        <div>
                        <h1 className="display-5 text-center font-weight-bold text-dark">RS : {this.state.price} </h1>
                        <h1 className="display-5 text-center font-weight-bold text-dark">rated : {this.state.rating}</h1>
                        <br/>
                        <Button variant="primary" className="w-100" onClick={this.buy}>Buy Now</Button> <br/>
                        {this.state.bought_value}
                        </div>
                        

                        </Col>
                    </Row>
                    <br/>
                   
                     <Row>
                        <Col sm={12} md={6}>
                            <p>{this.state.description}</p>
                        </Col>
                        <Col className="d-flex justify-content-center pt-10" sm={12} md={6}>
                        <div>
                        add review:
                        <br/>
                        <textarea width="p-3 " disabled={this.state.bought} onChange={this.onChange} value={this.state.comment} style={{width:"400px",height:100}} />

                        <Button variant="primary" className="" disabled={this.state.bought} style={{width:"400px"}} onClick={this.addComment}>Submit</Button>
                        </div>
                        

                        </Col>
                    </Row>
                    
               </Container>
               
           </div>
        )
	}
}


export default withRouter(Viewproduct);