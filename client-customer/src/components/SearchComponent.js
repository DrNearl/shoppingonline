import axios from 'axios';
import React, { Component } from 'react';
import Product from './ProductComponent';
import withRouter from '../utils/withRouter';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  // Chạy khi lần đầu tiên vào trang kết quả tìm kiếm
  componentDidMount() {
    const params = this.props.params;
    if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // Chạy khi bạn đang ở trang tìm kiếm và nhập từ khóa mới rồi ấn Search tiếp
  componentDidUpdate(prevProps) {
    const params = this.props.params;
    // Nếu từ khóa mới khác từ khóa cũ thì mới gọi API
    if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword)
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => {
        console.error("Lỗi tìm kiếm:", err);
      });
  }

  render() {
    return (
      <div className="text-center">
        <h2 className="text-center">SEARCH RESULTS</h2>
        <Product products={this.state.products} />
      </div>
    );
  }
}

export default withRouter(Search);