export default {
	getId({commit},id) {
		console.log(typeof id)
		commit('setId',id)
	}
}
