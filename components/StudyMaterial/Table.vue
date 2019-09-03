<template>
<div>
	<v-toolbar flat color="lightgrey">
		<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
		<v-spacer></v-spacer>
		<span v-if="authentication==5">
			<v-btn fab small v-if="deleteMode==false && this.$vuetify.breakpoint.smAndDown==true" color="error" @click="deleteMode=true" dark v-on="on"><font-awesome-icon :icon="['fas', 'trash-alt']"/></v-btn>
			<v-btn v-if="deleteMode==false && this.$vuetify.breakpoint.mdAndUp==true" color="error" @click="deleteMode=true" dark v-on="on"><font-awesome-icon :icon="['fas', 'trash-alt']"/>&nbsp;&nbsp;Delete Material</v-btn>
			<v-dialog v-model="dialog" persistent max-width="750px">
				<template v-slot:activator="{ on }">
					<v-btn fab small class="hidden-md-and-up" color="primary" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/></v-btn>
					<v-btn class="hidden-sm-and-down" color="primary" dark v-on="on"><font-awesome-icon :icon="['fas', 'plus']"/>&nbsp;&nbsp;Add New</v-btn>
				</template>
				<v-card>
					<v-toolbar dark color="secondary">
						<v-toolbar-title>Study Material Form</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon dark @click="dialog = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
					<v-container>
						<Form :item="editedItem" @success="success" />
					</v-container>
				</v-card>
			</v-dialog>
		</span>
	</v-toolbar>

	<v-data-table :headers="headers" :items="items" item-key="id">
	 	<template v-slot:headers="props">
			<tr>
				<th
					v-for="header in props.headers"
					:key="header.text"
				>
					{{ header.text }}
				</th>
			</tr>
	 	</template>
		<template v-slot:items="props">
			<tr>
				<td class="text-xs-center">{{ props.item.id }}</td>
				<td class="text-xs-center">{{ props.item.title }}</td>
				<td class="text-xs-center">{{ props.item.subject }}</td>
				<td class="text-xs-center">{{ props.item.course }}</td>
				<td class="text-xs-center">{{ props.item.topic }}</td>
				<td class="text-xs-center">
					<!-- <v-btn href="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf" target="_blank">
						View
					</v-btn> -->
					<a :href="`${baseUrl}/studymaterials/${props.item.upload_file}`" target="_blank">View</a>
					<!-- <pdf src="@/static/1567522352-file.pdf">
						<template slot="loading">
							loading content here...
						</template>
					</pdf> -->
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
import { mapState } from 'vuex'
import pdf from 'pdfvuer'
import Form from './Form'
export default {
	components: {
		pdf,
		Form
	},
	data() {
		return {
			search: '',
			authentication: '',
			deleteMode: false,
			dialog: false,

			message: '',
			snackbar: false,
			timeout: 3000,

			headers: [
				{ text: 'Sl_No', align: 'left', sortable: true,	value: 'id'},
				{ text: 'Title', value: 'title' , sortable: false},
				{ text: 'Subject', value: 'subject', sortable: false },
				{ text: 'Course', value: 'course', sortable: false },
				{ text: 'Topic', value: 'topic', sortable: false },
				{ text: 'Actions', value: 'upload_file', sortable: false }
			],
			items: [],

			editedItem: {
				title: '',
				description: '',
				subject: this.$route.params.id,
				course: '',
				topic: '',
				upload_file: null,
			}
		}
	},
	computed: {
		...mapState({
			baseUrl: state => state.config.baseUrl
		})
	},
	created() {
		this.initialize()
	},
	methods: {
		async initialize() {
			this.authentication = this.$auth.user.authentication
			const response = await this.$axios.get(`/api/materials/${this.$route.params.id}`)
			for(var i=0;i<response.data.length;i++)
			{
				this.items.push(response.data[i])
			}
		},
		success(message) {
			this.message = message
			this.dialog = false
			this.snackbar = true
		}
	}
}
</script>
