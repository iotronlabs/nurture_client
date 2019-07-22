import state from "./state";

export default {
	setUserDetails() {
		if(this.$auth.loggedIn)
		{
			const authentication = this.$auth.user.authentication
			if(authentication == 1)
			{
				state.user_name = this.$auth.user.s_fname + this.$auth.user.s_surname
			}
			else if(authentication == 2)
			{
				state.user_name = this.$auth.user.faculty_fname + this.$auth.user.faculty_surname
			}
			else if(authentication == 3)
			{
				state.user_name = this.$auth.user.faculty_head_fname + this.$auth.user.faculty_head_surname
			}
			else if(authentication == 4)
			{
				state.user_name = this.$auth.user.sub_admin_fname + this.$auth.user.sub_admin_surname
			}
			else if(authentication == 5)
			{
				state.user_name = this.$auth.user.name
			}
		}
	}
}
