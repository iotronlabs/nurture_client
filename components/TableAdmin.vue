<template>
<div>
  	<v-container fluid>

    	<!-- <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
			<v-tab v-for="head in heading" :key="head" ripple>
				{{ head}}
			</v-tab> -->
		<v-tabs touchless fixed-tabs slider-color="primary" v-model="active" >
		<v-tab v-for="head in heading" :key="head" ripple>
			{{ head}}
		</v-tab>
			<v-tabs-items touchless>
			<v-tab-item v-for="n in 4" :key="n" >
				<v-card flat>
					<v-card-text>
						<div v-if="n==1"><TableSubAdmin /></div>
						<div v-if="n==2"><TableFacultyHead /></div>
						<div v-if="n==3"><TableFaculty /></div>
						<div v-if="n==4"><TableStudent /></div>
					</v-card-text>
				</v-card>
			</v-tab-item>
			</v-tabs-items>
        </v-tabs>

 	</v-container>
</div>
</template>

<script>
import TableStudent from '@/components/UserConfig/TableStudent'
import TableFacultyHead from '@/components/UserConfig/TableFacultyHead'
import TableSubAdmin from '@/components/UserConfig/TableSubAdmin'
import TableFaculty from '@/components/UserConfig/TableFaculty'

export default {
	components: {
		TableStudent,
		TableFacultyHead,
		TableSubAdmin,
		TableFaculty
	},
  	data: () => ({
		active: '',
		heading : ['Admin' , 'Mentor','Teacher','Student'],

		dialog: false,

  	}),
	created(){
		if(this.$auth.loggedIn==false && this.$auth.user.authentication!=4)
		{
			this.$router.go('/')
		}
	}
}
</script>


<style scoped>

</style>
