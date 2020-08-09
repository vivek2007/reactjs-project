import store from 'store'
import actions from './actions'

const STORED_BLOG_DATA = blogData => {
  const data = {}
  Object.keys(blogData).forEach(key => {
    const item = store.get(`app.blog`)
    data[key] = typeof item !== 'undefined' ? item[key] : blogData[key]
  })
  return data
}

const initialState = {
  ...STORED_BLOG_DATA({
    postId: '',
  }),
}

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
