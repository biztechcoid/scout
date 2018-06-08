import React from 'react'
import {
	View,
	NetInfo
} from 'react-native'

/*
*
example
*
*/
/*
<Online/>
*/
/**/

class Online extends React.Component {
	state = {
		online: true
	}

	render() {
		return (
			<View style={{width: 20, height: 20, borderRadius: 10, borderWidth: 0.5, borderColor: '#ccc', marginRight: 10, backgroundColor: this.state.online ? 'green' : 'red'}}/>
		)
	}

	_handleFirstConnectivityChange(isConnected) {
		this.setState({online: isConnected})
		NetInfo.isConnected.removeEventListener('connectionChange', this._handleFirstConnectivityChange.bind(this))
	}

	componentWillMount() {
		NetInfo.isConnected.fetch().then(isConnected => {
			this.setState({online: isConnected})
		})
	}

	componentDidMount() {
		NetInfo.isConnected.addEventListener('connectionChange', this._handleFirstConnectivityChange.bind(this))
	}

	componentWillUnmount() {
		
	}
}

module.exports = Online