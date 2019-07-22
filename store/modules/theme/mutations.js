import state from './state'
export default {
	setTheme({}) {
		if(state.dark == true)
		{
			state.dark = false
		}
		else
		{
			state.dark = true
		}
	}
}
