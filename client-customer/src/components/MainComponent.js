import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { Component } from 'react';

import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import ProductDetail from './ProductDetailComponent';
import Category from './CategoryComponent';
import Search from './SearchComponent';
import Mycart from './MycartComponent';
import Myprofile from './MyprofileComponent';
import Myorders from './MyordersComponent';

import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';

class Main extends Component {

  render() {
    return (
      <Router>

        <div className="body-customer">

          <Menu />
          <Inform />

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/product/:id" element={<ProductDetail />} />

            <Route path="/product/category/:cid" element={<Category />} />
            
            <Route path="/product/search/:keyword" element={<Search />} /> 

            <Route path="/mycart" element={<Mycart />} />
            
            <Route path="/myprofile" element={<Myprofile />} />

            <Route path="/myorders" element={<Myorders />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/active" element={<Active />} />

            <Route path="/login" element={<Login />} />

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>

        </div>

      </Router>
    );
  }
}

export default Main;