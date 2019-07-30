import vuex from 'vuex'
import dashboard from './modules/dashboard'
import forum from './modules/forum'
import theme from './modules/theme'
import user from './modules/user'
import exam from './modules/exam'

const createStore = () => {
	return new vuex.Store({
		namespaced: true,
		modules: {
			dashboard,
			forum,
			theme,
			user,
			exam
		}
	})
}

export default createStore
