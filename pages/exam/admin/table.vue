<template>
	<v-content class="global-font">
		<v-container-fluid>
			<div class="padding-style">
					<!-- <br><br><br><br> -->
				<v-toolbar flat color="lightgrey">
					<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
					<v-spacer></v-spacer>
					<v-btn fab small v-if="deleteMode==false && this.$vuetify.breakpoint.smAndDown==true" color="error" @click="deleteMode=true" dark v-on="on"><font-awesome-icon :icon="['fas', 'trash-alt']"/></v-btn>
					<v-btn v-if="deleteMode==false && this.$vuetify.breakpoint.mdAndUp==true" color="error" @click="deleteMode=true" dark v-on="on"><font-awesome-icon :icon="['fas', 'trash-alt']"/>&nbsp;&nbsp;Delete Exam</v-btn>
					<!-- <nuxt-link :to="{ name: 'exam-admin-add-exam', params: { edit: false }}"><v-btn fab small v-if="this.$vuetify.breakpoint.xs==true" color="primary" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/></v-btn></nuxt-link>
					<nuxt-link :to="{ name: 'exam-admin-add-exam', params: { edit: false }}"><v-btn v-if="this.$vuetify.breakpoint.smAndUp==true" color="primary" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/>&nbsp;&nbsp;Add exam</v-btn></nuxt-link> -->

					<v-dialog v-model="dialogExam" fullscreen hide-overlay transition="dialog-bottom-transition">
						<template v-slot:activator="{ on }">
							<v-btn fab small class="hidden-md-and-up" color="primary"  @click="addItem" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/></v-btn>
							<v-btn class="hidden-sm-and-down" color="primary" @click="addItem" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/>&nbsp;&nbsp;Add Exam</v-btn>
						</template>
						<v-card>
							<v-toolbar dark color="primary">
								<v-toolbar-title>Exam Form</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-btn icon dark @click="dialogExam = false">
									<v-icon>close</v-icon>
								</v-btn>
							</v-toolbar>
							<AddExam :item="editedItem" :editMode="editMode" @success="success" />
						</v-card>
					</v-dialog>
				</v-toolbar>


				<v-data-table :headers="headers" :items="exam_details" v-model="selected" select-All class="elevation-1">
					<template v-slot:headers="props">
						<tr>
							<th v-if="deleteMode==true">
								<v-checkbox
									color="primary"
									:input-value="props.all"
									:indeterminate="props.indeterminate"

									hide-details
									@click.stop="toggleAll"

								></v-checkbox>
							</th>
							<th
								v-if="deleteMode==false"
								v-for="header in props.headers"
								:key="header.text"
							>

								{{ header.text }}
							</th>

							<th>
								<div v-if="deleteMode">
								<v-layout>
									<v-flex >
										{{selected.length}} rows selected
										<v-btn small fab class="hidden-md-and-up" color="error" @click="deleteItem"><font-awesome-icon :icon="['far', 'check-circle']"/></v-btn>
										<v-btn class="hidden-sm-and-down" color="error" @click="deleteItem"><font-awesome-icon :icon="['far', 'check-circle']"/>&nbsp;&nbsp;Confirm</v-btn>
										<v-btn small fab class="hidden-md-and-up btn-cancel" color="info" @click="deleteMode=false" ><font-awesome-icon :icon="['far', 'times-circle']"/></v-btn>
										<v-btn class="hidden-sm-and-down btn-cancel" color="info" @click="deleteMode=false" ><font-awesome-icon :icon="['far', 'times-circle']"/>&nbsp;&nbsp;Cancel</v-btn>
									</v-flex>
								</v-layout>
							</div>
							</th>
						</tr>
					</template>
					<template v-slot:items="props">
						<tr :active="props.selected" @click="props.selected = !props.selected">
							<td v-if="deleteMode">
								<v-checkbox
									color="primary"
									hide-details
									:input-value="props.selected"
								></v-checkbox>
							</td>
							<td class="text-xs-left">{{ props.item.id }}</td>
							<td class="text-xs-left">{{ props.item.exam_name }}</td>
							<td class="text-xs-left">{{ props.item.course_name }}</td>
							<td class="text-xs-left">{{ props.item.subject_name }}</td>
							<!-- <td class="text-xs-left">{{ props.item.duration }}</td> -->
							<td class="text-xs-left">{{ props.item.start_date }}</td>
							<td class="text-xs-left">{{ props.item.end_date }}</td>
							<!-- <td class="text-xs-left">{{ props.item.pass_mark }}</td> -->
							<td class="text-xs-left">{{ props.item.status }}</td>
							<!--<td >  <v-select :items="items" label="Solo field" solo></v-select></td>-->
							<td class="justify-center layout px-0">
								<span v-if="deleteMode==false">
									<!-- dropdown action menu -->
									<v-menu offset-y>
										<template v-slot:activator="{ on }">
											<v-btn v-on="on">Actions &nbsp;<font-awesome-icon :icon="['fas', 'angle-down']"/></v-btn>
										</template>
										<v-list>
											<v-list-tile
												v-for="(item, index) in settings"
												:key="index"
												@click="setAction(item,props.item)"
											>

												<v-list-tile-title >
													<font-awesome-icon :icon="[ item.icon.prefix, item.icon.name]" />
													&nbsp;{{ item.title }}</v-list-tile-title>
											</v-list-tile>
										</v-list>
										</v-menu>
								</span>
							</td>
						</tr>
					</template>
					<template v-slot:no-data>
						<div>No data </div>
					</template>
				</v-data-table>


			</div>
		</v-container-fluid>

		<v-dialog v-model="dialogAddQuestion" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-toolbar dark color="primary">
				<v-toolbar-title>Add Question Form</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon dark @click="dialogAddQuestion = false">
					<v-icon>close</v-icon>
				</v-btn>
			</v-toolbar>
			<AddQuestions :id="editedItem.id" :editQuestionMode="false" :questions="question_list" @success="success" />
		</v-dialog>

		<v-dialog v-model="dialogViewQuestion" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-toolbar dark color="primary">
				<v-toolbar-title>Edit Question</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon dark @click="dialogViewQuestion = false">
					<v-icon>close</v-icon>
				</v-btn>
			</v-toolbar>
			<ViewQuestions :questions="questions"/>
		</v-dialog>

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
	</v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddExam from '@/components/Exam/AddExam'
