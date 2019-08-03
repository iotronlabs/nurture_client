<template>
<v-card>
  	<v-container>
    	<!-- <v-tabs dark color="cyan" show-arrows >
			<v-tabs-slider color="yellow"></v-tabs-slider>

			<v-tab v-for="i in k.length" :key="i" :href="'#tab-' + i" >
				Q {{ i }}
			</v-tab> -->
		<v-tabs fixed-tabs left class="tab-style" dark slider-color="yellow">
			<v-tab v-for="i in questions.length" :key="i" :href="'#tab-' + i" >
				Q {{ i }}
			</v-tab>
			<!-- <v-tabs-items>
				<v-tab-item v-for="contents in content" :key="i":value="'tab-' + i">
				<v-card flat>
					<v-card-text>{{ contents }}</v-card-text>
				</v-card>
				</v-tab-item>
			</v-tabs-items>
			</v-tabs>
			<v-subheader>sdxcfgvbhjnkml,;.'</v-subheader> -->

				<v-tabs-items touchless>
					<v-tab-item v-for="i in questions.length" :key="i" :value="'tab-' + i">
						<v-card flat class = "card-content">
							<v-card-text>{{ questions[i-1].question }}</v-card-text>
								<v-img :src="`${baseUrl}/exams/question/${questions[i-1].question_image}`"></v-img>
								<v-radio-group v-model="answer[i]">
									<v-radio color="primary" :label="questions[i-1].option_1" value="Option 1"></v-radio>
									<span v-if="questions[i-1].option_5!='null'">
										<v-img :src="`${baseUrl}/exams/question/${questions[i-1].option_5}`"></v-img>
									</span>
									<v-radio color="primary" :label="questions[i-1].option_3" value="Option 3"></v-radio>
									<span v-if="questions[i-1].option_6!='null'">
										<v-img :src="`${baseUrl}/exams/question/${questions[i-1].option_6}`"></v-img>
									</span>

									<v-radio color="primary" :label="questions[i-1].option_2" value="Option 2"></v-radio>
									<span v-if="questions[i-1].option_7!='null'">
										<v-img :src="`${baseUrl}/exams/question/${questions[i-1].option_7}`"></v-img>
									</span>

							        <v-radio color="primary" :label="questions[i-1].option_4" value="Option 4"></v-radio>
									<span v-if="questions[i-1].option_8!='null'">
										<v-img :src="`${baseUrl}/exams/question/${questions[i-1].option_8}`"></v-img>
									</span>

						      	</v-radio-group>


							 <v-layout row wrap>
								<v-flex md1>
									<v-btn color= "cyan" @click="editQuestion(questions[i-1].question_id)">
										<v-icon small >
											edit
										</v-icon>
									</v-btn>
								</v-flex>
								<v-flex>
									<v-btn color = "red" @click="deleteQuestion(questions[i-1].question_id)">
										<v-icon small >
											delete
										</v-icon>
									</v-btn>
								</v-flex>
							</v-layout>
							<br><br>
							<!--<v-layout>
								<v-btn to="result"> Submit</v-btn>
							</v-layout>-->
						</v-card>
						<v-dialog v-model="dialogAddQuestion" fullscreen hide-overlay transition="dialog-bottom-transition">
							<v-toolbar dark color="primary">
								<v-toolbar-title>Edit Question Form</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-btn icon dark @click="dialogAddQuestion = false">
									<v-icon>close</v-icon>
								</v-btn>
							</v-toolbar>
							<AddQuestions @success="success" :id="questions[i-1].exam_id" :questions="questions[i-1]" :editQuestionMode="editQuestionMode" />
						</v-dialog>

        			</v-tab-item>
     			 </v-tabs-items>
    		</v-tabs>

			<!-- snackbar -->
			<v-snackbar
				v-model="snackbar"
				:timeout="timeout"
				top
				vertical
			>
				{{ message }}
				<v-btn
					color="pink"
					flat
					@click="snackbar = false"
				>
					Close
				</v-btn>
			</v-snackbar>

  </v-container>
</v-card>
</template>



<script>
import AddQuestions from '@/components/Exam/AddQuestions'
import { mapState } from 'vuex'
export default {
	components: {
		AddQuestions
	},
	props: {
		questions: {
			type: Array,
			required: true
		}
	},
	data: () => ({
		message: '',
		snackbar: false,
		timeout: 3000,
		editQuestionMode: false,
		dialogAddQuestion: false,
		answer: [],
			// questions: []
	}),
	computed: {
		...mapState({
			baseUrl: state => state.config.baseUrl
		})
	},
	methods: {
		async deleteQuestion(id) {
			const response = await this.$axios.delete(`/api/exams/question/${id}`)
			if(response.data.success==true)
			{
				this.questions.splice(this.questions.indexOf(id),1)
			}
		},
		editQuestion(id) {
			this.editQuestionMode = true
			this.dialogAddQuestion = true
		},
		success(message) {
			this.message=message
			this.dialogAddQuestion=false
			this.snackbar=true
		}
	}
}
</script>


<style scoped>
.card-content{
	padding : 10px 20px 10px 20px;

}

  </style>


