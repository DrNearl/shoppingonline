import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  componentDidMount() {
    const id = window.location.pathname.split('/')[2];

    axios.get('/api/customer/products/' + id)
      .then(res => {
        this.setState({ product: res.data });
      })
      .catch(err => {
        console.error(err);
        alert("Cannot load product");
      });
  }

  render() {
    const p = this.state.product;

    if (!p) return (<div>Loading...</div>);

    return (
      <div>

        <h2>{p.name}</h2>

        <img
          src={p.image
            ? "data:image/jpg;base64," + p.image
            : "/no-image.png"}
          width="300"
          alt={p.name}
        />

        <h3>${p.price}</h3>

        <p>{p.description}</p>

        <div>
          Quantity:
          <input
            type="number"
            min="1"
            value={this.state.txtQuantity}
            onChange={(e) =>
              this.setState({ txtQuantity: e.target.value })
            }
          />

          <button onClick={(e) => this.btnAdd2CartClick(e)}>
            ADD TO CART
          </button>
        </div>

      </div>
    );
  }

  btnAdd2CartClick(e) {
    const product = this.state.product;
    const quantity = this.state.txtQuantity;

    const item = {
      product: product,
      quantity: quantity
    };

    this.context.add2cart(item);
  }
}

export default ProductDetail;