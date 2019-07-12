<template>
	<v-content class="global-font">
		<v-container fluid>
			<v-layout align-center justify-center>
				<v-flex xs12>
					<Table />
					<Table2 />
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
import Table from '@/components/table'
import Table2 from '@/components/table2'
export default {
	// middleware: ['auth'],
	components: {
		Table,
		Table2
	},
	layout: 'DashboardNavigationLayout',
	mounted() {
		console.log(this.$auth.loggedIn)
		console.log(this.$auth.user)
	}
}
</script>


<style>

</style>
