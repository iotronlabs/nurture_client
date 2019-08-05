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
					<v-toolbar-title>Sub-admin Form</v-toolbar-title>
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

						<v-layout row>
							<v-flex xs12 sm6>
								<img :src="editedItem.imageUrl">
							</v-flex>
						</v-layout>

						<v-layout row wrap>

							<v-flex xs12 sm6 md6>
								<v-text-field
									v-model="editedItem.sub_admin_fname"
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
									v-model="editedItem.sub_admin_surname"
									type="text"
									label="Last Name"
									counter="30"
									maxlength="30"
									required
									:rules="[rules.required]"
									:disabled="disabled"
									outline
								>
								</v-text-field>
							</v-flex>
						</v-layout>
						<v-layout  wrap>
							<v-flex xs12 sm6 md6>
									<v-radio-group v-model="editedItem.sub_admin_gender" label="Gender">
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
									v-model="editedItem.sub_admin_dob"
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
									<v-date-picker v-model="date" no-title scrollable>
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
									v-model="editedItem.sub_admin_email"
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
									v-model="editedItem.sub_admin_contact"
									type="text"
									label="Contact no"
									counter="10"
									maxlength="10"
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
									v-model="editedItem.sub_admin_address"
									label=" Address"
									counter="50"
									maxlength="50"
									autocomplete="off"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
						<br>
						<v-layout row wrap>
							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.sub_admin_address_city"
									type="text"
									label="City"
									counter="30"
									maxlength="30"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.sub_admin_address_pin"
									type="text"
									label="Pincode"
									maxlength="6"
									counter="6"
									
									:disabled="disabled"
									outline
								> </v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-select
									v-model="editedItem.sub_admin_address_state"
									:items="states"
									label="State"
									solo
									:disabled="disabled"
									outline
								></v-select>
							</v-flex>
						</v-layout>
						<h1>Assign Centre</h1>
						<v-layout>
							<v-flex xs12 sm12 md6>
								<v-text-field
									v-model="editedItem.sub_admin_centre_name"
									label="Centre Name"
									counter="30"
									maxlength="30"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm12 md6>
								<v-text-field
									v-model="editedItem.sub_admin_centre_id"
									label="Centre ID"
									counter="10"
									maxlength="10"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
						</v-layout>
						<v-layout row wrap>
							<v-flex xs12 sm6 md3>
								<h2>Centre Address Details</h2><br>
								<v-checkbox v-model="checkbox" color="primary"
									:disabled="disabled"
									
									@change="address"
									label="Same as above"
									></v-checkbox>
							</v-flex>
						</v-layout>
						<v-flex xs12 sm12 md12>
								<v-text-field
									name="streetaddress"
									type="text"
									v-model="editedItem.sub_admin_centre_address"
									label="Address"
									counter="50"
									maxlength="50"
									autocomplete="off"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
						<v-layout row wrap>
							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.sub_admin_centre_address_city"
									type="text"
									label="City"
									counter="30"
									maxlength="30"
									:disabled="disabled"
									outline
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field
									v-model="editedItem.sub_admin_centre_address_pin"
									type="text"
									label="Pincode"
									counter="6"
									maxlength="6"
									:disabled="disabled"
									outline
								> </v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-select
									v-model="editedItem.sub_admin_centre_address_state"
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
						<v-btn large color="secondary" type="submit" form="form"  @click.prevent="reset" :disabled="disabled">Clear form</v-btn>
					</v-container>
				</v-form>
			</v-card>
		</v-dialog>
    </v-toolbar>


    <v-data-table :headers="headers" :items="user_details" item-key="sub_admin_id" v-model="selected" select-All class="elevation-1">
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
				<td class="text-xs-center">{{ props.item.sub_admin_id }}</td>
				<td class="text-xs-center">{{ props.item.sub_admin_fname + ' ' + props.item.sub_admin_surname}}</td>
				<td class="text-xs-center">{{ props.item.sub_admin_dob }}</td>
				<td class="text-xs-center">{{ props.item.sub_admin_email }}</td>
				<td class="text-xs-center">{{ props.item.sub_admin_contact }}</td>
				<td class="text-xs-center">{{ props.item.sub_admin_centre_name }}</td>
				<td class="text-xs-center">{{ props.item.sub_admin_address_state }}</td>
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
			{ title: 'View', icon: { prefix:'far', name:'eye'} },
			{ title: 'Edit', icon: { prefix:'fas', name:'pencil-alt'} }

		],

		headers: [
		  	{ text: 'Sl_No', align: 'left', sortable: true,	value: 'sub_admin_id'},
			{ text: 'Name', sortable: false},
			{ text: 'Date of birth ', value: 'sub_admin_dob', sortable: false },
			{ text: 'Email', value: 'sub_admin_email', sortable: false },
			{ text: 'Contact Number', value: 'sub_admin_contact', sortable: false },
			{ text: 'Centre', value: 'sub_admin_centre_name', sortable: false },
			{ text: 'State', value: 'sub_admin_address_state', sortable: false }
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
		rules: {
			required: v => !!v || 'Required.',
			emailValid : v=> /.+@.+/.test(v) || 'E-mail must be valid'
		},

		user_details: [],
		editedIndex: -1,
		editedItem: {
			sub_admin_id: '',
			sub_admin_fname: '',
			sub_admin_surname: '',
			sub_admin_email: '',
			sub_admin_gender: '',
			sub_admin_contact: '',
			sub_admin_dob: '',
			sub_admin_address_city: '',
			sub_admin_address: '',
			sub_admin_address_pin: '',
			sub_admin_address_state: '',
			sub_admin_centre_name: '',
			sub_admin_centre_id: '',
			sub_admin_centre_address_city: '',
			sub_admin_centre_address: '',
			sub_admin_centre_address_pin: '',
			sub_admin_centre_address_state: '',
			sub_admin_profile_picture:null,
			imageUrl:'',
		},
		defaultItem: {
			sub_admin_id: '',
			sub_admin_fname: '',
			sub_admin_surname: '',
			sub_admin_email: '',
			sub_admin_gender: '',
			sub_admin_contact: '',
			sub_admin_dob: '',
			sub_admin_address: '',
			sub_admin_address_city: '',
			sub_admin_address_pin: '',
			sub_admin_address_state: '',
			sub_admin_centre_name: '',
			sub_admin_centre_id: '',
			sub_admin_centre_address_city: '',
			sub_admin_centre_address: '',
			sub_admin_centre_address_pin: '',
			sub_admin_centre_address_state: '',
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
			this.editedItem.sub_admin_profile_picture=event.target.files[0]
		},
		address() {
			if(this.checkbox)
			{
				this.editedItem.sub_admin_centre_address = this.editedItem.sub_admin_address
				this.editedItem.sub_admin_centre_address_city = this.editedItem.sub_admin_address_city
				this.editedItem.sub_admin_centre_address_pin = this.editedItem.sub_admin_address_pin
				this.editedItem.sub_admin_centre_address_state = this.editedItem.sub_admin_address_state
			}
			else
			{
				this.editedItem.sub_admin_centre_address = ''
				this.editedItem.sub_admin_centre_address_city = ''
				this.editedItem.sub_admin_centre_address_pin = ''
				this.editedItem.sub_admin_centre_address_state = ''
			}
		},
		async initialize () {
			const sub_admin_response = await this.$axios.get('/api/subadmins')
			this.user_details = sub_admin_response.data
		},
		addItem() {
			this.disabled=false
		},
		viewItem(item) {
			this.editedIndex = this.user_details.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.editedItem.sub_admin_address_state = item.sub_admin_address_state
			this.disabled=true
			this.dialog=true
		},
		editItem (item) {
			this.disabled=false
			this.editedIndex = this.user_details.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.editedItem.sub_admin_address_state = item.sub_admin_address_state
			this.dialog = true
		},
		async deleteItem () {
			var i
			let response
			let id
			let index
			for(i=0;i<(this.selected.length);i++)
			{
				id=this.selected[i].sub_admin_id
				response = await this.$axios.delete(`/api/subadmins/${id}`)
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
				index=this.user_details.map((e) => e.sub_admin_id).indexOf(id)
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
			formData.append('sub_admin_fname',this.editedItem.sub_admin_fname)
			formData.append('sub_admin_surname',this.editedItem.sub_admin_surname)
			formData.append('sub_admin_email',this.editedItem.sub_admin_email)
			formData.append('sub_admin_gender',this.editedItem.sub_admin_gender)
			formData.append('password',this.editedItem.sub_admin_contact)
			formData.append('sub_admin_contact',this.editedItem.sub_admin_contact)
			formData.append('sub_admin_dob',this.date)
			formData.append('sub_admin_address',this.editedItem.sub_admin_address)
			formData.append('sub_admin_address_pin',this.editedItem.sub_admin_address_pin)
			formData.append('sub_admin_address_city',this.editedItem.sub_admin_address_city)
			formData.append('sub_admin_address_state',this.editedItem.sub_admin_address_state)
			formData.append('sub_admin_centre_name', this.editedItem.sub_admin_centre_name,)
			formData.append('sub_admin_centre_id', this.editedItem.sub_admin_centre_id,)
			formData.append('sub_admin_centre_address_city', this.editedItem.sub_admin_centre_address_city,)
			formData.append('sub_admin_centre_address', this.editedItem.sub_admin_centre_address,)
			formData.append('sub_admin_centre_address_pin', this.editedItem.sub_admin_centre_address_pin,)
			formData.append('sub_admin_centre_address_state', this.editedItem.sub_admin_centre_address_state)
			formData.append('sub_admin_profile_picture', this.editedItem.sub_admin_profile_picture)
			if(this.editedIndex == -1)
			{
				response = await this.$axios.post(`/api/subadmins/register`,
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
					this.message="New sub_admin added successfully"
					this.snackbar=true
				}
			}
			else
			{
				var id= this.editedItem.sub_admin_id
				response = await this.$axios.post(`/api/subadmins/${id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				if(response.data.success==true)
				{
					this.dialog=false
					this.message="sub_admin successfully updated"
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

