<template>
<div>
	<v-toolbar flat color="lightgrey">
      	<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      	<v-spacer></v-spacer>
		<v-btn v-if="deleteMode==false" color="error" @click="deleteMode=true" dark v-on="on">Delete</v-btn>
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on }">
				<v-btn color="primary" @click="addItem" dark v-on="on">Add New</v-btn>
			</template>
			<v-card>
				<v-toolbar dark color="primary">
					<v-toolbar-title>Centre Form</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark @click="dialog = false">
						<v-icon>close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-form ref="form" method="post" id="form" enctype="multipart/form-data">
					<v-container fluid>
						<!-- <v-layout row wrap>
							<v-flex xs12 sm12 md12>
								<v-text-field
									label="Enter centre id"
									v-model="editedItem.centre_id"
									:disabled="disabled"
								></v-text-field>
							</v-flex>
						</v-layout> -->
						<v-layout row wrap>
							<v-flex xs12 sm12 md12>
								<v-text-field
									label="Enter centre name"
									v-model="editedItem.centre_name"
									:disabled="disabled"
								></v-text-field>
							</v-flex>
						</v-layout>
						<v-spacer></v-spacer><br>
						<v-btn round @click.prevent="submitForm" color="success" light type="submit" form="form" :disabled="disabled" >Submit</v-btn>
						<v-btn  round color="primary" type="submit" form="form"  @click.prevent="reset" :disabled="disabled">Clear form</v-btn>
					</v-container>
				</v-form>
			</v-card>
		</v-dialog>
    </v-toolbar>

	<v-data-table :headers="headers" :items="centre_details" item-key="centre_id" v-model="selected" select-All class="elevation-1">
	 	<template v-slot:headers="props">
			<tr>
				<th v-if="deleteMode==true">
					<v-checkbox
						:input-value="props.all"
						:indeterminate="props.indeterminate"
						primary
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
							<v-btn color="error" @click="deleteItem">Confirm</v-btn>
							<v-btn color="info" @click="deleteMode=false" class="btn-cancel">Cancel</v-btn>
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
						primary
						hide-details
						:input-value="props.selected"
					></v-checkbox>
				</td>
				<td class="text-xs-center">{{ props.item.centre_id }}</td>
				<td class="text-xs-right">{{ props.item.centre_name }}</td>
				<td class="justify-center layout px-0">
					<span v-if="deleteMode==false">
						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn dark	v-on="on">Actions</v-btn>
							</template>
							<v-list>
								<v-list-tile
									v-for="(item, index) in settings"
									:key="index"
									@click="changed(item.title)"
								>
								<v-list-tile-title @click="item.title=='Edit' ? editItem(props.item) : viewItem(props.item)">{{ item.title }}</v-list-tile-title>
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
	data() {
		return {
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

			headers: [
				// { text: 'Sl_No', align: 'left', sortable: true,	value: 'sub_code'},
				{ text:'Centre Id', value: 'centre_id'},
				{ text: 'Centre Name ', value: 'centre_name', sortable: false },
			],

			settings :
			[
				{ title: 'View' },
				{ title: 'Edit' }
			],
			centre_details: [],
			editedIndex: -1,
			editedItem: {
				centre_id: '',
				centre_name: '',
			},
			defaultItem: {
				centre_id: '',
				centre_name: '',
			}
		}
	},
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
		async initialize () {
			const class_response = await this.$axios.get('/api/centres')
			this.centre_details = class_response.data
		},
		addItem() {
			this.disabled=false
		},
		viewItem(item) {
			this.editedIndex = this.centre_details.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.disabled=true
			this.dialog=true
		},
		editItem (item) {
			this.disabled=false
			this.editedIndex = this.centre_details.indexOf(item)
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
				id=this.selected[i].centre_id
				response = await this.$axios.delete(`/api/centres/${id}`)
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
				index=this.centre_details.map((e) => e.centre_id).indexOf(id)
				this.centre_details.splice(index,1)
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
				Object.assign(this.centre_details[this.editedIndex], this.editedItem)
			} else {
				this.centre_details.push(this.editedItem)
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
			else this.selected = this.centre_details.slice()
		},

		async submitForm() {
			let response
			if(this.editedIndex == -1)
			{
				response = await this.$axios.post(`/api/centres/register`,{
					centre_name: this.editedItem.centre_name
				})
				if(response.data.success==true)
				{
					// this.centre_details.push(this.editedItem)
					this.dialog = false
					this.message="New Centre added successfully"
					this.snackbar=true
				}
			}
			else
			{
				var id= this.editedItem.centre_id
				response = await this.$axios.post(`/api/centres/${id}`,{
					centre_name: this.editedItem.centre_name
				})
				if(response.data.success==true)
				{
					this.dialog=false
					this.message="Centre successfully updated"
					this.snackbar=true
				}
			}
		}
    }
}
</script>

<style>

</style>