import AddQuestions from '@/components/Exam/AddQuestions'
import ViewQuestions from '@/components/Exam/ViewQuestions'
export default {
	layout: 'DashboardNavigationLayout',
	components: {
		AddExam,
		AddQuestions,
		ViewQuestions
	},
    data: () => ({
		dialogExam: false,
		dialogAddQuestion: false,
		dialogViewQuestion: false,

		search: '',
		message: '',
		snackbar: false,
		timeout: 3000,

		selectedAction: '',
		editMode: false,
		deleteMode: false,
		disabled: false,
		selected: [],
		settings :
		[
			// page is a flag denoting whether action leads to new page
			{ page: false, title: 'Make Inactive', icon: { prefix:'fas', name:'ban'}  },
            { page: true, title: 'Edit Exam',  icon: { prefix:'fas', name:'pencil-alt'} },
            { page: true, title: 'View Questions', icon: { prefix:'far', name:'eye'}},
            { page: true, title: 'Add questions', icon: { prefix:'fas', name:'plus'} }
            // { page: false, title: 'Drop Exam', icon: { prefix:'fas', name:'trash-alt'} }
        ],
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],

		headers: [
			  // { text: 'Sl_No', align: 'left', sortable: true,	value: 'sub_code'},
			{ text: 'Id', value: 'id', sortable: false },
			{ text: 'Name ', value: 'exam_name', sortable: false },
			{ text: 'Course', value: 'course_name' ,sortable: false},
			{ text: 'Subject', value: 'subject_name', sortable: false },
			// { text: 'Duration', value: 'duration', sortable: false },
			{ text: 'Start Date', value: 'start_date', sortable: false },
			{ text: 'End Date', value: 'end_date', sortable: false },
            // { text: 'Passmark', value: 'pass_mark', sortable: false },
            { text: 'Status', value: 'status', sortable: false }
		],
		rules: {
			required: v => !!v || 'Required.'
		},

		exam_details: [],
		questions: [],

		editedIndex: -1,
		editedItem: {
			id: '',
			exam_name:'' ,
            duration:'',
            pass_mark:'',
			start_date:'',
			end_date: '',
            description: '',
			subject_name: '',
		},
		defaultItem: {
			id:'',
			t_name: '',
			t_cat: '',
			t_sub :'',
            t_dead: '',
            t_id:'',
            t_stat :'',
            t_act : ''
		},
		question_list: {
			question_id: '',
            exam_id: '',
            type: '',
            question: '',
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            option_5: null,
            option_6: null,
            option_7: null,
            option_8: null,
            answer: '',
            topics: '',
            question_image: null,
		}
	}),
	computed: {
		formTitle () {
			return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
		}
	},
	watch: {
	dialog (val) {
			val || this.close()
		}
	},
	created () {
		this.initialize()
	},
    methods: {
		async initialize () {
			const exam_response = await this.$axios.get('/api/exams')
			this.exam_details = exam_response.data
		},
		addItem() {
			this.disabled=false
			this.editMode = false
			this.editedItem=Object.assign({},{})
			this.dialogExam = true
		},

		async deleteItem () {
			var i
			let response
			let id
			let index
			for(i=0;i<(this.selected.length);i++)
			{
				id=this.selected[i].id
				response = await this.$axios.delete(`/api/exams/${id}/delete`)
				if(response.data.success==true)
				{
					if(this.selected.length!=1)
					{
						this.message=`${this.selected.length} item deleted`
					}
					else
					{
						this.message=`${this.selected.length} items deleted`
					}
					this.snackbar=true
				}
				index=this.exam_details.map((e) => e.id).indexOf(id)
				this.exam_details.splice(index,1)
			}
			this.deleteMode=false
		},
		close () {
			this.dialog = false
			setTimeout(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
			}, 300)
		},
		save () {
			if (this.editedIndex > -1) {
				Object.assign(this.sub_details[this.editedIndex], this.editedItem)
			} else {
				this.sub_details.push(this.editedItem)
			}
			this.close()
		},
		toggleAll () {
			if (this.selected.length) this.selected = []
			else this.selected = this.exam_details.slice()
		},
		async setAction(item,details) {
			if(item.title == 'Make Inactive')
			{
				// console.log('make inactive')
				const response = await this.$axios.post(`/api/exams/${details.id}/deactivate`,{
					status: 'Inactive'
				})
				if(response.data.success)
				{
					this.message = "Exam Deactivated"
					this.snackbar = true
				}
			}
			else if(item.title == 'Edit Exam')
			{
				this.editMode = true
				this.editedIndex = this.exam_details.indexOf(details)
				this.editedItem = Object.assign({},details)
				this.dialogExam = true
			}
			else if(item.title == 'View Questions')
			{
				this.editMode = true
				this.editedIndex = this.exam_details.indexOf(details)
				this.editedItem = Object.assign({},details)
				const ques_response = await this.$axios.get(`/api/exams/${this.editedItem.id}/question`)
				this.questions = new Array()
				for(var i=0;i<ques_response.data.data.length;i++)
				{
					this.questions.push(ques_response.data.data[i])
				}

				this.dialogViewQuestion = true
			}
			else if(item.title == 'Add questions')
			{
				this.editMode = true
				this.editedIndex = this.exam_details.indexOf(details)
				this.editedItem = Object.assign({},details)
				this.dialogAddQuestion = true
			}
		},
		success(message) {
			this.message = message
			this.dialogExam = false
			this.dialogAddQuestion = false
			this.snackbar = true
		}
    }
}
</script>

<style scoped>
.select-action
{
	width: 100%;
	padding-left: 20%;
	padding-right: 20%;
}
.padding-style{
	padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
}

</style>

