<template>
<div>
	<v-toolbar flat color="lightgrey">
      	<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      	<v-spacer></v-spacer>

		<v-btn fab small class="hidden-md-and-up" v-if="deleteMode==false" color="error" @click="deleteMode=true" dark v-on="on"><font-awesome-icon :icon="['fas', 'trash-alt']"/></v-btn>
		<v-btn class="hidden-sm-and-down" v-if="deleteMode==false" color="error" @click="deleteMode=true" dark v-on="on"><font-awesome-icon :icon="['fas', 'trash-alt']"/>&nbsp;&nbsp;Delete</v-btn>

		<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
			<template v-slot:activator="{ on }">
				<v-btn fab small class="hidden-md-and-up" color="primary"  @click="addItem" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/></v-btn>
				<v-btn class="hidden-sm-and-down" color="primary" @click="addItem" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/>&nbsp;&nbsp;Add New</v-btn>
			</template>
			<v-card>
				<v-toolbar dark color="secondary">
					<v-toolbar-title>Subject Mentor Form</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark @click="dialog = false">
						<v-icon>close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-form ref="form" method="post" id="form" enctype="multipart/form-data">
					<v-container fluid>
						<v-layout>
							<v-flex xs12 sm6 >
								<h3>Add Image</h3><br>
								<input
									type="file"
									ref="fileInput"
									accept="image/*"
									@change="onFilePicked"
								>
							</v-flex>
						</v-layout>
						
						<v-layout row v-if="editedItem.imageUrl!=''">
							<v-flex xs12 sm6>
								<img :src="editedItem.imageUrl" width="100%" height="100%">
							</v-flex>
						</v-layout>

						<v-layout row wrap>

							<v-flex xs12 sm6 md6 >
								<v-text-field
									v-model="editedItem.faculty_head_fname"
									:rules="[rules.required]"
									label="First Name"
									type="text"
									
									required
									:disabled="disabled"
									outline
								>
								</v-text-field>
							</v-flex>

							<v-flex xs12 sm6 md6>
								<v-text-field
									v-model="editedItem.faculty_head_surname"
									type="text"
									label="Last Name"
									
									:disabled="disabled"
									outline
								>
								</v-text-field>
							</v-flex>
						</v-layout>
						<v-layout  wrap>
							<v-flex xs12 sm6 md6>
									<v-radio-group v-model="editedItem.faculty_head_gender" label="Gender">
									<v-radio
										v-for="gender in genders"
										:key="gender.value"
										:label="gender.label"
										:value="gender.value"
										:disabled="disabled"
										color="primary"
									></v-radio>
								</v-radio-group>
							</v-flex>

							<v-flex xs12 sm6 md6>
								<v-menu
									ref="menu"
									v-model="editedItem.faculty_head_dob"
									:close-on-content-click="false"
									:nudge-right="40"
									:return-value.sync="date"
									lazy
									transition="scale-transition"
									offset-y
									full-width
									min-width="290px"
									:disabled="disabled"
									outline
								>
									<template v-slot:activator="{ on }">
										<v-text-field
										v-model="date"
										label="Date of Birth"
										placeholder="yyyy-mm-dd"
										readonly
										v-on="on"
										outline
										></v-text-field>
									</template>
									<v-date-picker v-model="date" no-title scrollable color="primary">
										<v-spacer></v-spacer>
										<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
										<v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
									</v-date-picker>
								</v-menu>
							</v-flex>
						</v-layout>

						<!-- email -->
						<v-layout row wrap >
							<v-flex xs12 sm12 md6>
								<v-text-field
									name="email"
									type="email"
									v-model="editedItem.faculty_head_email"
									:rules="[rules.required,rules.emailValid]"
									label=" Email ID"
									
									autocomplete="off"
									required
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
							<!-- contact  -->
							<v-flex xs12 sm12 md6>
								<v-text-field
									v-model="editedItem.faculty_head_contact"
									type="tel"
									label="Contact no"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
						</v-layout>

						<!-- address   address pincode state-->
							<v-flex xs12 sm12 md12>
								<v-text-field
									name="streetaddress"
									type="text"
									v-model="editedItem.faculty_head_address"
									label=" Address"
									
									autocomplete="off"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
						<br>
						<v-layout row wrap>
							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.faculty_head_address_city"
									type="text"
									label="City"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.faculty_head_address_pin"
									type="text"
									label="Pincode"
									:disabled="disabled"
									outline
								> </v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-select
									v-model="editedItem.faculty_head_address_state"
									:items="states"
									label="State"
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>
						</v-layout>

						<v-spacer></v-spacer><br>
						<v-btn large @click.prevent="submitForm" color="primary" light type="submit" form="form" :disabled="disabled" >Submit</v-btn>
						<v-btn large  color="secondary" type="submit" form="form"  @click.prevent="reset" :disabled="disabled">Clear form</v-btn>
					</v-container>
				</v-form>
			</v-card>
		</v-dialog>
    </v-toolbar>


    <v-data-table :headers="headers" :items="user_details" item-key="faculty_head_id" v-model="selected" select-All class="elevation-1">
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
				<td class="text-xs-center">{{ props.item.faculty_head_id }}</td>
				<td class="text-xs-center">{{ props.item.faculty_head_fname + ' ' +  props.item.faculty_head_surname}}</td>
				<td class="text-xs-center">{{ props.item.faculty_head_dob }}</td>
				<td class="text-xs-center">{{ props.item.faculty_head_email }}</td>
				<td class="text-xs-center">{{ props.item.faculty_head_contact }}</td>
				<td class="text-xs-center">{{ props.item.faculty_head_address_state }}</td>
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
			{ title: 'Set as Inactive', icon: { prefix:'fas', name:'ban'} },
			{ title: 'Edit', icon: { prefix:'fas', name:'pencil-alt'} },
			{ title: 'Delete', icon: { prefix:'fas', name:'trash-alt'} }
		],

		headers: [
		  	{ text: 'Sl_No', align: 'left', sortable: true,	value: 'faculty_head_id'},
			{ text: 'Name', sortable: false},
			{ text: 'Date of birth ', value: 'faculty_head_dob', sortable: false },
			{ text: 'Email', value: 'faculty_head_email', sortable: false },
			{ text: 'Contact Number', value: 'faculty_head_contact', sortable: false },
			{ text: 'Status', value: 'faculty_head_address_state', sortable: false }
		],
		date: new Date().toISOString().substr(0, 10),
		menu: false,
		image:null,
		states:[
			'Arunachal Pradesh','Assam', 'Bihar', 'Chhattisgarh' ,'Goa', 'Gujarat', 'Haryana' ,
			'Himachal Pradesh', 'Jammu and Kashmir',
			'Jharkhand' ,'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra' ,'Manipur', 'Meghalaya ',
			'Mizoram', 'Nagaland', 'Odisha', 'Punjab','Rajasthan',
			'Sikkim', 'TamilNadu' ,'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',' West Bengal'
		],
		genders: [
			{label: 'Male', value: 'M'},
			{label: 'Female',value: 'F'},
			{label: 'Others',value: 'O'}
		],

		subjects: [],

		rules: {
			required: v => !!v || 'Required.',
			emailValid : v=> /.+@.+/.test(v) || 'E-mail must be valid'
		},

		user_details: [],
		editedIndex: -1,
		editedItem: {
			faculty_head_id: '',
			faculty_head_fname: '',
			faculty_head_surname: '',
			faculty_head_email: '',
			faculty_head_gender: '',
			faculty_head_contact: '',
			faculty_head_dob: '',
			faculty_head_address_city: '',
			faculty_head_address: '',
			faculty_head_address_pin: '',
			faculty_head_address_state: '',
			faculty_head_profile_picture:null,
			imageUrl:'',
		},
		defaultItem: {
			faculty_head_id: '',
			faculty_head_fname: '',
			faculty_head_surname: '',
			faculty_head_email: '',
			faculty_head_gender: '',
			faculty_head_contact: '',
			faculty_head_dob: '',
			faculty_head_address: '',
			faculty_head_address_city: '',
			faculty_head_address_pin: '',
			faculty_head_address_state: '',
			image:null,
			imageUrl:'',
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
		reset () {
			this.$refs.form.reset()
		},
		onPickFile()
		{
			this.$refs.fileInput.click()
		},
		onFilePicked(event){
			const files=event.target.files
			let filename=files[0].name;
			if (filename.lastIndexOf('.')<=0)
			{
				return alert('please add a valid file')
			}
			const fileReader=new FileReader()
			fileReader.addEventListener ('load',() => {
				this.editedItem.imageUrl=fileReader.result
			})
			fileReader.readAsDataURL(files[0])
			this.editedItem.faculty_head_profile_picture=event.target.files[0]
		},
		async initialize () {
			const head_faculty_response = await this.$axios.get('/api/facultyheads')
			this.user_details = head_faculty_response.data
		},
		addItem() {
			this.disabled=false
		},
		viewItem(item) {
			this.editedIndex = this.user_details.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.disabled=true
			this.dialog=true
		},
		editItem (item) {
			this.disabled=false
			this.editedIndex = this.user_details.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},
		async deleteItem () {
			var i
			let response
			let id
			let index
			for(i=0;i<(this.selected.length);i++)
			{
				id=this.selected[i].faculty_head_id
				response = await this.$axios.delete(`/api/facultyheads/${id}`)
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
				index=this.user_details.map((e) => e.faculty_head_id).indexOf(id)
				this.user_details.splice(index,1)
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
				Object.assign(this.user_details[this.editedIndex], this.editedItem)
			} else {
				this.user_details.push(this.editedItem)
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
			else this.selected = this.user_details.slice()
		},

		async submitForm() {
			let response
			const formData = new FormData()
			formData.append('faculty_head_fname',this.editedItem.faculty_head_fname)
			formData.append('faculty_head_mname',this.editedItem.faculty_head_mname)
			formData.append('faculty_head_surname',this.editedItem.faculty_head_surname)
			formData.append('faculty_head_email',this.editedItem.faculty_head_email)
			formData.append('faculty_head_gender',this.editedItem.faculty_head_gender)
			formData.append('password',this.editedItem.faculty_head_contact)
			formData.append('faculty_head_contact',this.editedItem.faculty_head_contact)
			formData.append('faculty_head_dob',this.date)
			formData.append('faculty_head_address',this.editedItem.faculty_head_address)
			formData.append('faculty_head_address_city',this.editedItem.faculty_head_address_city)
			formData.append('faculty_head_address_pin',this.editedItem.faculty_head_address_pin)
			formData.append('faculty_head_address_state',this.editedItem.faculty_head_address_state)
			formData.append('faculty_head_profile_picture',this.editedItem.faculty_head_profile_picture)
			if(this.editedIndex == -1)
			{
				response = await this.$axios.post(`/api/facultyheads/register`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				if(response.data.success==true)
				{
					// this.user_details.push(this.editedItem)
					this.dialog = false
					this.message="New Faculty Head added successfully"
					this.snackbar=true
				}
			}
			else
			{
				var id= this.editedItem.faculty_head_id
				response = await this.$axios.post(`/api/facultyheads/${id}`,{
					faculty_head_fname: this.editedItem.faculty_head_fname,
					faculty_head_mname: this.editedItem.faculty_head_mname,
					faculty_head_surname: this.editedItem.faculty_head_surname,
					faculty_head_email: this.editedItem.faculty_head_email,
					faculty_head_gender: this.editedItem.faculty_head_gender,
					faculty_head_contact: this.editedItem.faculty_head_contact,
					faculty_head_dob: this.date,
					faculty_head_address: this.editedItem.faculty_head_address,
					faculty_head_address_city: this.editedItem.faculty_head_address_city,
					faculty_head_address_pin: this.editedItem.faculty_head_address_pin,
					faculty_head_address_state: this.editedItem.faculty_head_address_state,
					// faculty_head_profile_picture: this.imageUrl,
				})
				if(response.data.success==true)
				{
					this.dialog=false
					this.message="Faculty Head successfully updated"
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

