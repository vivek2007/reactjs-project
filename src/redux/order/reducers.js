import store from 'store'
import actions from './actions'

const STORED_ORDER_DATA = orderData => {
  const data = {}
  Object.keys(orderData).forEach(key => {
    const item = store.get(`app.order`)
    data[key] = typeof item !== 'undefined' ? item[key] : orderData[key]
  })
  return data
}

const initialState = {
  ...STORED_ORDER_DATA({
    orderSuccess: false,
    orderForInvoice: {},
  }),
}

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
