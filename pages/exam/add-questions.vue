<template>
<div>
  <v-container fluid>

    <v-tabs class="tab-style" v-model="active" color="cyan" dark slider-color="yellow" >
          <v-tab v-for="head in heading" :key="head" ripple >
              {{head}}

          </v-tab>
          <v-tab-item v-for="n in 2" :key="n" >

            <v-card class = "card-style">

              <v-subheader> Exam Name</v-subheader>
               <v-layout wrap align-center>

                   <v-flex xs12 sm6 md9 d-flex>
                       <v-select :items="items" label="---Select exam---" solo outline>
                       </v-select>
                    </v-flex>
              </v-layout>
              
              <v-subheader large > Question</v-subheader>
              <v-layout  wrap v-if = "n==1">
                  <v-flex xs12 sm6 md9 d-flex>
                    <v-text-field label="Enter Question" solo outline ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md9 >
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
              </v-flex>

            <!-- image upload -->
              <v-layout>
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
       
						<!-- <v-layout row>
							<v-flex xs12 sm6>
								<img :src="editedItem.imageUrl">
							</v-flex>
						</v-layout> -->


              <v-flex xs12 sm6 md9 >
             <br>
              <h3>Option2</h3><br>
             <v-text-field
             v-model="a"
              type="text"
             placeholder="Enter option or upload image"                  
             required
             outline
         
           >
           </v-text-field>
          </v-flex>

          <!-- image upload -->
            <v-layout>
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

          <v-flex xs12 sm6 md9 >
            <br>
            <h3>Option3</h3><br>
            <v-text-field
             v-model="a"
              type="text"
             placeholder="Enter option or upload image"                 
             required
             outline>
            </v-text-field>
          </v-flex>
          <!-- image upload -->
            <v-layout>
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


            <v-flex xs12 sm6 md9 >
             <br>
              <h3>Option4</h3><br>
             <v-text-field
             v-model="a"
              type="text"
             placeholder="Enter option or upload image"         
             required
             outline
         
           >
           </v-text-field>
          </v-flex>
          <!-- image upload -->
            <v-layout>
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
            
           <v-flex xs12 sm6 md9>
               <br>
          <v-select :items="items" label="Select answer" solo outline  >
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

              <v-btn > Submit</v-btn>

             
          </v-card>


          </v-tab-item>
      </v-tabs>


  </v-container>
</div>
</template>


<script>
export default{
  layout:"DashboardNavigationLayout",
  data: () => ({

 heading : ['Multiple choice' , 'Filling blanks'],


 answer:[],
 items:['A','B' ,'C','D'],

  })
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
