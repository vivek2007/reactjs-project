import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import order from './order/reducers'
import blog from './blog/reducers'
import settings from './settings/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    order,
    blog,
    settings,
  })
