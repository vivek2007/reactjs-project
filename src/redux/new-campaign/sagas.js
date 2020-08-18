import { all, call, put, takeEvery } from 'redux-saga/effects'
import store from 'store'
// import { store as reduxStore } from 'index'
import { getOrder } from 'services/new-campaign'
import actions from './actions'

export function* GET_CALENDER_DATA({ payload }) {
  console.log('payload', payload)
  try {
    const newCampaign = yield call(getOrder, payload)
    console.log('NEW CAMPAIGN DETAILS', newCampaign)

    yield put({
      type: 'newCampaign/SET_STATE',
      payload: {
        newCampaign,
      },
    })

    const dataToStore = {
      newCampaign,
    }

    yield store.set(`app.newCampaign`, dataToStore)
    // yield reduxStore.dispatch({
    //   type: 'newCampaign/SET_STATE',
    //   payload: dataToStore,
    // })
  } catch (error) {
    console.log(error)
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_CALENDER_DATA, GET_CALENDER_DATA)])
}
