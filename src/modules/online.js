import { NetInfo } from 'react-native'


var online = (cb) => {
	NetInfo.isConnected.fetch().then(isConnected => {
		return cb(isConnected)
	})
}

module.exports = online