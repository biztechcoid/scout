'use strict'

import { combineReducers } from 'redux'

import user from './user'
import category from './category'
import sale from './sale'

const appReducer = combineReducers({
	user,
	category,
	sale
})

const rootReducer = (state, action) => {
	if(action.type === 'LOGOUT') {
		state = undefined
	}

	return appReducer(state, action)
}

export default rootReducer