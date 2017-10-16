'use strict'

import { combineReducers } from 'redux'

import user from './user'
import category from './category'

const rootReducer = combineReducers({
	user,
	category
})

export default rootReducer