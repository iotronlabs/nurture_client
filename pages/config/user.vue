<template>
	<v-content class="global-font">
		<v-container fluid>
			<v-layout align-center justify-center>
				<v-flex xs12>
					<div v-if="authentication==5"><Table /></div>
					<div v-if="authentication==4"><Table2 /></div>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
import Table from '@/components/table'
import Table2 from '@/components/table2'
export default {
	middleware: ['auth'],
	components: {
		Table,
		Table2
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
		else if(this.$auth.user.authentication!=4 && this.$auth.user.authemtication!=5)
		{
			this.$router.push('/dashboard')
		}
		else
		{
			this.authentication = this.$auth.user.authentication
		}
	}
}
</script>


<style>

</style>
