import store from 'store'
import actions from './actions'

const STORES_USER_DATA = userData => {
  const data = {}
  Object.keys(userData).forEach(key => {
    const item = store.get(`app.user`)
    data[key] = typeof item !== 'undefined' ? item[key] : userData[key]
  })
  return data
}

const initialState = {
  ...STORES_USER_DATA({
    id: '',
    name: '',
    role: '',
    email: '',
    avatar: '',
    authorized: false,
    loading: false,
    userId: '',
    username: '',
    successReferrals: [],
    referredBy: {},
    referralCode: '',
  }),
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
