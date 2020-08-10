import { all, put, call } from 'redux-saga/effects'
import store from 'store'
import { store as reduxStore } from 'index'
import { membershipData } from 'services/membership-level.service'

export function* GET_DATA() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const userDetails = yield store.get(`app.user`)
    console.log('USERDETAILS', userDetails)
    const membershipLevelData = yield call(membershipData, userDetails.id)
    console.log('MEMBERSHIP LEVEL DETAILS', membershipLevelData)
    yield put({
      type: 'membership-levels/SET_STATE',
      payload: {
        membershipLevelData,
      },
    })
    const dataToStore = {
      membershipLevelData,
    }
    yield store.set(`app.membershipLevelData`, dataToStore)
    yield reduxStore.dispatch({
      type: 'membership-levels/SET_STATE',
      payload: dataToStore,
    })
  } catch (error) {
    console.log(error)
  }
}

export default function* rootSaga() {
  yield all([
    GET_DATA(), // run once on app load to fetch menu data
  ])
}
