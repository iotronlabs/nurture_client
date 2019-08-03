<template>
<v-content class="global-font">
	<v-container fluid>
		<v-layout justify-left row wrap>
			<v-flex xs12 sm6 md6  >
				<v-card>
					<v-card-title>
					<span class="headline">Examination Properties</span>
					</v-card-title>
					<v-divider></v-divider>
					<v-list>
					<v-list-tile>
						<v-list-tile-action>
						<v-avatar>1</v-avatar>
						</v-list-tile-action>

						<v-list-tile-content>
						<v-list-tile-title>Exam name</v-list-tile-title>
						</v-list-tile-content>

						<v-list-tile-content>
						<v-list-tile-title>{{ details.exam_name }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider></v-divider>

					<v-list-tile>
						<v-list-tile-action>
						<v-avatar>2</v-avatar>
						</v-list-tile-action>

						<v-list-tile-content>
						<v-list-tile-title>Subject</v-list-tile-title>
						</v-list-tile-content>

						<v-list-tile-content>
						<v-list-tile-title>{{ details.subject_name }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider></v-divider>

					<v-list-tile>
						<v-list-tile-action>
						<v-avatar>3</v-avatar>
						</v-list-tile-action>

						<v-list-tile-content>
						<v-list-tile-title>Deadline</v-list-tile-title>
						</v-list-tile-content>

						<v-list-tile-content>
						<v-list-tile-title>{{ details.end_date }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider></v-divider>

					<v-list-tile>
						<v-list-tile-action>
						<v-avatar>4</v-avatar>
						</v-list-tile-action>

						<v-list-tile-content>
						<v-list-tile-title>Duration</v-list-tile-title>
						</v-list-tile-content>

						<v-list-tile-content>
						<v-list-tile-title><span v-if="details.duration!=null">{{ details.duration }}</span><span v-else>NIL</span></v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider></v-divider>

					<v-list-tile>
						<v-list-tile-action>
						<v-avatar>5</v-avatar>
						</v-list-tile-action>

						<v-list-tile-content>
						<v-list-tile-title>Passmark</v-list-tile-title>
						</v-list-tile-content>

						<v-list-tile-content>
						<v-list-tile-title><span v-if="details.passmark!=null">{{ details.passmark }}</span><span v-else>NIL</span></v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider></v-divider>

					<v-list-tile>
						<v-list-tile-action>
						<v-avatar>6</v-avatar>
						</v-list-tile-action>

						<v-list-tile-content>
						<v-list-tile-title>No of Questions</v-list-tile-title>
						</v-list-tile-content>

						<v-list-tile-content>
						<!-- <v-list-tile-title>{{ details. }}</v-list-tile-title> -->
						<v-list-tile-title>25</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>




					</v-list>
				</v-card>

			</v-flex>
		<!-- </v-layout>
		<v-layout justify-right xs12 sm6 md6> -->
			<v-flex xs12 sm6 md5>
				<v-card>
					<v-card-title>
					<span class="headline">Terms and conditons</span>
					</v-card-title>
					<v-divider></v-divider>

						<v-checkbox
							v-model="ex4"
							label="I agree"
							color="primary"
							hide-details
							>
						</v-checkbox>

				</v-card>
				<v-card>
					<v-card-title>
					<span class="headline">Take Assessment</span>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text> You are good to go</v-card-text>
					<v-btn color="primary"
						:to="`/exam/student/take-assessment/${this.$route.params.id}`"
						nuxt
					>Take Assessment</v-btn>
				</v-card>
				<v-card>
					<v-card-title>
					<span class="headline">Assessment History</span>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text> You attend this exam on 06/14/2019 , your score was 0% </v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</v-content>
</template>

<script>
export default {
	layout: 'DashboardNavigationLayout',
	data() {
		return {
			details: {

			}
		}
	},
	// validate() {
	// 	else
	// 	{
	// 		return true
	// 	}
	// },
	created() {
		if(this.$auth.loggedIn)
		{
			if(this.$auth.user.authentication==1)
			{
				this.initialize()
			}
			else
			{
				this.$router.push('/dashboard')
			}
		}
	},
	methods: {
		async initialize() {
			const response = await this.$axios.get(`/api/students/show_exam_rule/${this.$route.params.id}`)
			this.details=Object.assign({},response.data.data)
		}
	}
}
</script>


<style lang="scss" scoped>
.v-card {
    padding: 20px;
    margin: 20px;
}
</style>

