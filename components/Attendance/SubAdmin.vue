<template>
	<div>
		<v-form ref="form" method="post" id="form">
			<v-layout row wrap>
				<v-flex xs12 sm12 md3 lg3>
					<v-select label="Select Class" :items="classes" v-model="clas" solo outline required></v-select>
				</v-flex>
				<v-flex xs12 sm12 md3 lg3 offset-md1>
					<v-menu
						ref="menu"
						v-model="curr_date"
						:close-on-content-click="false"
						:nudge-right="40"
						:return-value.sync="date"
						lazy
						transition="scale-transition"
						offset-y
						full-width
						min-width="290px"
						outline
					>
						<template v-slot:activator="{ on }">
							<v-text-field
							v-model="date"
							label="Choose Date"
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
				<v-flex xs12 sm12 md3 lg3 offset-md1>
					<center><v-btn @click.prevent="submitForm" color="primary" round light type="submit" form="form" >Submit</v-btn></center>
				</v-flex>
			</v-layout>
		</v-form>
		<v-layout row wrap v-if="student_details.length>0">
			<v-flex xs12 sm12 md12 lg12>
				<v-card flat>
					<v-form ref="attendance-form" method="post" id="attendance-form">
					<v-data-table :headers="headers" :items="student_details" item-key="id">
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
								<td class="text-xs-center">{{ props.item.s_id }}</td>
								<td class="text-xs-center">{{ props.item.s_fname + '' + props.item.s_surname }}</td>
								<td class="justify-center">
									<v-checkbox
										@change="changeStatus(props.item)"
										color="primary"
										v-model="props.item.status"
										:value="1"
									></v-checkbox>
								</td>
							</tr>
						</template>
					</v-data-table>
					<center><v-btn @click.prevent="submitAttendance" color="primary" round light type="submit" form="attendance-form" >Submit</v-btn></center>
					</v-form>
				</v-card>
			</v-flex>
		</v-layout>
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
			centre: '',
			classes: [],
			clas: '',
			date: new Date().toISOString().substr(0, 10),
			curr_date: '',
			student_details: [],
			headers: [
				{ text: 'Student ID'},
				{ text: 'Name'},
				{ text: 'Attendance'}
			],

			message: '',
			snackbar: false,
			timeout: 3000,
		}
	},
	created() {
		this.initialize()
	},
	methods: {
		async initialize() {
			this.centre=this.$auth.user.sub_admin_centre_name
			const class_response = await this.$axios.get(`/api/attendence/centre/${this.centre}`)
			for(var i=0;i<class_response.data.length;i++)
			{
				this.classes.push(class_response.data[i].class_name)
			}
		},
		async submitForm() {
			const response = await this.$axios.post(`/api/attendence/students`,{
				centre_name: this.centre,
				class_name: this.clas
			})
			this.student_details = new Array()
			for(var i=0;i<response.data.length;i++)
			{
				this.student_details.push(response.data[i])
				this.student_details[i].status=0
			}
		},
		changeStatus(item) {
			if(item.status==null)
			{
				item.status=0
			}
		},
		async submitAttendance() {
			// console.log(this.student_details)
			for(var i=0;i<this.student_details.length;i++)
			{
				this.student_details[i].centre_name=this.centre
				this.student_details[i].class_name=this.clas
				this.student_details[i].date=this.date
			}
			const response = await this.$axios.post('/api/attendence/attendence',{
				students: this.student_details
			})
			if(response.data.success)
			{
				this.message="Attendance recorded"
				this.student_details=new Array()
				this.snackbar=true
			}
			else
			{
				this.message=response.data.message
				this.student_details=new Array()
				this.snackbar=true
			}
		}
	}
}
</script>
