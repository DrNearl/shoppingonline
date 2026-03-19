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
          <img src={"data:image/jpg;base64," + item.image} width="200" />
        </Link>
        <figcaption>{item.name}</figcaption>
        <p>${item.price}</p>
      </figure>
    ));

    const hotprods = this.state.hotprods.map((item) => (
      <figure key={item._id}>
        <Link to={"/product/" + item._id}>
          <img src={"data:image/jpg;base64," + item.image} width="200" />
        </Link>
        <figcaption>{item.name}</figcaption>
        <p>${item.price}</p>
      </figure>
    ));

    return (
      <div>

        <h2>NEW PRODUCTS</h2>
        <div className="row">
          {newprods}
        </div>

        <h2>HOT PRODUCTS</h2>
        <div className="row">
          {hotprods}
        </div>

      </div>
    );
  }
}

export default Home;
