const ENDPOINT_SOURCE = 'http://clickswealthy.com:3000'
const SERVICE_VERSION = 'v1'
const END_POINT_URL = `${ENDPOINT_SOURCE}/${SERVICE_VERSION}`

const SERVICE_ENDPOINTS = {}

export const BLOG_ENDPOINTS = {
  CREATE_POST: `${END_POINT_URL}/user/blog/create-post`,
  GET_POSTS: `${END_POINT_URL}/user/blog/get-posts`,
  GET_POST_DETAILS: `${END_POINT_URL}/user/blog/get-post-details`,
  ADD_COMMENT: `${END_POINT_URL}/user/blog/add-comment`,
  UPDATE_COMMENT: `${END_POINT_URL}/user/blog/update-comment`,
  ADD_REPLY_TO_COMMENT: `${END_POINT_URL}/user/blog/add-reply`,
  UPDATE_REPLY: `${END_POINT_URL}/user/blog/update-reply`,
  ADD_SUB_COMMENT_TO_REPLY: `${END_POINT_URL}/user/blog/add-subcomment`,
  GET_CATEGORIES: `${END_POINT_URL}/user/blog/get-categories`,
}

export default SERVICE_ENDPOINTS
