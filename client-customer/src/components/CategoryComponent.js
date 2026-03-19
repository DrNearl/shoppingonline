import axios from 'axios';
import React, { Component } from 'react';
import Product from './ProductComponent';

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {

    const cid = window.location.pathname.split('/')[2];

    axios.get('/api/customer/products/category/' + cid).then(res => {
      this.setState({ products: res.data });
    });

  }

  render() {
    return (
      <div>

        <h2>CATEGORY PRODUCTS</h2>

        <Product products={this.state.products}/>

      </div>
    );
  }

}

export default Category;
