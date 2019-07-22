<template>
    <div>
		<v-list class="user-profile">
			<v-list-tile>
				<v-list-tile-avatar>
					<img src="https://randomuser.me/api/portraits/men/85.jpg">
				</v-list-tile-avatar>
				<v-list-tile-content>
					<v-list-tile-title><h3>{{ user_name }}</h3></v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
			<br>
			<div>
				<v-chip small :color="selectItems.color" text-color="white">
              		<v-avatar :class="selectItems.avatar_color"> {{selectItems.avatar_1}}</v-avatar>
              		{{selectItems.title_1}}
            	</v-chip>
			</div>
		</v-list>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    computed: {
        ...mapState({
			studentItems : state => state.dashboard.studentItems,
			teacherItems : state => state.dashboard.teacherItems,
			superAdminItems : state => state.dashboard.superAdminItems,
			mentorItems : state => state.dashboard.mentorItems,
			adminItems : state => state.dashboard.adminItems,
			auditItems : state => state.dashboard.auditItems,
			user_name : state => state.user.user_name
		}),
        selectItems() {
			if(this.$auth.loggedIn)
			{
				if(this.studentItems.active==true)
				{
					return this.studentItems.chipdata
				}
				else if(this.teacherItems.active==true)
				{
					return this.teacherItems.chipdata
				}
				else if(this.mentorItems.active==true)
				{
					return this.mentorItems.chipdata
				}
				else if(this.superAdminItems.active==true)
				{
					return this.superAdminItems.chipdata
				}
				else if(this.adminItems.active==true)
				{
					return this.adminItems.chipdata
				}
				else if(this.auditItems.active==true)
				{
					return this.auditItems.chipdata
				}
			}
        }
	},
	methods: {
		...mapActions('user',['getAuthentication'])
	},
	mounted() {
		this.getAuthentication()
	}
}
</script>


<style scoped>

    .subject-color {
        background-color: #4e54c8;
        color: aliceblue;

    }
    .user-profile {
        padding-left: 10%;
        padding-right: 3%;
        padding-top: 2%;
        padding-bottom: 10%;
    }
</style>
