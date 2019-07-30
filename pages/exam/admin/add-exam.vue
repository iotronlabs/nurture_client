<template>
<v-app >

 	<v-card class = "card-content" >
		<v-toolbar >
			<span class="toolbar-text">Add Exam</span>
		</v-toolbar>
		<v-form  ref="form" method="post" id="form" enctype="multipart/form-data">
			<v-container fluid>

				<v-layout col wrap>

				<v-flex xs12 sm6 md9 >
					<h3>Exam Name</h3><br>
					<v-text-field
					v-model="exam_name"


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
					v-model="duration"


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
						v-model="pass_mark"
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
							v-model="start_date"
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
							v-model="end_date"
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
			<v-layout>
				<v-flex xs12 sm3 md4>
					<h3>Select Subject</h3><br>
					<v-select
						v-model="subject_name"
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
						v-model="course_name"
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
						v-model="description"
						placeholder="enter terms and conditions"
					></v-textarea>
				</v-flex>
			</v-layout>

				<v-spacer></v-spacer><br>
				<v-btn round @click.prevent="submitForm" color="success" light type="submit" form="form" >Submit</v-btn>
						<v-btn  round color="primary" type="submit" form="form"  @click.prevent="reset">Clear form</v-btn>

			</v-container>
		</v-form>

	</v-card>
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
</v-app>
</template>
<script>
import { mapState } from 'vuex'
export default {
	layout:"DashboardNavigationLayout",
    data() {
        return{
			message: '',
			snackbar: false,
			timeout: 3000,

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
		// if(this.$router.params.edit == null)
		// {
		// 	this.$router.push('/exam/admin/table')
		// }
		// else
		// {
			this.initaialize()
		// }
	},
	computed: {
		...mapState({
			edit: state => state.exam.edit,
			id: state => state.exam.id
		})
	},
	methods:{
		reset () {
			this.$refs.addexam.reset()
		},
		async initaialize() {
			if(this.edit)
			{
				// console.log(Object.values(this.id))
				// console.log(typeof String(this.id))
				// const exam_response = await this.$axios.get(`/api/exams/${JSON.stringify(this.id)}/edit`)
				// console.log(exam_response.data)
			}

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
			// console.log(this.date1)
			// console.log(this.date2)
			const response = await this.$axios.post('/api/exams/addexam',{
				course_name: this.course_name,
				exam_name: this.exam_name,
				subject_name: this.subject_name,
				start_date: this.date1,
				end_date: this.date2,
				duration: this.duration,
				pass_mark: this.pass_mark,
				description: this.duration
			})
			if(response.data.success==true)
			{
				this.message = "New Exam added"
				this.course_name=''
				this.exam_name=''
				this.subject_name=''
				this.date1=new Date().toISOString().substr(0, 10)
				this.date2=new Date().toISOString().substr(0, 10)
				this.duration=''
				this.pass_mark=''
				this.description=''
				this.snackbar=true
			}
		}
	}
}
</script>
<style scoped>
.card-content{
  padding : 100px 20px 50px 20px;

}

  </style>
