import axios from 'axios'
import { BLOG_ENDPOINTS } from '../constants/SERVICE_ENDPOINTS'

const BlogService = {}
export default BlogService

export async function getCategories() {
  return axios
    .get(BLOG_ENDPOINTS.GET_CATEGORIES)
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

export async function createPost(data) {
  return axios({
    method: 'post',
    url: BLOG_ENDPOINTS.CREATE_POST,
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

export async function getPosts(data) {
  return axios({
    method: 'post',
    url: BLOG_ENDPOINTS.GET_POSTS,
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

export async function getPostDetails(data) {
  return axios({
    method: 'post',
    url: BLOG_ENDPOINTS.GET_POST_DETAILS,
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

export async function addComment(data) {
  return axios({
    method: 'post',
    url: data.url,
    data: data.dataToSubmit,
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
