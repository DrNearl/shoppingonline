import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  btnSignupClick() {

    if (!this.state.txtUsername || !this.state.txtPassword) {
      alert("Username and password required");
      return;
    }

    const account = {
      username: this.state.txtUsername,
      password: this.state.txtPassword,
      name: this.state.txtName,
      phone: this.state.txtPhone,
      email: this.state.txtEmail
    };

    axios.post('/api/customer/signup', account)
      .then(res => {
        alert(res.data.message);

        this.setState({
          txtUsername: '',
          txtPassword: '',
          txtName: '',
          txtPhone: '',
          txtEmail: ''
        });

      })
      .catch(err => {
        console.error(err);
        alert("Signup failed");
      });

  }

  render() {
    return (
      <div>
        <h2>SIGNUP</h2>

        Username:
        <input type="text"
          value={this.state.txtUsername}
          onChange={(e) => this.setState({ txtUsername: e.target.value })}
        />

        <br />

        Password:
        <input type="password"
          value={this.state.txtPassword}
          onChange={(e) => this.setState({ txtPassword: e.target.value })}
        />

        <br />

        Name:
        <input type="text"
          value={this.state.txtName}
          onChange={(e) => this.setState({ txtName: e.target.value })}
        />

        <br />

        Phone:
        <input type="text"
          value={this.state.txtPhone}
          onChange={(e) => this.setState({ txtPhone: e.target.value })}
        />

        <br />

        Email:
        <input type="text"
          value={this.state.txtEmail}
          onChange={(e) => this.setState({ txtEmail: e.target.value })}
        />

        <br />

        <button onClick={() => this.btnSignupClick()}>
          SIGNUP
        </button>

      </div>
    );
  }
}

export default Signup;