'use strict'

import RNFS from 'react-native-fs'

const checkFolder = function(path, value) {
  /*
	*
	check folder
	*
	*/
	RNFS.exists(path)
		.then(folder => {
			if(folder) {
				return value(true)
			} else {
				/*
				*
				create folder
				*
				*/
				RNFS.mkdir(path)
					.then(mkdir => {
						return value(true)
					})
					.catch(err => console.log('err', err))
			}
		})
		.catch(err => console.log('err', err))
}

module.exports = checkFolder