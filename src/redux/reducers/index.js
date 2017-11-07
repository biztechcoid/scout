import { combineReducers } from 'redux'
/*import { NavigationActions } from 'react-navigation'

import { AppNavigator } from '../..'*/

import user from './user'
import category from './category'
import sale from './sale'

/*const initialNavState = AppNavigator.router.getStateForAction(
	AppNavigator.router.getActionForPathAndParams('Splash')
)

function nav(state = initialNavState, action) {
	let nextState
	switch(action.type) {
		case 'LAYOUT':
			nextState = AppNavigator.router.getStateForAction(action, state)

		default:
			nextState = AppNavigator.router.getStateForAction(action, state)
	}

	return nextState || state
}*/

const appReducer = combineReducers({
	user,
	category,
	sale,
	// nav
})

const rootReducer = (state, action) => {
	if(action.type === 'LOGOUT') {
		state = undefined
	}

	return appReducer(state, action)
}

export default rootReducer