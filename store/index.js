import vuex from 'vuex'
import dashboard from './modules/dashboard'
import forum from './modules/forum'
import theme from './modules/theme'
import user from './modules/user'
import config from './modules/config'

const createStore = () => {
	return new vuex.Store({
		namespaced: true,
		modules: {
			dashboard,
			forum,
			theme,
			user,
			config
		}
	})
}

export default createStore
