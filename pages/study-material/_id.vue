<template>
<v-content class="global-font">
	<v-container grid-list-xl>
		<v-layout wrap justify-start>
			<v-flex d-flex xs12 sm12 md12>
	        	<v-card class="forum-card">
					<v-card-text>
						<v-breadcrumbs :items="items">
							<template v-slot:item="props">
								<nuxt-link :to="{name : props.item.to}">
									<span>{{ props.item.text.toUpperCase() }}</span>
								</nuxt-link>
							</template>
							<template v-slot:divider>
								<v-icon>chevron_right</v-icon>
							</template>
						</v-breadcrumbs>
					</v-card-text>
					<v-layout row wrap>
						<v-flex xs10 sm10 md12 lg12>
							<v-container>
								<div v-if="authentication==5"><Table /></div>
								<!-- <div v-if="authentication==5"><TableSuperAdmin /></div> -->
							</v-container>
						</v-flex>
					</v-layout>
           		</v-card>
           	</v-flex>
    	</v-layout>
	</v-container>
</v-content>
</template>

<script>
import Table from '@/components/StudyMaterial/Table'
export default {
	layout: 'DashboardNavigationLayout',
	components: {
		Table
	},
	data: () => ({
		authentication: '',
		items:[
			{
				text: 'Dashboard',
				disabled: false,
				to: 'dashboard'
			},
			{
				text: 'Subject',
				disabled: false,
				to: 'study-material',
			},
			{
				text: 'Topics',
				disabled: false,
				to: ''
			}
		],
	}),
	created() {
		this.authentication = this.$auth.user.authentication
	}
}
</script>
