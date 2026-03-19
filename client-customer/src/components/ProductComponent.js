import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {

  render() {

    const prods = this.props.products.map((item) => (

      <div key={item._id} className="inline">

        <figure>

          <Link to={"/product/" + item._id}>
            <img
              src={item.image
                ? "data:image/jpg;base64," + item.image
                : "/no-image.png"}
              width="100"
              height="100"
              alt={item.name}
            />
          </Link>

          <figcaption>
            {item.name}
            <br/>
            {item.price}
          </figcaption>

        </figure>

      </div>
    ));

    return (
      <div>
        {prods}
      </div>
    );
  }

}

export default Product;