import axios from 'axios';

const API_URL = 'http://13.58.30.123:8000/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        mail: user.mail,
        password: user.password
      })
      .then((response, error) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify({token:response.data.token}));
          return response.data;
        }
        if(error) {
          Promise.reject(error)
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', user).then((response, error) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response;
      }
      if(error) {
        Promise.reject(error)
      }
    });
  }
}

export default new AuthService();