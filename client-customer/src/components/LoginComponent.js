import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

function Login() {

  const navigate = useNavigate();
  const context = useContext(MyContext);

  const [txtUsername, setUsername] = useState('user');
  const [txtPassword, setPassword] = useState('123');

  const btnLoginClick = (e) => {
    e.preventDefault();

    if (txtUsername && txtPassword) {

      const account = {
        username: txtUsername,
        password: txtPassword
      };

      axios.post('/api/customer/login', account).then(res => {

        const result = res.data;

        if (result.success === true) {

          context.setToken(result.token);
          context.setCustomer(result.customer);

          navigate('/');

        } else {
          alert(result.message);
        }

      });

    } else {
      alert('Please input username and password');
    }
  };

  return (
    <div className="align-center">
      <h2 className="text-center">CUSTOMER LOGIN</h2>

      <form>
        <table className="align-center">
          <tbody>

            <tr>
              <td>Username</td>
              <td>
                <input
                  type="text"
                  value={txtUsername}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Password</td>
              <td>
                <input
                  type="password"
                  value={txtPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <input
                  type="submit"
                  value="LOGIN"
                  onClick={btnLoginClick}
                />
              </td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Login;