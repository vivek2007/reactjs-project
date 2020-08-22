import axios from 'axios'

// const qs = require('querystring')

const LoginAuth = {}
export default LoginAuth

export async function order(data) {
  // const config = {
  //     headers: {
  //         authorization: `Bearer ${localStorage.getItem('authorization')}`
  //     }
  // }
  console.log('data: ', data)
  return axios({
    method: 'post',
    url: `http://clickswealthy.com:3000/v1/user/order`,
    // data: qs.stringify(data),
    data,
  })
    .then(response => {
      console.log('RESPONSE FROM ORDER SERVICE', response)
      return response
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
