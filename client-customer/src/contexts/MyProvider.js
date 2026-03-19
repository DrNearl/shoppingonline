import React, { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: '',
      customer: null,
      mycart: []
    };
  }

  // ===== AUTH =====

  setToken = (token) => {
    this.setState({ token: token });
  }

  setCustomer = (customer) => {
    this.setState({ customer: customer });
  }

  // ===== CART =====

  setMycart = (mycart) => {
    this.setState({ mycart: mycart });
  }

  add2cart = (item) => {

    const mycart = [...this.state.mycart];

    const index = mycart.findIndex(
      x => x.product._id === item.product._id
    );

    if (index === -1) {
      mycart.push(item);
    }
    else {
      mycart[index].quantity =
        parseInt(mycart[index].quantity) + parseInt(item.quantity);
    }

    this.setState({ mycart: mycart });
  }

  render() {

    const value = {

      token: this.state.token,
      customer: this.state.customer,
      mycart: this.state.mycart,

      setToken: this.setToken,
      setCustomer: this.setCustomer,
      setMycart: this.setMycart,  

      add2cart: this.add2cart
    };

    return (
      <MyContext.Provider value={value}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;