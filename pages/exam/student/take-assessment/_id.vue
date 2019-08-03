<template>
<v-app>
	<v-content>
		<v-toolbar color="primary">
			<img class="logo" src="/nurture-logo.png">
			<v-toolbar-title class="white--text">Nurture</v-toolbar-title>

			<v-spacer></v-spacer>
			<v-btn color="white" outline @click="submitExam">Submit</v-btn>
		</v-toolbar>
		<v-card flat>
			<v-container>
				<v-tabs fixed-tabs left class="tab-style" slider-color="yellow">
					<v-tab v-for="i in questions.length" :key="i" :href="'#tab-' + i" >
						Q {{ i }}
					</v-tab>
					<v-tabs-items touchless>
						<v-tab-item v-for="i in questions.length" :key="i" :value="'tab-' + i">
							<v-card flat class = "card-content">
								<v-card-text>{{ questions[i-1].question }}</v-card-text>
								<center><v-img class="question-image" :src="`${baseUrl}/exams/question/${questions[i-1].question_image}`"></v-img></center>
								<div class="option-radiogroup">
									<v-radio-group v-model="answers[i-1]">
										<v-layout row wrap>
										<v-flex xs12 sm12 md6>
										<v-radio color="primary" :label="questions[i-1].option_1" value="Option 1" class="option-radio"></v-radio>
										<span v-if="questions[i-1].option_5!='null'">
											<v-img :src="`${baseUrl}/exams/question/${questions[i-1].option_5}`"></v-img>
										</span>
										</v-flex>
										<v-flex xs12 sm12 md6>
										<v-radio color="primary" :label="questions[i-1].option_3" value="Option 3" class="option-radio"></v-radio>
										<span v-if="questions[i-1].option_6!='null'">
											<v-img :src="`${baseUrl}/exams/question/${questions[i-1].option_7}`"></v-img>
										</span>
										</v-flex>
										<v-flex xs12 sm12 md6>
										<v-radio color="primary" :label="questions[i-1].option_2" value="Option 2" class="option-radio"></v-radio>
										<span v-if="questions[i-1].option_7!='null'">
											<v-img :src="`${baseUrl}/exams/question/${questions[i-1].option_6}`"></v-img>
										</span>
										</v-flex>
										<v-flex xs12 sm12 md6>
										<v-radio color="primary" :label="questions[i-1].option_4" value="Option 4" class="option-radio"></v-radio>
										<span v-if="questions[i-1].option_8!='null'">
											<v-img :src="`${baseUrl}/exams/question/${questions[i-1].option_8}`"></v-img>
										</span>
										</v-flex>
									</v-layout>
									</v-radio-group>
								</div>
							</v-card>
						</v-tab-item>
					</v-tabs-items>
				</v-tabs>
			</v-container>
		</v-card>
	</v-content>
</v-app>
</template>

<script>
import { mapState } from 'vuex'
import preventInspect from '@/assets/js/main'
export default {
	data() {
		return {
			questions: [],
			answers: []
		}
	},
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
			preventInspect
		}
	},
	computed: {
		...mapState({
			baseUrl: state => state.config.baseUrl
		})
	},
	methods: {
		async initialize() {
			const response = await this.$axios.get(`/api/students/show_questions/${this.$route.params.id}`)
			this.questions = new Array()
			for(var i=0;i<response.data.data.length;i++)
			{
				this.questions.push(response.data.data[i])
			}
			console.log(this.questions)
			this.answers = new Array()
		},
		submitExam() {
			console.log(this.answers)
		}
	}
}
</script>


<style scoped>

.logo{
	height: 40px;
	width: 60px;
	padding-left: 15px;
}
.card-content{
	padding : 10px 20px 10px 20px;

}
.question-image
{
	height: 50%;
	width: 50%;
}
.option-radiogroup
{
	display: flex;
	flex-direction: column;
	align-items: center;
}

  </style>
