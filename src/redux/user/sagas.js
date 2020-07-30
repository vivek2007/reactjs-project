import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import { currentAccount, logout } from 'services/firebase.auth.service'
import {
  login,
  register,
  forgotPassword,
  changePassword,
  verifyEmail,
} from 'services/login.auth.service'
import actions from './actions'

const notificationSettings = {
  placement: 'topLeft',
  duration: 10,
}

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
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
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
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
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
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
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
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
    })
  }
}

export function* FORGOT_PASSWORD({ payload }) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { email } = payload
  const response = yield call(forgotPassword, { email })
  console.log('success: ', response)
  if (response.status) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    notification.success({
      message: 'Reset Password',
      description: response.message,
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
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
      message: 'Reset Password Failed',
      description: response.message,
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
    })
  }
}

export function* CHANGE_PASSWORD({ payload }) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const data = {
    id: payload.id,
    password: payload.password,
  }
  const response = yield call(changePassword, data)
  console.log('success: ', response)
  if (response.status) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    notification.success({
      message: 'Reset Password',
      description: response.message,
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
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
      message: 'Reset Password Failed',
      description: response.message,
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
    })
  }
}

export function* VERIFY_EMAIL({ payload }) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
      showVerificationStatus: false,
    },
  })
  const data = {
    id: payload.id,
    password: payload.password,
  }
  const response = yield call(verifyEmail, data)
  console.log('success: ', response)
  if (response.status) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
        showVerificationStatus: true,
        emailVerificationStatus: true,
      },
    })
    notification.success({
      message: 'Reset Password',
      description: response.message,
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
    })
  } else {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
        authorized: false,
        showVerificationStatus: true,
        emailVerificationStatus: false,
      },
    })
    notification.error({
      message: 'Reset Password Failed',
      description: response.message,
      placement: notificationSettings.placement,
      duration: notificationSettings.duration,
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
    takeEvery(actions.FORGOT_PASSWORD, FORGOT_PASSWORD),
    takeEvery(actions.CHANGE_PASSWORD, CHANGE_PASSWORD),
    takeEvery(actions.VERIFY_EMAIL, VERIFY_EMAIL),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
