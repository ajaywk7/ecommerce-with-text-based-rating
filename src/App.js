import React, { Component } from 'react';
import {Nav,Navbar, Container } from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,withRouter} from 'react-router-dom';
import './App.css';


import Index from './pages/index';
import Searchresult from './pages/search_result';
import Viewproduct from './pages/view_product';





class App extends Component {
    
	render() {
		return (
            <Container className="p-0" fluid>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand className="text-left" href="/">EasyBuy</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse className="d-flex justify-content-end align-items-end" id="responsive-navbar-nav">
             <div >
             <Nav >
                <Nav.Link href="/">Products</Nav.Link>
                <Nav.Link eventKey={2} href="/">
                  About us
                </Nav.Link>
              </Nav>
             </div>
              
              </Navbar.Collapse>
            </Container>
             
          </Navbar>
          
           <Router>
             <Switch>
               <Route exact path="/" > <Index/> </Route>
               <Route exact path="/search_result" location={this.props.location} > <Searchresult /> </Route>
               <Route exact path="/view_product"  location={this.props.location}  > <Viewproduct /></Route>

             </Switch>
           </Router>
           </Container>
			
		);
		
	}
}


export default App;