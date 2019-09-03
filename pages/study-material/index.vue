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
						<v-flex xs10 sm10 md6 lg6 v-for="subject in subjects" :key="subject.sub_code">
							<v-container>
								<v-card flat>
									<v-card-text>
										<center><v-btn :to="`/study-material/${subject.sub_name}`">{{ subject.sub_name }}</v-btn></center>
									</v-card-text>
								</v-card>
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

export default {
	layout: 'DashboardNavigationLayout',
	data: () => ({
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
			}
		],
		subjects: []
	}),
	created() {
		this.initialize();
	},
	methods: {
		async initialize() {
			const response = await this.$axios.get('/api/subjects')
			// console.log(response.data)
			for(var i=0;i<response.data.length;i++)
			{
				this.subjects.push(response.data[i])
			}
		}
	}
}
</script>

<style scoped>
.forum-card
{
	align-self: center;
	width: 70%;
}
.forum-heading
{
	font-weight : bold;
	text-transform: uppercase;
	font-size : 25px;
	color: white;
}
.forum-right-container
{
	background-color: grey;
	margin-right : 5%;
}
</style>
