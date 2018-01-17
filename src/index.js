import React from 'react'
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'
import {
	addNavigationHelpers,
	StackNavigator
} from 'react-navigation'

import SplashScreen from './pages/splash'
import LoginScreen from './pages/login'
import RegisterScreen from './pages/login/register'
import CabangScreen from './pages/login/cabang'
import ListUsersScreen from './pages/login/listUsers'

import HomeManagerScreen from './routes/homeManager'
import HomeAdminScreen from './routes/homeAdmin'
import {
	// HomeScreen,
	MyAppLevel2,
	MyAppLevel3,
	MyAppLevel4,
	MyAppLevel5,
	MyAppLevel6,
	MyAppLevel8,
	MyAppLevel10,
} from './routes/home'

import ProductScreen from './pages/inventory/product'
import IngredientsScreen from './pages/inventory/ingredients'
import BahanBakuScreen from './pages/inventory/bahanBaku'

import SearchScreen from './pages/sale/search'
import ScanQRScreen from './pages/sale/scanQR'


const StackNavigatorConfig = {
	// headerMode: 'none'
}


export const AppNavigator = StackNavigator({
	Splash: {
		screen: SplashScreen,
		navigationOptions: {
			header: null
		}
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			header: null
		}
	},
	Register: {
		screen: RegisterScreen,
		navigationOptions: {
			// header: null,
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	Cabang: {
		screen: CabangScreen,
		navigationOptions: {
			// header: null,
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	ListUsers: {
		screen: ListUsersScreen,
		navigationOptions: {
			// header: null,
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	HomeManager: {
		screen: HomeManagerScreen,
		navigationOptions: {
			header: null
		}
	},
	HomeAdmin: {
		screen: HomeAdminScreen,
		navigationOptions: {
			header: null
		}
	},
	/*Home: {
		screen: HomeScreen,
		navigationOptions: {
			header: null
		}
	},*/
	level2: {
		screen: MyAppLevel2,
		navigationOptions: {
			header: null
		}
	},
	level3: {
		screen: MyAppLevel3,
		navigationOptions: {
			header: null
		}
	},
	level4: {
		screen: MyAppLevel4,
		navigationOptions: {
			header: null
		}
	},
	level5: {
		screen: MyAppLevel5,
		navigationOptions: {
			header: null
		}
	},
	level6: {
		screen: MyAppLevel6,
		navigationOptions: {
			header: null
		}
	},
	level8: {
		screen: MyAppLevel8,
		navigationOptions: {
			header: null
		}
	},
	level10: {
		screen: MyAppLevel10,
		navigationOptions: {
			header: null
		}
	},
	ScanQR: {
		screen: ScanQRScreen,
		navigationOptions: {
			header: null
		}
	},
	Product: {
		screen: ProductScreen,
		navigationOptions: {
			// header: null
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	Ingredients: {
		screen: IngredientsScreen,
		navigationOptions: {
			// header: null
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	BahanBaku: {
		screen: BahanBakuScreen,
		navigationOptions: {
			// header: null
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	Search: {
		screen: SearchScreen,
		navigationOptions: {
			header: null,
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	}
}, StackNavigatorConfig)


module.exports = AppNavigator

/*const AppWithNavigationState = ({ dispatch, nav }) => (
	<AppNavigator navigation = { addNavigationHelpers({ dispatch, state: nav })}/>
)*/

/*AppWithNavigationState.propsTypes = {
	dispatch: PropsTypes.func.isRequired,
	nav: PropsTypes.object.isRequired
}*/

/*const mapStateToProps = state => ({
	nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)*/