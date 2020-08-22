import axios from 'axios'

const qs = require('querystring')

const LoginAuth = {}
export default LoginAuth

export async function professionalFeaturesData(userid) {
  // const config = {
  //     headers: {
  //         authorization: `Bearer ${localStorage.getItem('authorization')}`
  //     }
  // }
  const userDData = { userID: userid }
  return axios({
    method: 'post',
    url: `http://clickswealthy.com:3000/v1/user/get-professional-features`,
    data: qs.stringify(userDData),
  })
    .then(response => {
      console.log('REPONSE FROM API PROFESSIONAL FEATURES', response.data)
      return response.data
    })
    .catch(error => {
      console.log('Error Catched in PROFESSIONAL FEATURES')
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

export async function addProfessionalFeaturesToCart(userid, feature) {
  const userDData = { userID: userid, featureID: feature }
  console.log('userDData', userDData)
  return axios({
    method: 'post',
    url: `http://clickswealthy.com:3000/v1/user/add-to-cart`,
    data: qs.stringify(userDData),
  })
    .then(response => {
      console.log('REPONSE FROM API ADD TO CART', response.data)
      return response.data
    })
    .catch(error => {
      console.log('Error Catched in ADD TO CART')
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

export async function removeProfessionalFeaturesFromCart(userid, feature) {
  const userDData = { userID: userid, featureID: feature }
  console.log('userDData', userDData)
  return axios({
    method: 'post',
    url: `http://clickswealthy.com:3000/v1/user/remove-from-cart`,
    data: qs.stringify(userDData),
  })
    .then(response => {
      console.log('REPONSE FROM API REMOVE FROM CART', response.data)
      return response.data
    })
    .catch(error => {
      console.log('Error Catched in REMOVE FROM CART')
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

export async function order(data) {
  // const config = {
  //     headers: {
  //         authorization: `Bearer ${localStorage.getItem('authorization')}`
  //     }
  // }
  console.log('data of profeesional features order api: ', data)
  return axios({
    method: 'post',
    url: `http://clickswealthy.com:3000/v1/user/order-professional-feature`,
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
