<template>
<div class="form-add-exam">
	<v-form  ref="form" method="post" id="form" enctype="multipart/form-data">
		<v-container fluid>

			<v-layout row wrap>

			<v-flex xs12 sm6 md9 >
				<h3>Exam Name</h3><br>
				<v-text-field
				v-model="item.exam_name"


				type="text"
				placeholder="Enter exam name"
				required
				outline
				solo

			>
			</v-text-field>
			</v-flex>
			<v-flex xs12 sm6 md9 >
				<h3>Exam Duration (Minutes)</h3><br>
				<v-text-field
				v-model="item.duration"


				type="number"
				placeholder="Enter exam duration"
				required
				outline
				solo

			>
			</v-text-field>
			</v-flex>
			<v-flex xs12 sm6 md9 >
				<h3>Passmark (%)</h3><br>
				<v-text-field
					v-model="item.pass_mark"
					placeholder="Enter passmark"

					type="number"

					outline
					solo
					required

				>
				</v-text-field>
			</v-flex>
			</v-layout>
			<h3>Exam Dates</h3>
			<v-layout>
				<v-flex xs12 sm6 md4>
					<v-menu
						ref="menu1"
						v-model="item.start_date"
						:close-on-content-click="false"
						:nudge-right="40"
						:return-value.sync="date1"
						lazy
						transition="scale-transition"
						offset-y
						full-width
						min-width="290px"
					>
					<template v-slot:activator="{ on }">
						<v-text-field
						v-model="date1"
						label="Start Date"
						placeholder="yyyy-mm-dd"
						readonly
						v-on="on"
						></v-text-field>
					</template>
					<v-date-picker v-model="date1" no-title scrollable>
						<v-spacer></v-spacer>
						<v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
						<v-btn flat color="primary" @click="$refs.menu1.save(date1)">OK</v-btn>
					</v-date-picker>
				</v-menu>
				</v-flex>

				<v-flex xs12 sm6 md4 offset-md1>
					<v-menu
						ref="menu2"
						v-model="item.end_date"
						:close-on-content-click="false"
						:nudge-right="40"
						:return-value.sync="date2"
						lazy
						transition="scale-transition"
						offset-y
						full-width
						min-width="290px"
					>
					<template v-slot:activator="{ on }">
						<v-text-field
						v-model="date2"
						label="End Date"
						placeholder="yyyy-mm-dd"
						readonly
						v-on="on"
						></v-text-field>
					</template>
					<v-date-picker v-model="date2" no-title scrollable>
						<v-spacer></v-spacer>
						<v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
						<v-btn flat color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
					</v-date-picker>
				</v-menu>
				</v-flex>
			</v-layout>
		<v-layout row wrap>
			<v-flex xs12 sm3 md4>
				<h3>Select Subject</h3><br>
				<v-select
					v-model="item.subject_name"
					:items="subjects"
					label="Select subject"
					outline
					solo
				>
				</v-select>
			</v-flex>
			<v-flex xs12 sm3 md4 offset-md1>
				<h3>Select Course</h3><br>
				<v-select
					v-model="item.course_name"
					:items="courses"
					label="Select Course"
					outline
					solo
				>
				</v-select>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
			<v-flex xs12 sm6 md9>
				<h3>Terms and Conditions</h3><br>
				<v-textarea
					outline
					solo
					v-model="item.description"
					placeholder="enter terms and conditions"
				></v-textarea>
			</v-flex>
		</v-layout>

			<v-spacer></v-spacer><br>
			<v-btn round @click.prevent="submitForm" color="success" light type="submit" form="form" >Submit</v-btn>
			<v-btn  round color="primary" type="submit" form="form"  @click.prevent="reset">Clear form</v-btn>

		</v-container>
	</v-form>
</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object
		},
		editMode: {
			type: Boolean
		}
	},
	data() {
	    return{
			date1: new Date().toISOString().substr(0, 10),
			date2: new Date().toISOString().substr(0, 10),
			menu1: false,
			menu2: false,
            exam_name:'' ,
            duration:'',
            pass_mark:'',
			start_date:'',
			end_date: '',
            description: '',
			subject_name: '',

			subjects:[],

            course_name: '',
            courses:[]
        }
	},
	created() {
		this.initaialize()
	},
	methods:{
		reset () {
			this.$refs.addexam.reset()
		},
		async initaialize() {
			const sub_response = await this.$axios.get('/api/subjects')
			for(var i=0;i<sub_response.data.length;i++)
			{
				this.subjects.push(sub_response.data[i].sub_name)
			}
			const course_response = await this.$axios.get('/api/courses')
			for(var i=0;i<course_response.data.length;i++)
			{
				this.courses.push(course_response.data[i].course_name)
			}
		},
		async submitForm() {
			// console.log(this.editMode)
			if(this.editMode==false)
			{
				const response = await this.$axios.post('/api/exams/addexam',{
					course_name: this.item.course_name,
					exam_name: this.item.exam_name,
					subject_name: this.item.subject_name,
					start_date: this.date1,
					end_date: this.date2,
					duration: this.item.duration,
					pass_mark: this.item.pass_mark,
					description: this.item.duration
				})
				if(response.data.success==true)
				{
					this.$emit('success','New Exam Added')
				}
			}
			else
			{
				const response = await this.$axios.post(`/api/exams/${this.item.id}/update`,{
					course_name: this.item.course_name,
					exam_name: this.item.exam_name,
					subject_name: this.item.subject_name,
					start_date: this.date1,
					end_date: this.date2,
					duration: this.item.duration,
					pass_mark: this.item.pass_mark,
					description: this.item.duration
				})
				if(response.data.success==true)
				{
					this.$emit('success','Exam Updated')
				}
			}
		}
	}
}
</script>

<style scoped>
.form-add-exam{
  padding : 20px 50px 20px;

}
</style>
