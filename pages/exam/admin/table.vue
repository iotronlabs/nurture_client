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
					<nuxt-link :to="{ name: 'exam-admin-add-exam', params: { edit: false }}"><v-btn fab small v-if="this.$vuetify.breakpoint.xs==true" color="primary" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/></v-btn></nuxt-link>
					<nuxt-link :to="{ name: 'exam-admin-add-exam', params: { edit: false }}"><v-btn v-if="this.$vuetify.breakpoint.smAndUp==true" color="primary" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/>&nbsp;&nbsp;Add exam</v-btn></nuxt-link>
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
							<td class="text-xs-left">{{ props.item.duration }}</td>
							<td class="text-xs-left">{{ props.item.start_date }}</td>
							<td class="text-xs-left">{{ props.item.end_date }}</td>
							<td class="text-xs-left">{{ props.item.pass_mark }}</td>
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
											>

											<!-- <span @click.native="item.title == 'Edit Exam' ? setExamId : ''"> -->
												<nuxt-link @click.native="item.page ? setExamId(props.item.id) : ''" :to="{name: item.link }">
												<!-- <v-list-tile-title @click="item.title=='Edit' ? editItem(props.item) : viewItem(props.item)">{{ item.title }}</v-list-tile-title> -->
												<v-list-tile-content><font-awesome-icon :icon="[ item.icon.prefix, item.icon.name]"/>{{ item.title }}</v-list-tile-content>
												</nuxt-link>
											<!-- </span> -->

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
			</div>
		</v-container-fluid>
	</v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    layout: 'DashboardNavigationLayout',
    data: () => ({
		dialog: false,
		search: '',
		message: '',
		snackbar: false,
		timeout: 3000,

		selectedAction: '',
		config: ['View','Edit'],
		viewMode: false,
		editMode: false,
		deleteMode: false,
		disabled: false,
		selected: [],
		settings :
		[
			// page is a flag denoting whether action leads to new page
			{ page: false, title: 'Make Inactive', icon: { prefix:'fas', name:'ban'}  },
            { page: true, title: 'Edit Exam', link: 'exam-admin-add-exam', icon: { prefix:'fas', name:'pencil-alt'} },
            { page: true, title: 'View Questions', link:"/exam/admin/teacher-exam" , icon: { prefix:'far', name:'eye'}},
            { page: true, title: 'Add questions ', link:"/exam/admin/add-questions", icon: { prefix:'fas', name:'plus'} },
            { page: false, title: 'Drop Exam', icon: { prefix:'fas', name:'trash-alt'} }
        ],
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],

		headers: [
			  // { text: 'Sl_No', align: 'left', sortable: true,	value: 'sub_code'},
			{ text: 'Id', value: 'id', sortable: false },
			{ text: 'Name ', value: 'exam_name', sortable: false },
			{ text: 'Course', value: 'course_name' ,sortable: false},
			{ text: 'Subject', value: 'subject_name', sortable: false },
			{ text: 'Duration', value: 'duration', sortable: false },
			{ text: 'Start Date', value: 'start_date', sortable: false },
			{ text: 'End Date', value: 'end_date', sortable: false },
            { text: 'Passmark', value: 'pass_mark', sortable: false },
            { text: 'Status', value: 'status', sortable: false }
		],
		rules: {
			required: v => !!v || 'Required.'
		},

		exam_details: [],

		editedIndex: -1,
		editedItem: {
			id:'',
			t_name: '',
			t_cat: '',
			t_sub :'',
            t_dead: '',
            t_id:'',
            t_stat :'',
            t_act : ''
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
		}
	}),
	computed: {
		...mapState({
			exam: state => state.exam.test
		}),
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
		...mapActions('exam',['getId']),
		async initialize () {
			console.log(this.exam)
			const exam_response = await this.$axios.get('/api/exams')
			this.exam_details = exam_response.data
			console.log(this.exam_details)
		},
		addItem() {
			this.disabled=false
		},

		async deleteItem () {
			var i
			let response
			let id
			let index
			for(i=0;i<(this.selected.length);i++)
			{
				id=this.selected[i].sub_code
				response = await this.$axios.delete(`/api/subjects/${id}`)
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
				index=this.sub_details.map((e) => e.sub_code).indexOf(id)
				this.sub_details.splice(index,1)
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
		changed(value) {
			this.selectedAction = value
			if(value=='Edit')
			{
				this.editMode=true
				this.viewMode=false
			}
			else if(value=='View')
			{
				this.viewMode=true
				this.editMode=false
			}
		},
		toggleAll () {
			if (this.selected.length) this.selected = []
			else this.selected = this.sub_details.slice()
		},
		setExamId(id) {
			this.getId(id)
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

