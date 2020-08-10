import store from 'store'
import actions from './actions'

const STORED_MEMBERSHIP_DATA = membershipData => {
  const data = {}
  Object.keys(membershipData).forEach(key => {
    const item = store.get(`app.membershipLevelData`)
    data[key] = typeof item !== 'undefined' ? item[key] : membershipData[key]
  })
  return data
}

const initialState = {
  ...STORED_MEMBERSHIP_DATA({
    membershipLevelData: {},
  }),
}

export default function membershipLevelReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
