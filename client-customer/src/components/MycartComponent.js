import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';

class Mycart extends Component {

  static contextType = MyContext;

  total() {
  let sum = 0;
  this.context.mycart.forEach(item => {
    sum += item.price * item.quantity;
  });
  return sum;
  }

  render() {

    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>

          <td>
            <img
              src={"data:image/jpg;base64," + item.product.image}
              width="70px"
              height="70px"
              alt=""
            />
          </td>

          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>

          <td>
            <span
              className="link"
              onClick={() => this.lnkRemoveClick(item.product._id)}
            >
              Remove
            </span>
          </td>
        </tr>
      );
    });

    const total = CartUtil.getTotal(this.context.mycart);

    return (
      <div>

        <h2>MY CART</h2>

        <table border="1">

          <thead>
            <tr className="datatable">
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {mycart}

            <tr>
              <td colSpan="7" align="right">
                <b>Total</b>
              </td>

              <td colSpan="2">
                <b>{total}</b>
              </td>
            </tr>

          </tbody>

        </table>

        <br />

        <button onClick={() => this.btnCheckoutClick()}>
          CHECKOUT
        </button>

      </div>
    );
  }

  // remove item
  lnkRemoveClick(id) {

    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);

    if (index !== -1) {
      mycart.splice(index, 1);
      this.context.setMycart([...mycart]);
    }

  }

  // checkout button
  btnCheckoutClick() {
    if (this.context.mycart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (window.confirm("Are you sure to checkout?")) {
      const total = CartUtil.getTotal(this.context.mycart); // Dùng lại CartUtil cho chuẩn xác
      const items = this.context.mycart;
      const customer = this.context.customer;

      // Truyền trực tiếp các tham số này vào hàm apiCheckout
      this.apiCheckout(total, items, customer); 
    }
  }

  // call API
  apiCheckout(total, items, customer) {
    const body = {
      customer: customer,
      items: items,
      total: total
    };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.context.token
      },
      body: JSON.stringify(body)
    };

    // SỬA LỖI: Thêm /api vào đường dẫn
    fetch('/api/customer/orders', config) 
      .then(res => res.json())
      .then(result => {
        if (result && result.success) { // Nên check thêm result.success dựa vào backend của bạn
          alert("Checkout success!");
          this.context.setMycart([]);
        } else {
          alert("Checkout failed: " + (result.message || "Unknown error"));
        }
      })
      .catch(err => {
        console.error("Checkout error: ", err);
        alert("Có lỗi xảy ra khi checkout!");
      });
  }

}

export default Mycart;