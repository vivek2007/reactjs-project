import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import { currentAccount, logout } from 'services/firebase.auth.service'
import { login } from 'services/login.auth.service'
import actions from './actions'

export function* LOGIN({ payload }) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  // const response = {
  //   email,
  //   username: 'venkat',
  //   status: 1,
  //   message: 'Success'
  // } 
  const response = yield call(login, email, password)
  console.log('success: ', response);
  if (response.status) {
    const { username: name, email: userEmail } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        // id,
        loading: false,
        name,
        email: userEmail,
        // avatar,
        role: 'admin',
        authorized: true,
      },
    })
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in to Clicks Admin Template!',
    })
    yield history.push('/dashboard/beta')
  } else {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
        authorized: false
      },
    })
    notification.error({
      message: "Login Failed",
      description: response.message,
    })
  }
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(currentAccount)
  if (response) {
    const { uid: id, email, photoURL: avatar } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        name: 'Administrator',
        email,
        avatar,
        role: 'admin',
        authorized: true,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
