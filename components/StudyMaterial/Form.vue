<template>
	<v-form  ref="form" method="post" id="form" enctype="multipart/form-data">
		<v-layout row wrap>
			<v-flex xs12 sm12 md5 lg5>
				<h3>Title</h3><br>
				<v-text-field v-model="item.title" type="text" placeholder="Enter title"
					required outline solo>
				</v-text-field>
			</v-flex>

			<v-flex xs12 sm12 md5 lg5 offset-md1>
				<h3>Subject</h3><br>
				<v-text-field v-model="item.subject" type="text" placeholder="Enter subject" disabled
					required outline solo>
				</v-text-field>
			</v-flex>
		</v-layout>

		<v-layout row wrap>
			<v-flex xs12 sm12 md5 lg5>
				<h3>Topic</h3><br>
				<v-select label="Choose Topic" v-model="item.topic" :items="topics" outline solo></v-select>
			</v-flex>

			<v-flex xs12 sm12 md5 lg5 offset-md1>
				<h3>Course</h3><br>
				<v-select label="Choose Course" v-model="item.course" :items="courses" outline solo></v-select>
			</v-flex>
		</v-layout>

		<v-layout row wrap>
			<v-flex xs12 sm12 md12 lg12>
				<h3>Description</h3>
				<v-text-field v-model="item.description" type="text" placeholder="Enter Description"
					required outline solo>
				</v-text-field>
			</v-flex>
		</v-layout>

		<v-layout row wrap >
			<v-flex xs12 sm12 md12>
				<h3>Choose File</h3>
				<input
					type="file"
					ref="fileInput"
					@change="onFilePicked"
				>
			</v-flex>
		</v-layout>
		<v-spacer></v-spacer><br>
		<v-btn @click.prevent="submitForm" color="primary" light type="submit" form="form" >Submit</v-btn>
		<v-btn  color="secondary" type="submit" form="form"  @click.prevent="reset">Clear form</v-btn>
	</v-form>
</template>

<script>
export default {
	props: {
		item: {
			type: Object
		},
		editMode: {
			type: Boolean
		}
	},
	data() {
		return {
			topics: [],
			courses: [],
		}
	},
	created() {
		this.initialize()
	},
	methods: {
		initialize() {
			// this.item.subject = this.$route.params.id
		},
		onFilePicked(event){
			this.item.upload_file=event.target.files[0]
		},
		async submitForm() {
			const formData = new FormData()
			formData.append('title',this.item.title)
			formData.append('subject',this.item.subject)
			formData.append('topic',this.item.topic)
			formData.append('course',this.item.course)
			formData.append('description',this.item.description)
			formData.append('upload_file',this.item.upload_file)

			const response = await this.$axios.post(`/api/materials/add`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
			if(response.data.success==true)
			{
				this.$emit('success','New materials added')
			}
		}
	}
}
</script>
