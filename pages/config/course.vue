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

						<v-tab-item v-for="n in 2" :key="n" >
							<v-card flat>
								<v-card-text>
									<div v-if="n==1"><TableSubject /></div>
									<div v-if="n==2"><TableCourse /></div>
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
import TableSubject from '@/components/CourseConfig/TableSubject'
import TableCourse from '@/components/CourseConfig/TableCourse'

export default {
	middleware: 'auth',
	layout: 'DashboardNavigationLayout',
	components: {
		TableSubject,
		TableCourse
	},
  	data: () => ({
		active: '',
		heading : ['Subjects','Courses'],
		authentication: '',
		dialog: false,

	}),
	created() {
		if(this.$auth.loggedIn==false)
		{
			this.$router.go('/')
		}
		else if(this.$auth.user.authentication==5)
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
