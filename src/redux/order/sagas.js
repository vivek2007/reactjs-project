import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { order } from 'services/order.service'
// import { store as reduxStore } from 'index'
import actions from './actions'

const notificationSettings = {
  placement: 'topLeft',
  duration: 10,
}

export function* PLACE_ORDER({ payload }) {
  console.log('payload from order saga', payload)

  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const response = yield call(order, payload)
  console.log('success: ', response)
  if (response.status && response.data !== '0') {
    yield put({
      type: 'order/SET_STATE',
      payload: {
        orderSuccess: true,
      },
    })
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    // yield reduxStore.dispatch({
    //   type: 'membership-levels/GET_DATA'
    // })
    notification.success({
      message: 'Order Success',
      description: 'Your Order hasbeen Successfully Placed',
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
    })
  } else {
    yield put({
      type: 'order/SET_STATE',
      payload: {
        orderSuccess: false,
      },
    })
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    notification.error({
      message: 'Order Failed',
      description: response.message,
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
    })
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.PLACE_ORDER, PLACE_ORDER)])
}
