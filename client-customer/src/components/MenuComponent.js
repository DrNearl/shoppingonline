import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter'; // Thêm import này

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu">
          {/* Sửa URL: thêm /product/ trước category */}
          <Link to={"/product/category/" + item._id}>
            {item.name}
          </Link>
        </li>
      );
    });

    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu">
              <Link to="/">Home</Link>
            </li>
            {cates}
          </ul>
        </div>

        <div className="float-right">
          <form className="search" onSubmit={(e) => this.search(e)}>
            <input
              type="search"
              placeholder="Enter keyword"
              className="keyword"
              ref={(c) => this.txtKeyword = c}
            />
            <input type="submit" value="SEARCH" />
          </form>
        </div>
        <div className="float-clear"></div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get('/api/customer/categories')
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  search(e) {
    e.preventDefault();
    const keyword = this.txtKeyword.value;
    // Dùng navigate thay vì window.location và sửa đúng URL
    this.props.navigate("/product/search/" + keyword);
  }

}

// Nhớ bọc withRouter ở đây
export default withRouter(Menu);