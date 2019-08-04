<template>
  	<div> <v-container fluid>
		   <v-toolbar  class="login-grad" >
			<v-layout justify-center>
			
			<v-chip color="#6E7FF3" text-color="white">
				<v-avatar class="teacher-color"> M </v-avatar>
				Mentor
				
			</v-chip>
			
			</v-layout>
		  </v-toolbar>
		<LoginForm id="faculty-head" />

		</v-container>
  	</div>
	  
</template>

<script>
import LoginForm from '@/components/LoginForm'
  export default {
	layout : 'LoginLayout',
	components: {
		LoginForm
	}
}
</script>

<style lang="css" scoped>
.login-grad
{
	background-image: linear-gradient(to bottom,#434343 0%, black 100%);
	border-radius: 10px;

}

.chip-alignment{
	margin-left: -20%;	
}
</style>
