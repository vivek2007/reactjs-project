import axios from 'axios'

const qs = require('querystring')

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
    url: `https://climatechangepartnership.com/secure/payment.php`,
    data: qs.stringify(data),
  })
    .then(response => {
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
