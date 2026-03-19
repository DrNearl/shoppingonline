import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {

  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null // Thêm state này để lưu đơn hàng đang được chọn xem chi tiết
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  // ===== EVENT HANDLERS =====
  trItemClick(item) {
    this.setState({ order: item });
  }

  // ===== APIS =====
  apiGetOrdersByCustID(cid) {
    fetch("/api/customer/orders/" + cid, {
      headers: {
        "x-access-token": this.context.token
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ orders: data });
      });
  }

  render() {
    // 1. Render danh sách các đơn hàng
    const orders = this.state.orders.map((item, index) => {
      return (
        // Thêm sự kiện onClick để chọn đơn hàng
        <tr key={item._id} onClick={() => this.trItemClick(item)} style={{ cursor: 'pointer' }}>
          <td>{index + 1}</td>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.total}</td>
        </tr>
      );
    });

    // 2. Render chi tiết các sản phẩm của đơn hàng được chọn
    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id}>
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
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
          </tr>
        );
      });
    }

    return (
      <div>
        <h2>MY ORDERS</h2>
        <table border="1">
          <thead>
            <tr>
              <th>No.</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders}
          </tbody>
        </table>

        {/* BẢNG CHI TIẾT ĐƠN HÀNG - Chỉ hiển thị khi có đơn hàng được chọn */}
        {this.state.order ? (
          <div>
            <hr />
            <h2>ORDER DETAIL</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Prod. ID</th>
                  <th>Prod. name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </table>
          </div>
        ) : <div />}

      </div>
    );
  }
}

export default Myorders;