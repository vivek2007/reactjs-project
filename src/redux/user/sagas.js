import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import { currentAccount, logout } from 'services/firebase.auth.service'
import { login, register } from 'services/login.auth.service'
import actions from './actions'

export function* LOGIN({ payload }) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { email, password } = payload
  const response = yield call(login, email, password)
  console.log('success: ', response)
  if (response.status) {
    const { username: name, email: userEmail } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
        name,
        email: userEmail,
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
        authorized: false,
      },
    })
    notification.error({
      message: 'Login Failed',
      description: response.message,
    })
  }
}

export function* REGISTER({ payload }) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const {
    firstName = '',
    lastName = '',
    emailAddress: email,
    username,
    password,
    referredByCode,
  } = payload
  const dataToRegister = {
    firstName,
    lastName,
    email,
    password,
    username,
    referredByCode,
  }
  const response = yield call(register, dataToRegister)
  console.log('success: ', response)
  if (response.status) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    notification.success({
      message: 'Registration Success',
      description: response.message,
    })
    yield history.push('/auth/login')
  } else {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
        authorized: false,
      },
    })
    notification.error({
      message: 'Registration Failed',
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
    takeEvery(actions.REGISTER, REGISTER),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
