<template>
<div>
	<v-toolbar flat color="lightgrey">
      	<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      	<v-spacer></v-spacer>

		<v-btn fab small class="hidden-md-and-up" v-if="deleteMode==false" color="error" @click="deleteMode=true" dark v-on="on"><font-awesome-icon :icon="['fas', 'trash-alt']"/></v-btn>
		<v-btn class="hidden-sm-and-down" v-if="deleteMode==false" color="error" @click="deleteMode=true" dark v-on="on"><font-awesome-icon :icon="['fas', 'trash-alt']"/>&nbsp;&nbsp;Delete</v-btn>

		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on }">
				<v-btn fab small class="hidden-md-and-up" color="primary"  @click="addItem" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/></v-btn>
				<v-btn class="hidden-sm-and-down" color="primary" @click="addItem" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/>&nbsp;&nbsp;Add New</v-btn>
			</template>
			<v-card>
				<v-toolbar dark color="secondary">
					<v-toolbar-title>Subject Form</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon dark @click="dialog = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
					<v-form ref="form" method="post" id="form" enctype="multipart/form-data">
						<v-container fluid>
							<v-layout>
								<v-flex xs12 sm6 md6>
									<v-text-field 
									:disabled="disabled" 
									v-model="editedItem.sub_code" 
									label="Code"
									outline>
									</v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md6>
									<v-text-field 
									:disabled="disabled" 
									v-model="editedItem.sub_name" 
									label="Subject Name"
									outline>
									</v-text-field>
								</v-flex>

								<!-- <v-flex xs12 sm6 md4>
									<v-select
										v-model="editedItem.sub_teacher"
										:items="teachers"
										:menu-props="{ maxHeight: '400' }"
										label="Select Teacher"
										multiple
									></v-select>
								</v-flex> -->
							</v-layout>
							<v-layout>
								<v-flex xs12 sm6 md12>
									<v-combobox
										v-model="editedItem.topics"
										:disabled="disabled"
										label="Enter the topics"
										multiple
										chips
										outline
									></v-combobox>

								</v-flex>
							</v-layout>
						<v-spacer></v-spacer><br>
						<v-btn @click.prevent="submitForm" color="primary" light type="submit" form="form" :disabled="disabled" >Submit</v-btn>
						<v-btn color="secondary" type="submit" form="form"  @click.prevent="reset" :disabled="disabled">Clear form</v-btn>
					</v-container>
				</v-form>
			</v-card>
		</v-dialog>
    </v-toolbar>


    <v-data-table :headers="headers" :items="sub_details" item-key="sub_code" v-model="selected" select-All class="elevation-1">
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
				<th v-if="deleteMode==false"
					v-for="header in props.headers"
					:key="header.text" class="text-xs-left"
				>

					{{ header.text }}
				</th>

				<th>
					<div v-if="deleteMode">
					<v-layout>
						<v-flex>
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
				<td class="text-xs-justify">{{ props.item.sub_code }}</td>
				<td class="text-xs-left">{{ props.item.sub_name }}</td>
				<td class="justify-center layout px-0">
					<span v-if="deleteMode==false">
						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn v-on="on">Actions &nbsp;<font-awesome-icon :icon="['fas', 'angle-down']"/></v-btn>
							</template>
							<v-list>
								<v-list-tile
									v-for="(item, index) in settings"
									:key="index"
									@click="changed(item.title)"
								>
								<v-list-tile-title @click="item.title=='Edit' ? editItem(props.item) : viewItem(props.item)"><font-awesome-icon :icon="[ item.icon.prefix, item.icon.name]"/>&nbsp;&nbsp;{{ item.title }}</v-list-tile-title>
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
</template>

<script>
export default {
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
			{ title: 'View', icon: { prefix:'far', name:'eye'} },
			{ title: 'Edit', icon: { prefix:'fas', name:'pencil-alt'} }
		],

		headers: [
		  	// { text: 'Sl_No', align: 'left', sortable: true,	value: 'sub_code'},
			{ text: 'Subject Code ', value: 'sub_code', sortable: false },
			{ text: 'Subject Name', value: 'sub_name' ,sortable: false}
		],
		rules: {
			required: v => !!v || 'Required.'
		},

		sub_details: [],
		editedIndex: -1,
		editedItem: {
			id:'',
			sub_code: '',
			sub_name: '',
			sub_teacher: [],
			topics: []
		},
		defaultItem: {
			id: '',
			sub_code: '',
			sub_name: '',
			sub_teacher: [],
			topics: []
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
		device() {
			if(this.$vuetify.breakpoint.smAndDown)
			{
				return true
			}
			else
			{
				return false
			}
		},
		reset () {
			this.$refs.form.reset()
		},
		onPickFile()
		{
			this.$refs.fileInput.click()
		},
		async initialize () {
			const sub_response = await this.$axios.get('/api/subjects')
			this.sub_details = sub_response.data
		},
		addItem() {
			this.disabled=false
		},
		async viewItem(item) {
			this.editedIndex = this.sub_details.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.disabled=true
			const topic_response= await this.$axios.get(`/api/topics/show_sub_topic/${item.id}`)
			this.editedItem.topics = new Array()
			for(var i=0; i<topic_response.data.data.length;i++)
			{
				this.editedItem.topics.push(topic_response.data.data[i].topic_name)
			}
			this.dialog=true
		},
		async editItem (item) {
			this.disabled=false
			this.editedIndex = this.sub_details.indexOf(item)
			this.editedItem = Object.assign({}, item)
			const topic_response= await this.$axios.get(`/api/topics/show_sub_topic/${item.id}`)
			this.editedItem.topics = new Array()
			for(var i=0; i<topic_response.data.data.length;i++)
			{
				this.editedItem.topics.push(topic_response.data.data[i].topic_name)
			}
			this.dialog = true
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

		async submitForm() {
			let response
			if(this.editedIndex == -1)
			{
				response = await this.$axios.post(`/api/subjects/register`,{
					sub_code: this.editedItem.sub_code,
					sub_name: this.editedItem.sub_name,
					topics: this.editedItem.topics
				})
				if(response.data.success==true)
				{
					// this.sub_details.push(this.editedItem)
					this.dialog = false
					this.message="New Subject added successfully"
					this.snackbar=true
				}
			}
			else
			{
				var sub_id= this.editedItem.id
				response = await this.$axios.post(`/api/subjects/${sub_id}`,{
					sub_code: this.editedItem.sub_code,
					sub_name: this.editedItem.sub_name,
					topics: this.editedItem.topics
				})
				if(response.data.success==true)
				{
					this.dialog=false
					this.message="Subject successfully updated"
					this.snackbar=true
				}
			}
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
</style>

