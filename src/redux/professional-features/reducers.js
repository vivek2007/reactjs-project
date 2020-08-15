import store from 'store'
import actions from './actions'

const STORED_PROFESSIONAL_DATA = professionalData => {
  const data = {}
  Object.keys(professionalData).forEach(key => {
    const item = store.get(`app.professionalData`)
    data[key] = typeof item !== 'undefined' ? item[key] : professionalData[key]
  })
  return data
}

const initialState = {
  ...STORED_PROFESSIONAL_DATA({
    professionalData: {},
  }),
}

export default function professionalFeaturesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
