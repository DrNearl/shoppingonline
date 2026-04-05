import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  componentDidMount() {
    axios.get('/api/customer/products/new').then(res => {
      this.setState({ newprods: res.data });
    });

    axios.get('/api/customer/products/hot').then(res => {
      this.setState({ hotprods: res.data });
    });
  }

  render() {

    const newprods = this.state.newprods.map((item) => (
      <figure key={item._id}>
        <Link to={"/product/" + item._id}>
          {/* Cố định kích thước ảnh để các ô sản phẩm đều nhau */}
          <img src={"data:image/jpg;base64," + item.image} width="200" height="200" alt="product" style={{ objectFit: 'cover' }} />
        </Link>
        <figcaption className="text-center"><b>{item.name}</b></figcaption>
        <figcaption className="text-center">${item.price}</figcaption>
      </figure>
    ));

    const hotprods = this.state.hotprods.map((item) => (
      <figure key={item._id}>
        <Link to={"/product/" + item._id}>
          <img src={"data:image/jpg;base64," + item.image} width="200" height="200" alt="product" style={{ objectFit: 'cover' }} />
        </Link>
        <figcaption className="text-center"><b>{item.name}</b></figcaption>
        <figcaption className="text-center">${item.price}</figcaption>
      </figure>
    ));

    return (
      <div className="align-center">
        <h2 className="text-center">NEW PRODUCTS</h2>
        {/* Sử dụng product-container để dàn sản phẩm theo chiều ngang */}
        <div className="product-container">
          {newprods}
        </div>

        <h2 className="text-center">HOT PRODUCTS</h2>
        <div className="product-container">
          {hotprods}
        </div>
      </div>
    );
  }
}

export default Home;