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
								<v-text-field label="Enter Question" solo outline v-model="question"></v-text-field>
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
									v-model="option_1"
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
									v-model="option_2"
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
									v-model="option_3"
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
									v-model="option_4"
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
								<v-select :items="items" label="Select answer" solo outline v-model="answer" >
								</v-select>
							</v-flex>
	        			</v-layout>

						<v-layout row wrap v-if = "n==2">
							<v-flex xs12 sm12 md9 >
								<v-text-field label="Enter Answer" solo outline ></v-text-field>
							</v-flex>
						</v-layout>

						<v-layout row wrap>
							<v-flex xs12 sm12 md9>
								<v-select :items="items" label="Select Topics" solo outline v-model="topics">
								</v-select>
							</v-flex>
						</v-layout>

						<v-btn type="submit" form="form" @click.prevent="submitForm" > Submit</v-btn>
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
		type: String,
		required: true
	}
},
data: () => ({

		heading : ['Multiple choice' , 'Filling blanks'],


		answer: '',
		question: '',
		option_1: '',
		option_2:'',
		option_3: '',
		option_4: '',
		topics: '',
		image: '',
		file: null,
		optionfile1: null,
		optionfile2: null,
		optionfile3: null,
		optionfile4: null,
		questionfile: null,
		items:['Option 1','Option 2' ,'Option 3','Option 4'],
	}),
	methods: {
		onFilePicked1(event){
			this.optionfile1=event.target.files[0]
		},
		onFilePicked2(event){
			this.optionfile2=event.target.files[0]
		},
		onFilePicked3(event){
			this.optionfile3=event.target.files[0]
		},
		onFilePicked4(event){
			this.optionfile4=event.target.files[0]
		},
		onFilePicked(event){
			this.questionfile=event.target.files[0]
		},

		async submitForm() {
			const formData = new FormData()
			formData.append('exam_id', this.id)
			formData.append('type', 'mcq')
			formData.append('question', this.question)
			formData.append('option_1',this.option_1)
			formData.append('option_1',this.optionfile1)
			formData.append('option_2',this.option_2)
			formData.append('option_2',this.optionfile2)
			formData.append('option_3',this.option_3)
			formData.append('option_3',this.optionfile3)
			formData.append('option_4',this.option_4)
			formData.append('option_4',this.optionfile4)
			formData.append('answer',this.answer)
			formData.append('topics','abc')

			formData.append('image',this.file)
			const response = await this.$axios.post(`/api/exams/${this.id}/addquestions`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
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
