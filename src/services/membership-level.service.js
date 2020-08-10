import axios from 'axios'

const qs = require('querystring')

const LoginAuth = {}
export default LoginAuth

export async function membershipData(userid) {
  // const config = {
  //     headers: {
  //         authorization: `Bearer ${localStorage.getItem('authorization')}`
  //     }
  // }
  const userDData = { userID: userid }
  return axios({
    method: 'post',
    url: `http://18.237.7.208:3000/v1/user/get-membership-levels`,
    data: qs.stringify(userDData),
  })
    .then(response => {
      console.log('REPONSE FROM API', response.data)
      return response.data
    })
    .catch(error => {
      console.log('Error Catched in membership-level')
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
