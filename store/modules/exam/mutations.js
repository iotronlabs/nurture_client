import state from './state'

export default {
	setId(id) {
		state.id=id
		state.edit=true
	}
}
