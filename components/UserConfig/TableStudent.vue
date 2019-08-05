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
				<v-toolbar dark color="primary">
					<v-toolbar-title>Student Admission Form</v-toolbar-title>
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


						<h2> Student Details</h2>
						<v-layout row wrap>

							<v-flex xs12 sm6 md6>
								<v-text-field
									v-model="editedItem.s_fname"
									:rules="[rules.required]"
									label="First Name"
									type="text"
									counter="30"
									maxlength="30"
									required
									:disabled="disabled"
									outline
								>
								</v-text-field>
							</v-flex>


							<v-flex xs12 sm6 md6>
								<v-text-field
									v-model="editedItem.s_surname"
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
									<v-radio-group v-model="editedItem.s_gender" label="Gender">
									<v-radio
										v-for="gender in genders"
										:key="gender.value"
										:label="gender.label"
										:value="gender.value"
										:disabled="disabled"
										outline
										color="primary"
									></v-radio>
								</v-radio-group>
							</v-flex>

							<v-flex xs12 sm6 md6>
								<v-menu
									ref="menu"
									v-model="editedItem.s_dob"
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
									v-model="editedItem.s_email"
									:rules="[rules.required,rules.emailValid]"
									label=" Email ID"
									counter="40"
									maxlength="40"
									autocomplete="off"
									required
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
							<!-- contact  -->
							<v-flex xs12 sm12 md6>
								<v-text-field
									v-model="editedItem.s_contact"
									type="tel"
									label="Contact no"
									:disabled="disabled"
									outline
									counter="10"
									maxlength="10"
									:rules="[rules.required]"
									required
								></v-text-field>
							</v-flex>
						</v-layout>
						<!-- address   address pincode state-->
							<v-flex xs12 sm12 md12>
								<v-text-field
									name="streetaddress"
									type="text"
									v-model="editedItem.s_address"
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
									v-model="editedItem.s_address_city"
									type="text"
									label="City"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.s_address_pin"
									type="text"
									label="Pincode"
									:disabled="disabled"
									outline
								> </v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-select
									v-model="editedItem.s_address_state"
									:items="states"
									label="State"
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>
						</v-layout>
						<br>

						<v-layout row>
							<v-flex xs12 sm6 offset-s3>
							</v-flex>
						</v-layout>
						<h1>Guardian Details </h1>
						<v-layout row wrap>

							<v-flex xs12 sm6 md4 >
								<v-text-field
								v-model="editedItem.guardian_fname"
								:rules="[rules.required]"
								
								type="text"
								label="First Name"
								required
								:disabled="disabled"
								outline
							>
							</v-text-field>
							</v-flex>


							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.guardian_surname"
									type="text"
									label="Last Name"
									:disabled="disabled"
									outline
								>
								</v-text-field>
							</v-flex>

							<v-flex xs12 sm6 md4>
								<v-select
									v-model="editedItem.guardian_relation"
									:items="relations"
									label="Relationship with guardian"
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>


						</v-layout >
						<br>
					<!-- email -->
						<v-layout row wrap >
							<v-flex xs12 sm12 md6>
								<v-text-field
									name="email"
									type="email"
									v-model="editedItem.guardian_email"
									:rules="[rules.required,rules.emailValid]"
									label=" Email ID"
									
									autocomplete="off"
									required
									:disabled="disabled"
									outline
								>
								</v-text-field>
							</v-flex>
							<br>
							<!-- contact  -->
							<v-flex xs12 sm12 md6>
								<v-text-field
									v-model="editedItem.guardian_contact"
									type="tel"
									label="Contact no"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
						</v-layout>

						<v-layout row wrap>
							<v-flex xs12 sm6 md4>
								<h2>Address Details</h2><br>
								<v-checkbox v-model="checkbox" color="primary"
									:disabled="disabled"
									@change="address"
									label="Same as above"
									outline>
								</v-checkbox>
							</v-flex>
						</v-layout>
						<v-layout row wrap>
							<v-flex xs12 sm12 md12>
								<v-text-field
									name="streetaddress"
									type="text"
									v-model="editedItem.guardian_address"
									label="Address"
									
									autocomplete="off"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
						</v-layout>
						<v-layout row wrap>
							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.guardian_city"
									type="text"
									label="City"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.guardian_pin"
									type="text"
									label="Pincode"
									:disabled="disabled"
									outline
								> </v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-select
									v-model="editedItem.guardian_state"
									:items="states"
									label="State"
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>
						</v-layout>
						<v-layout row>

						</v-layout>
						<h1>Class Details</h1>
						<v-layout row wrap>
							<v-flex xs12 sm12 md4>
								<v-select
									v-if="authentication==5"
									v-model="editedItem.s_centre"
									:items="centres"
									label="Assign Centre"
									@change="oncentreChange(editedItem.s_centre)"
									required
									solo
									:disabled="disabled"
									outline
								></v-select>
								<v-text-field
									v-if="authentication==4"
									v-model="centre"
									label="Assign centre"
									disabled
									outline
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm12 md4>
								<v-select
									v-model="editedItem.s_course"
									:items="courses"
									@change="classList"
									label="Assign Course"
									required
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>
							<v-flex xs12 sm12 md4>
								<v-select
									v-model="editedItem.s_class"
									:items="classes"
									label="Assign Class"
									required
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>
						</v-layout>
						<h1>Fee Details</h1>
						<v-layout row wrap>
							<v-flex xs12 sm12 md4>
								<v-select
									v-model="editedItem.fee_structure"
									:items="fee_structures"
									label="Fee Structure"
									required
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>
							<v-flex xs12 sm12 md4>
								<v-text-field
									v-model="editedItem.scholarship"
									label="Scholarship Discount"
									
									required
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm12 md4>
								<v-select
									v-model="editedItem.fee_period"
									:items="fee_periods"
									label="Fee Installment Period"
									required
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>
							<v-flex xs12 sm12 md4>
								<v-select
									v-model="editedItem.payment_mode"
									:items="payment_modes"
									label="Payment Mode"
									required
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>
						</v-layout>
						<v-spacer></v-spacer><br>
						<v-btn large @click.prevent="submitForm" color="primary" light type="submit" form="form" :disabled="disabled" >Submit</v-btn>
						<v-btn large color="secondary" type="submit" form="form"  @click.prevent="reset" :disabled="disabled">Clear form</v-btn>
					</v-container>
				</v-form>
			</v-card>
		</v-dialog>
    </v-toolbar>


    <v-data-table :headers="headers" :items="user_details" item-key="s_id" v-model="selected" select-All class="elevation-1">
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
				<td class="text-xs-center">{{ props.item.s_id }}</td>
				<td class="text-xs-center">{{ props.item.s_fname + ' ' + props.item.s_surname}}</td>

				<td class="text-xs-center">{{ props.item.s_dob }}</td>
				<td class="text-xs-center">{{ props.item.s_email }}</td>
				<td class="text-xs-center">{{ props.item.s_contact }}</td>
				<!-- <td>{{ props.item.s_class }}</td> -->
				<td class="text-xs-center">{{ props.item.s_course }}</td>
				<td class="text-xs-center">{{ props.item.s_centre }}</td>
				<!-- <td>{{ props.item.s_address_state }}</td> -->
				<td class="text-xs-center">{{ props.item.status }}</td>

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
		authentication: '',

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
			{ title: 'Approve', icon:{prefix:'far', name:'check-circle'} },
			{ title: 'Set as Inactive', icon: { prefix:'fas', name:'ban'} },
			{ title: 'View', icon: { prefix:'far', name:'eye'} },
			{ title: 'Edit', icon: { prefix:'fas', name:'pencil-alt'} }
		],

		headers: [
		  	{ text: 'Sl_No', align: 'left', sortable: true,	value: 's_id'},
			{ text: 'Name', sortable: false},
			{ text: 'Date of birth ', value: 's_dob', sortable: false },
			{ text: 'Email', value: 's_email', sortable: false },
			{ text: 'Contact Number', value: 's_contact', sortable: false },
			// { text: 'Class', value: 's_class', sortable: false },
			{ text: 'Course', value: 's_course', sortable: true },
			{ text: 'Centre', value: 's_centre', sortable: true },
			// { text: 'State', value: 's_address_state', sortable: true },
			{ text: 'Status', value: 'status', sortable: true }
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

		relations: ['Father','Mother','Other'],
		checkbox: false,
		genders: [
			{label: 'Male', value: 'M'},
			{label: 'Female',value: 'F'},
			{label: 'Others',value: 'O'}
		],
		centres:[],
		centre: '',
		courses: [],
		allClasses: [],
		classes:[],

		fee_structures: [],
		fee_periods: ['At a time','Quarterly','Monthly'],
		payment_modes: [],
		rules: {
			required: v => !!v || 'Required.',
			emailValid : v=> /.+@.+/.test(v) || 'E-mail must be valid'
		},

		user_details: [],
		editedIndex: -1,
		editedItem: {
			s_id: '',
			s_fname: '',
			s_surname: '',
			s_email: '',
			s_gender: '',
			s_contact: '',
			s_dob: '',
			s_address_city: '',
			s_address: '',
			s_address_pin: '',
			s_address_state: '',
			guardian_fname: '',
			guardian_surname: '',
			guardian_email: '',
			guardian_contact: '',
			guardian_address: '',
			guardian_city: '',
			guardian_pin: '',
			guardian_state: '',
			s_centre: '',
			s_course: '',
			s_class: '',
			fee_structure: '',
			scholarship: '',
			fee_period: '',
			payment_mode: '',
			image:null,
			imageUrl:'',
		},
		defaultItem: {
			s_id: '',
			s_fname: '',
			s_surname: '',
			s_email: '',
			s_gender: '',
			s_contact: '',
			s_dob: '',
			s_religion: '',
			s_nationality: '',
			s_address: '',
			s_address_city: '',
			s_address_pin: '',
			s_address_state: '',
			guardian_fname: '',
			guardian_surname: '',
			guardian_email: '',
			guardian_contact: '',
			guardian_address: '',
			guardian_city: '',
			guardian_pin: '',
			guardian_state: '',
			s_centre: '',
			s_course: '',
			s_class: '',
			fee_structure: '',
			scholarship: '',
			fee_period: '',
			payment_mode: '',
			s_profile_picture:null,
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
			this.editedItem.s_profile_picture=event.target.files[0]
		},
		address() {
			if(this.checkbox)
			{
				this.editedItem.guardian_address = this.editedItem.s_address
				this.editedItem.guardian_city = this.editedItem.s_address_city
				this.editedItem.guardian_pin = this.editedItem.s_address_pin
				this.editedItem.guardian_state = this.editedItem.s_address_state
			}
			else
			{
				this.editedItem.guardian_address = ''
				this.editedItem.guardian_city = ''
				this.editedItem.guardian_pin = ''
				this.editedItem.guardian_state = ''
			}
		},
		async initialize () {
			let student_response
			if(this.$auth.user.authentication==4)
			{
				this.authentication=4
				student_response = await this.$axios.get(`/api/subadmins/showstudentsdetails/${this.$auth.user.sub_admin_centre_name}`)
				this.user_details = student_response.data.data
				this.centre=this.$auth.user.sub_admin_centre_name
				const centre_name = this.$auth.user.sub_admin_centre_name
				this.oncentreChange(centre_name)
			}
			else if(this.$auth.user.authentication==5)
			{
				this.authentication=5
				const centre_response = await this.$axios.get('/api/subadmins')
				for(var i=0; i<centre_response.data.length;i++)
				{
					this.centres.push(centre_response.data[i].sub_admin_centre_name)
				}
				student_response = await this.$axios.get('/api/students')
				this.user_details = student_response.data
			}
			const courses_response = await this.$axios.get('/api/courses')
			for(var i=0;i<courses_response.data.length;i++)
			{
				this.courses.push(courses_response.data[i].course_name)
			}
		},
		async oncentreChange(centre_name) {
			const classes_response = await this.$axios.get(`/api/classes/${centre_name}`)
			for(var i=0;i<classes_response.data.data.length;i++)
			{
				this.allClasses.push(classes_response.data.data[i])
			}
			this.classList()
		},
		classList() {
			for(var i=0;i<this.allClasses.length;i++)
			{
				console.log(this.allClasses[i])
				if(this.allClasses[i].class_course==this.editedItem.s_course)
				{
					this.classes.push(this.allClasses[i].class_name)
				}
			}
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
				id=this.selected[i].s_id
				response = await this.$axios.delete(`/api/students/${id}`)
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
				index=this.user_details.map((e) => e.s_id).indexOf(id)
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
			if(this.$auth.user.authentication==4)
			{
				this.editedItem.s_centre = this.centre
			}
			const formData = new FormData()
			formData.append('s_fname', this.editedItem.s_fname)
			formData.append('s_surname', this.editedItem.s_surname)
			formData.append('s_email', this.editedItem.s_email)
			formData.append('s_gender', this.editedItem.s_gender)
			formData.append('password', this.editedItem.s_contact)
			formData.append('s_contact', this.editedItem.s_contact)
			formData.append('s_dob', this.date)
			formData.append('s_address', this.editedItem.s_address)
			formData.append('s_address_city', this.editedItem.s_address_city)
			formData.append('s_address_pin', this.editedItem.s_address_pin)
			formData.append('s_address_state', this.editedItem.s_address_state)
			formData.append('guardian_fname', this.editedItem.guardian_fname)
			formData.append('guardian_surname', this.editedItem.guardian_surname)
			formData.append('guardian_email', this.editedItem.guardian_email)
			formData.append('guardian_contact', this.editedItem.guardian_contact)
			formData.append('guardian_address', this.editedItem.guardian_address)
			formData.append('guardian_city', this.editedItem.guardian_city)
			formData.append('guardian_pin', this.editedItem.guardian_pin)
			formData.append('guardian_state', this.editedItem.guardian_state)

			formData.append('s_centre', this.editedItem.s_centre)
			formData.append('s_course', this.editedItem.s_course)
			formData.append('s_class', this.editedItem.s_class)
			formData.append('fee_structure', 'a')
			formData.append('scholarship', 'd')
			formData.append('fee_period', 'a')
			formData.append('s_profile_picture', this.editedItem.s_profile_picture)


			if(this.editedIndex == -1)
			{
				response = await this.$axios.post(`/api/students/register`,
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
					this.message="New Student added successfully"
					this.snackbar=true
				}
			}
			else
			{
				var id= this.editedItem.s_id
				response = await this.$axios.post(`/api/students/${id}`,{
					s_fname: this.editedItem.s_fname,
					s_surname: this.editedItem.s_surname,
					s_email: this.editedItem.s_email,
					s_gender: this.editedItem.s_gender,
					s_contact: this.editedItem.s_contact,
					s_dob: this.date,
					s_address: this.editedItem.s_address,
					s_address_city: this.editedItem.s_address_city,
					s_address_pin: this.editedItem.s_address_pin,
					s_address_state: this.editedItem.s_address_state,
					guardian_fname: this.editedItem.guardian_fname,
					guardian_surname: this.editedItem.guardian_surname,
					guardian_email: this.editedItem.guardian_email,
					guardian_contact: this.editedItem.guardian_contact,
					guardian_address: this.editedItem.guardian_address,
					guardian_city: this.editedItem.guardian_city,
					guardian_pin: this.editedItem.guardian_pin,
					guardian_state: this.editedItem.guardian_state,
					s_centre: this.editedItem.s_centre,
					s_course: this.editedItem.s_course,
					s_class: this.editedItem.s_class,
					fee_structure: this.editedItem,fee_structure,
					scholarship: this.editedItem.scholarship,
					fee_period: this.editedItem.fee_period,
					// s_profile_picture: this.imageUrl,
				})
				if(response.data.success==true)
				{
					this.dialog=false
					this.message="Student successfully updated"
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

