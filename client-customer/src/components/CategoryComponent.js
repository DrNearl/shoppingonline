import axios from 'axios';
import React, { Component } from 'react';
import Product from './ProductComponent';
import withRouter from '../utils/withRouter';

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  // Chạy khi lần đầu tiên component được hiển thị
  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }
  }

  // Chạy khi người dùng bấm từ Category này sang Category khác (URL thay đổi)
  componentDidUpdate(prevProps) {
    const params = this.props.params;
    // Kiểm tra nếu ID trên URL hiện tại khác với ID ở lần render trước đó
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }
  }

  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid)
      .then((res) => {
        const result = res.data;
        this.setState({ products: result });
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm theo danh mục:", err);
      });
  }

  render() {
    return (
      <div className="text-center">
        <h2 className="text-center">LIST PRODUCTS</h2>
        <Product products={this.state.products} />
      </div>
    );
  }
}

export default withRouter(Category);