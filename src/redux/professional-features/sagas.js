import { all, put, takeEvery, call } from 'redux-saga/effects'
import store from 'store'
import { store as reduxStore } from 'index'
import {
  professionalFeaturesData,
  addProfessionalFeaturesToCart,
  removeProfessionalFeaturesFromCart,
  order,
} from 'services/professional-features.service'
import { notification } from 'antd'
import actions from './actions'

const notificationSettings = {
  placement: 'topLeft',
  duration: 10,
}

export function* GET_FEATURES() {
  // yield put({
  //   type: 'user/SET_STATE',
  //   payload: {
  //     loading: true,
  //   },
  // })
  try {
    const userDetails = yield store.get(`app.user`)
    const professionalData = yield call(professionalFeaturesData, userDetails.id)
    yield put({
      type: 'professionalFeatures/SET_STATE',
      payload: {
        professionalData,
      },
    })
    const dataToStore = {
      professionalData,
    }
    yield store.set(`app.professionalData`, dataToStore)
    yield reduxStore.dispatch({
      type: 'professionalFeatures/SET_STATE',
      payload: dataToStore,
    })
  } catch (error) {
    console.log('ERROR IN GET FEATURES', error)
  }
}

export function* ADD_TO_CART({ payload }) {
  try {
    const userDetails = yield store.get(`app.user`)
    const cartData = yield call(addProfessionalFeaturesToCart, userDetails.id, payload)
    if (cartData) {
      yield GET_FEATURES()
    }

    yield put({
      type: 'professionalFeatures/SET_STATE',
      payload: {
        cartData,
      },
    })
    const dataToStore = {
      cartData,
    }
    yield store.set(`app.cartData`, dataToStore)
    yield reduxStore.dispatch({
      type: 'professionalFeatures/SET_STATE',
      payload: dataToStore,
    })
  } catch (error) {
    console.log(error)
  }
}

export function* REMOVE_FROM_CART({ payload }) {
  try {
    const userDetails = yield store.get(`app.user`)
    const cartData = yield call(removeProfessionalFeaturesFromCart, userDetails.id, payload)

    if (cartData) {
      yield GET_FEATURES()
    }

    yield put({
      type: 'professionalFeatures/SET_STATE',
      payload: {
        cartData,
      },
    })
    const dataToStore = {
      cartData,
    }
    yield store.set(`app.cartData`, dataToStore)
    yield reduxStore.dispatch({
      type: 'professionalFeatures/SET_STATE',
      payload: dataToStore,
    })
  } catch (error) {
    console.log(error)
  }
}

export function* ORDER_PROFESSIONAL_FEATURES({ payload }) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const response = yield call(order, payload)
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
  yield all([
    GET_FEATURES(),
    // ADD_TO_CART() // run once on app load to fetch data
    takeEvery(actions.ADD_TO_CART, ADD_TO_CART),
    takeEvery(actions.REMOVE_FROM_CART, REMOVE_FROM_CART),
    takeEvery(actions.ORDER_PROFESSIONAL_FEATURES, ORDER_PROFESSIONAL_FEATURES),
  ])
}

// export default function* rootSaga() {
//   yield all([
//     takeEvery(actions.GET_FEATURES, GET_FEATURES),
//     takeEvery(actions.ADD_TO_CART, ADD_TO_CART)
//   ])
// }
