<template>
<div class="page-table">
	<v-content class="global-font">
		<v-container fluid>
			<v-layout align-center justify-center>
				<v-flex xs12>
					<v-tabs v-model="active" color="cyan" dark slider-color="yellow">
						<v-tab v-for="head in heading" :key="head" ripple>
							{{ head}}
						</v-tab>

						<v-tab-item v-for="n in 1" :key="n" >
							<v-card flat>
								<v-card-text>
									<div><TableClass /></div>
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</div>
</template>

<script>
import TableClass from '@/components/CourseConfig/TableClass'

export default {
	middleware: 'auth',
	layout: 'DashboardNavigationLayout',
	components: {
		TableClass
	},
  	data: () => ({
		active: '',
		heading : ['Class'],
		authentication: '',
		dialog: false,

	}),
	created() {
		if(this.$auth.loggedIn==false)
		{
			this.$router.go('/')
		}
		else if(this.$auth.user.authentication==4)
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


<style scoped>
.page-table
{
	padding: 2%;
}
</style>
