'use strict'


export function localStorageUsers(data) {
	return {
		type: 'LOCAL_STORAGE_USERS',
		data
	}
}
export function registerUser(data) {
	return {
		type: 'REGISTER_USER',
		data
	}
}
export function loginProcess(data) {
	return {
		type: 'LOGIN_PROCESS',
		data
	}
}

export function login(data) {
	return {
		type: 'LOGIN',
		data
	}
}

export function logout(data) {
	return {
		type: 'LOGOUT',
		data
	}
}

export function setUser(data) {
	return {
		type: 'SET_USER',
		data
	}
}