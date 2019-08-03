<template>
	<v-content class="global-font">
		<v-container-fluid>
			<div class="padding-style">
					<!-- <br><br><br><br> -->
				<v-toolbar flat color="lightgrey">
					<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
				</v-toolbar>


				<v-data-table :headers="headers" :items="exam_details" class="elevation-1">
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
							<td class="text-xs-center">{{ props.item.exam_name }}</td>
							<td class="text-xs-center">{{ props.item.course_name }}</td>
							<td class="text-xs-center">{{ props.item.subject_name }}</td>
							<!-- <td class="text-xs-left">{{ props.item.duration }}</td> -->
							<td class="text-xs-center">{{ props.item.start_date }}</td>
							<td class="text-xs-center">{{ props.item.end_date }}</td>
							<!-- <td class="text-xs-left">{{ props.item.pass_mark }}</td> -->
							<td class="text-xs-center">{{ props.item.status }}</td>
							<td class="justify-center layout px-0">
								<v-btn :to="`/exam/student/rules/${props.item.id}`">Take Assesment</v-btn>
							</td>
							<!--<td >  <v-select :items="items" label="Solo field" solo></v-select></td>-->
						</tr>
					</template>
					<template v-slot:no-data>
						<div>No data </div>
					</template>
				</v-data-table>

			</div>
		</v-container-fluid>


	</v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	layout: 'DashboardNavigationLayout',
	components: {

	},
    data: () => ({

		search: '',

		headers: [
			  // { text: 'Sl_No', align: 'left', sortable: true,	value: 'sub_code'},
			{ text: 'Sl No.', value: 'id', sortable: false },
			{ text: 'Exam Name ', value: 'exam_name', sortable: false },
			{ text: 'Course', value: 'course_name' ,sortable: false},
			{ text: 'Subject', value: 'subject_name', sortable: false },
			// { text: 'Duration', value: 'duration', sortable: false },
			{ text: 'Start Date', value: 'start_date', sortable: false },
			{ text: 'End Date', value: 'end_date', sortable: false },
            // { text: 'Passmark', value: 'pass_mark', sortable: false },
            { text: 'Status', value: 'status', sortable: false }
		],

		exam_details: [],
		questions: [],
	}),
	created () {
		if(this.$auth.loggedIn)
		{
			if(this.$auth.user.authentication==1)
			{
				this.initialize()
			}
			else
			{
				this.$router.push('/dashboard')
			}
		}
	},
    methods: {
		async initialize () {
			const exam_response = await this.$axios.get(`/api/students/show_exams/${this.$auth.user.s_id}`)
			this.exam_details = exam_response.data.data
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

