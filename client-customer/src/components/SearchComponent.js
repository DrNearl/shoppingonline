import axios from 'axios';
import React, { Component } from 'react';
import Product from './ProductComponent';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true
    };
  }

  componentDidMount() {

    const keyword = window.location.pathname.split('/')[2];

    axios.get('/api/customer/products/search/' + keyword)
      .then(res => {
        this.setState({
          products: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        alert("Search failed");
      });

  }

  render() {

    if (this.state.loading)
      return <div>Loading...</div>;

    return (
      <div>

        <h2>SEARCH RESULTS</h2>

        <Product products={this.state.products}/>

      </div>
    );
  }

}

export default Search;