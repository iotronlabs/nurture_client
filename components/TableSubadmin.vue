<template>
<div>
  	<v-container fluid>

    	<!-- <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
			<v-tab v-for="head in heading" :key="head" ripple>
				{{ head}}
			</v-tab> -->
		<v-tabs fixed-tabs slider-color="primary" v-model="active" >
		<v-tab v-for="head in heading" :key="head" ripple>
			{{ head}}
		</v-tab>
		<v-tabs-items touchless>
			<v-tab-item v-for="n in 3" :key="n" >
				<v-card flat>
					<v-card-text>
						<div v-if="n==1"><TableStudent /></div>
						<div v-if="n==2"><TableFaculty /></div>
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
import TableFaculty from '@/components/UserConfig/TableFaculty'

export default {
	components: {
		TableStudent,
		TableFaculty
	},
  	data: () => ({
		active: '',
		heading : ['Students' , 'Faculties'],

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
