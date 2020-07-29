import axios from 'axios'

const LoginAuth = {}
export default LoginAuth

export async function login(email, password) {
  const data = {
    email,
    password,
  }
  return axios({
    method: 'post',
    url: `http://18.237.7.208:3000/v1/auth/login`,
    data,
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('Error Catched')
      let errorData = { status: 0, message: error.message }
      if (error.response.data) {
        const { status, message } = error.response.data
        errorData = {
          status,
          message,
        }
      }
      return errorData
    })
}

export async function register(data) {
  return axios({
    method: 'post',
    url: `http://18.237.7.208:3000/v1/auth/signup`,
    data,
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('Error Catched')
      let errorData = { status: 0, message: error.message }
      if (error.response.data) {
        const { status, message } = error.response.data
        errorData = {
          status,
          message,
        }
      }
      return errorData
    })
}
