<template>
<div>
	<v-content class="global-font">
		<v-container class="container">
			<div v-if="authentication==1"><Student /></div>
			<div v-if="authentication==4"><SubAdmin /></div>
		</v-container>
	</v-content>
</div>
</template>

<script>
import Student from '@/components/Attendance/Student'
import SubAdmin from '@/components/Attendance/SubAdmin'
export default {
	layout: 'DashboardNavigationLayout',
	middleware: ['auth'],
	components: {
		Student,SubAdmin
	},
	data() {
		return {
			authentication: ''
		}
	},
	created() {
		if(this.$auth.loggedIn==false)
		{
			this.$router.go('/')
		}
		else if(this.$auth.user.authentication==1 || this.$auth.user.authentication==4)
		{
			this.authentication=this.$auth.user.authentication
		}
		else
		{
			this.$router.push('/dashboard')
		}
	}
}
</script>

<style scoped>
.container {
	padding: 5%;
	margin-right: 10px;
}
</style>
