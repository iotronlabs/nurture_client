<template>
<div>
	<v-tabs fixed-tabs left class="tab-style" dark slider-color="primary">
		<v-tab v-for="head in heading" :key="head" ripple>
			{{ head}}
		</v-tab>
          	<v-tab-item v-for="n in 2" :key="n" >

            	<v-card class = "card-style">
					<v-form ref="form" method="post" id="form" enctype="multipart/form-data">

              			<v-subheader large > Question</v-subheader>
						<v-layout row wrap >
							<v-flex xs12 sm12 md9>
								<v-text-field label="Enter Question" solo outline v-model="questions.question"></v-text-field>
								<input v-if="n==1"
									type="file"
									ref="fileInput"
									accept="image/*"
									@change="onFilePicked"
								>
							</v-flex>
						</v-layout><br>
						<v-layout row wrap v-if="n==1">
							<v-flex xs12 sm6 md9 >
								<h3>Option1</h3><br>
								<v-text-field
									v-model="questions.option_1"
									type="text"
									placeholder="Enter option or upload image"
									required
									outline
									solo
								>
								</v-text-field>
								<input
									type="file"
									ref="fileInput"
									accept="image/*"
									@change="onFilePicked1"
								>
							</v-flex>
						</v-layout><br>

						<v-layout row wrap v-if="n==1">
							<v-flex xs12 sm6 md9 >
								<h3>Option2</h3><br>
								<v-text-field
									v-model="questions.option_2"
									type="text"
									placeholder="Enter option or upload image"
									required
									outline

								>
								</v-text-field>
								<input
									type="file"
									ref="fileInput"
									accept="image/*"
									@change="onFilePicked2"
								>
							</v-flex>
						</v-layout><br>

						<v-layout row wrap v-if="n==1">
							<v-flex xs12 sm6 md9 >
								<h3>Option3</h3><br>
								<v-text-field
									v-model="questions.option_3"
									type="text"
									placeholder="Enter option or upload image"
									required
									outline

								>
								</v-text-field>
								<input
									type="file"
									ref="fileInput"
									accept="image/*"
									@change="onFilePicked3"
								>
							</v-flex>
						</v-layout><br>

						<v-layout row wrap v-if="n==1">
							<v-flex xs12 sm6 md9 >
								<h3>Option4</h3><br>
								<v-text-field
									v-model="questions.option_4"
									type="text"
									placeholder="Enter option or upload image"
									required
									outline

								>
								</v-text-field>
								<input
									type="file"
									ref="fileInput"
									accept="image/*"
									@change="onFilePicked4"
								>
							</v-flex>
						</v-layout><br>

						<v-layout row wrap v-if="n==1">
							<v-flex xs12 sm12 md9>
								<v-select :items="items" label="Select answer" solo outline v-model="questions.answer" >
								</v-select>
							</v-flex>
	        			</v-layout>

						<v-layout row wrap v-if = "n==2">
							<v-flex xs12 sm12 md9 >
								<v-text-field label="Enter Answer" v-model="questions.answer" solo outline ></v-text-field>
							</v-flex>
						</v-layout>

						<v-layout row wrap>
							<v-flex xs12 sm12 md9>
								<v-select :items="setTopics()" label="Select Topics" solo outline v-model="topic">
								</v-select>
							</v-flex>
						</v-layout>

						<v-btn color="primary" type="submit" form="form" @click.prevent="submitForm(head)" > Submit</v-btn>
						</v-form>


					</v-card>
				</v-tab-item>
      </v-tabs>

</div>
</template>


<script>
export default {
layout:"DashboardNavigationLayout",
props: {
	id: {
		type: Number,
		required: false
	},
	editQuestionMode: {
		type: Boolean,
		required: false
	},
	questions: {
		type: Object,
		required: false
	}
},
data: () => ({

		heading : ['Multiple choice' , 'Filling blanks'],


		// answer: '',
		// question: '',
		// option_1: '',
		// option_2:'',
		// option_3: '',
		// option_4: '',
		topic: '',
		topics: [],
		image: '',
		file: null,
		optionfile1: null,
		optionfile2: null,
		optionfile3: null,
		optionfile4: null,
		questionfile: null,
		items: ['Option 1','Option 2' ,'Option 3','Option 4'],
	}),
	updated() {
		// this.intiialize()
	},
	methods: {
		async intiialize() {
			const topic_response = await this.$axios.get(`/api/exams/gettopics/${this.id}`)
			for(var i=0;i<topic_response.data.data.length;i++)
			{
				this.topics.push(topic_response.data.data[i].topic_name)
			}
		},
		async setTopics() {
			const topic_response = await this.$axios.get(`/api/exams/gettopics/${this.id}`)
			this.topics = new Array()
			for(var i=0;i<topic_response.data.data.length;i++)
			{
				this.topics.push(topic_response.data.data[i].topic_name)
			}
			return this.topics
		},
		onFilePicked1(event){
			this.questions.option_5=event.target.files[0]
		},
		onFilePicked2(event){
			this.questions.option_6=event.target.files[0]
		},
		onFilePicked3(event){
			this.questions.option_7=event.target.files[0]
		},
		onFilePicked4(event){
			this.questions.option_8=event.target.files[0]
		},
		onFilePicked(event){
			this.questions.question_image=event.target.files[0]
		},

		async submitForm(type) {
			if(type=='Multiple choice')
			{
				this.questions.type="mcq"
			}
			else
			{
				this.questions.type="fillinblanks"
			}
			const formData = new FormData()
			formData.append('exam_id', this.id)
			formData.append('type', 'mcq')
			formData.append('question', this.questions.question)
			formData.append('question_image', this.questions.question_image)
			formData.append('option_1',this.questions.option_1)
			formData.append('option_5',this.questions.optionfile1)
			formData.append('option_2',this.questions.option_2)
			formData.append('option_6',this.questions.optionfile2)
			formData.append('option_3',this.questions.option_3)
			formData.append('option_7',this.questions.optionfile3)
			formData.append('option_4',this.questions.option_4)
			formData.append('option_8',this.questions.optionfile4)
			formData.append('answer',this.questions.answer)
			formData.append('topics','abc')

			formData.append('image',this.file)
			if(this.editQuestionMode==false)
			{
				const response = await this.$axios.post(`/api/exams/${this.id}/addquestions`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				if(response.data.success==true)
				{
					this.$emit('success','New Question Added')
				}
			}
			else
			{
				// const response = this.$axios.post(`/api/exams`,
				// 	formData,
				// 	{
				// 		headers: {
				// 			'Content-Type': 'multipart/form-data'
				// 		}
				// 	}
				// )
				// if(response.data.success==true)
				// {
				// 	this.$emit('success','Question updated')
				// }
			}

		}
	}
}

</script>

<style scoped>

.card-style{
  	padding : 20px 10px 50px;

}
/* .tab-style{
	padding-top: 100px
  	padding-bottom: 50px;
} */


</style>
