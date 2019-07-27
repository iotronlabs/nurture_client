<template>
<div>
  <v-container fluid>


	<v-tabs fixed-tabs left class="tab-style" dark slider-color="primary">
		<v-tab v-for="head in heading" :key="head" ripple>
			{{ head}}
		</v-tab>
          <v-tab-item v-for="n in 2" :key="n" >

            <v-card class = "card-style">
				<v-form ref="form" method="post" id="form" enctype="multipart/form-data">
              <v-subheader> Exam Name</v-subheader>
               <v-layout wrap align-center>

                   <v-flex xs12 sm6 md9 d-flex>
                       <v-select  :items="items" label="---Select exam---" solo outline>
                       </v-select>
                    </v-flex>
              </v-layout>

              <v-subheader large > Question</v-subheader>
              <v-layout  wrap v-if = "n==1">
                  <v-flex xs12 sm6 md9 d-flex>
                    <v-text-field label="Enter Question" solo outline v-model="question"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md9 >
                  <br>
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
              </v-flex>

            <!-- image upload -->
              <v-layout>
				<v-flex xs12 sm6 >
					<!-- <v-btn raised class="primary" @click="onPickFile">add image</v-btn> -->
					<input
						type="file"
						ref="fileInput"
						accept="image/*"
						@change="onFilePicked"
					>
				</v-flex>
			</v-layout>

						<!-- <v-layout row>
							<v-flex xs12 sm6>
								<img :src="editedItem.imageUrl">
							</v-flex>
						</v-layout> -->


              <v-flex xs12 sm6 md9 >
             <br>
              <h3>Option2</h3><br>
             <v-text-field
             v-model="option_2"
              type="text"
             placeholder="Enter option or upload image"
             required
             outline

           >
           </v-text-field>
          </v-flex>

          <!-- image upload -->
            <!-- <v-layout>
							<v-flex xs12 sm6 >
								<v-btn raised class="primary" @click="onPickFile">add image</v-btn>
								<input
									type="file"
									ref="fileInput"
									accept="image/*"
									@change="onFilePicked"
								>
							</v-flex>
						</v-layout> -->

          <v-flex xs12 sm6 md9 >
            <br>
            <h3>Option3</h3><br>
            <v-text-field
             v-model="option_3"
              type="text"
             placeholder="Enter option or upload image"
             required
             outline>
            </v-text-field>
          </v-flex>
          <!-- image upload -->
            <!-- <v-layout>
							<v-flex xs12 sm6 >
								<v-btn raised class="primary" @click="onPickFile">add image</v-btn>
								<input
									type="file"
									ref="fileInput"
									accept="image/*"
									@change="onFilePicked"
								>
							</v-flex>
						</v-layout>
 -->

            <v-flex xs12 sm6 md9 >
             <br>
              <h3>Option4</h3><br>
             <v-text-field
             v-model="option_4"
            	type="text"
             placeholder="Enter option or upload image"
             required
             outline

           >
           </v-text-field>
          </v-flex>
          <!-- image upload -->
            <!-- <v-layout>
							<v-flex xs12 sm6 >
								<v-btn raised class="primary" @click="onPickFile">add image</v-btn>

                <input
									type="file"
									ref="fileInput"
									accept="image/*"
									@change="onFilePicked"
								>
							</v-flex>
						</v-layout> -->

           <v-flex xs12 sm6 md9>
               <br>
          <v-select :items="items" label="Select answer" solo outline v-model="answer" >
          </v-select>


        </v-flex>

        </v-layout>
              <v-layout  wrap v-if = "n==2">
                  <v-flex xs12 sm6 md9 d-flex>
                    <v-text-field label="Enter Question" solo outline ></v-text-field>
                  </v-flex>
                  <!-- <v-flex xs12 sm6 md9 >
                  <br>
                  <h3>Option1</h3><br>
                  <v-text-field
                  v-model="a"
                    type="text"
                  placeholder="Enter option or upload image"
                  required
                  outline
                  solo
                  >
                  </v-text-field>
              </v-flex> -->
              </v-layout>
              <v-subheader large v-if = "n==2"> Answer </v-subheader>
              <v-layout v-if = "n==2">
                  <v-flex xs12 sm6 md9 d-flex>
                    <v-text-field label="Enter Answer" solo outline ></v-text-field>
                  </v-flex>

              </v-layout>

              <v-btn type="submit" form="form" @click.prevent="submitForm" > Submit</v-btn>
			  </v-form>


          </v-card>


          </v-tab-item>
      </v-tabs>


  </v-container>
</div>
</template>


<script>
export default {
layout:"DashboardNavigationLayout",
data: () => ({

		heading : ['Multiple choice' , 'Filling blanks'],


		answer: '',
		question: '',
		option_1: '',
		option_2:'',
		option_3: '',
		option_4: '',
		topics: 'a',
		image: '',
		file: null,
		items:['A','B' ,'C','D'],
		id: '1'
	}),
	methods: {
		// onPickFile()
		// {
		// 	this.$refs.fileInput.click()
		// },
		onFilePicked(event){
			// const files=event.target.files
			// let filename=files[0].name;
			// if (filename.lastIndexOf('.')<=0)
			// {
			// 	return alert('please add a valid file')
			// }
			// const fileReader=new FileReader()
			// fileReader.addEventListener ('load',() => {
			// 	this.editedItem.imageUrl=fileReader.result
			// })
			// fileReader.readAsDataURL(files[0])
			this.file=event.target.files[0]
		},
		async submitForm() {
			const formData = new FormData()
			formData.append('exam_id', this.id)
			formData.append('type', 'mcq')
			formData.append('question', this.question)
			formData.append('option_1',this.option_1)
			formData.append('option_2',this.option_1)
			formData.append('option_3',this.option_1)
			formData.append('option_4',this.option_1)
			formData.append('answer',this.answer)
			formData.append('topics','abc')

			formData.append('image',this.file)
			// formData.append('data',rawData)
			console.log(this.file)
			console.log(typeof this.file)
			console.log(formData)
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
  padding : 40px 20px 10px 50px;

}
.tab-style{
  padding-top: 100px;
  padding-bottom: 50px;
}


</style>
