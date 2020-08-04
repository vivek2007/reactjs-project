import axios from 'axios'

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
    url: `http://18.237.7.208:3000/v1/user/order`,
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
