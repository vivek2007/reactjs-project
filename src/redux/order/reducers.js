import actions from './actions'

const initialState = {
  orderSuccess: false,
}

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
