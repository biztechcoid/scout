import { NetInfo } from 'react-native'


var online = (callback) => {
	NetInfo.isConnected.fetch().then(isConnected => {
		return callback(isConnected)
	})
}

module.exports = online