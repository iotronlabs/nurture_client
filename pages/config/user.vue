<template>
	<v-content class="global-font">


		<v-container fluid>
			<v-layout align-center justify-center>
				<v-flex xs12>
					<div v-if="authentication==5"><TableAdmin /></div>
					<div v-if="authentication==4"><TableSubadmin /></div>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
import TableAdmin from '@/components/TableAdmin'
import TableSubadmin from '@/components/TableSubadmin'
export default {
	middleware: ['auth'],
	components: {
		TableAdmin,
		TableSubadmin
	},
	layout: 'DashboardNavigationLayout',
	data() {
		return {
			authentication: ''
		}
	},
	mounted() {
		if(this.$auth.loggedIn==false)
		{
			this.$router.go('/')
		}
		else if(this.$auth.user.authentication==4 || this.$auth.user.authentication==5)
		{
			this.authentication = this.$auth.user.authentication
		}
		else
		{
			this.$router.push('/dashboard')
		}
	}
}
</script>


<style>

</style>
