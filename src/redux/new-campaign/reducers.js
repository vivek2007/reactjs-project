import store from 'store'
import actions from './actions'

const STORED_CAMPAIGN_DATA = newCampaign => {
  const data = {}
  Object.keys(newCampaign).forEach(key => {
    const item = store.get(`app.newCampaign`)
    data[key] = typeof item !== 'undefined' ? item[key] : newCampaign[key]
  })
  return data
}

const initialState = {
  ...STORED_CAMPAIGN_DATA({
    newCampaign: {},
  }),
}

export default function newCampaignReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
