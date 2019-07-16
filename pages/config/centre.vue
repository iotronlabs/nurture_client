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
									<TableCentre />
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
import TableCentre from '@/components/CentreConfig/TableCentre'

export default {
	layout: 'DashboardNavigationLayout',
	middleware: 'auth',
	components: {
		TableCentre
	},
  	data: () => ({
		active: '',
		heading : ['Centres'],

		dialog: false,

	}),
	created() {
		if(this.$auth.loggedIn==false && this.$auth.user.authentication!=5)
		{
			this.$router.go('/')
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
