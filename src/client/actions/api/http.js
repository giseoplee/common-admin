import axios from 'axios';
const baseUrl = (() => {
  const env = process.env.NODE_ENV.trim()
  switch (env) {
    case 'local' : return 'http://localhost:9090'
    case 'development' : return 'http://localhost:9090'
    case 'production' : return 'https://production'
    default : return 'http://localhost:9090'
  }
})();

export async function getMethod (endpoint, params = {}, token) {
  return await axios.get(endpoint, { params }, {
    headers: {
      'header-auth-token': token
    }
  })
  .then(response => response)
  .catch(error => error)
};

export async function postMethod (endpoint, body = {}, token) {
  return await axios.post(`${baseUrl}/${endpoint}`, body, {
      headers: {
        'header-auth-token': token
      }
    })
    .then(response => response)
    .catch(error => error)
};
