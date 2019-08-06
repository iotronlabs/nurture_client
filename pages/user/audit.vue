<template>
 	<div>
		 <v-container fluid>
		 <v-toolbar  class="login-grad" >
			<v-layout justify-center>
			
			<v-chip color="#b63fbd"  text-color="white">
				<v-avatar class="audit-color"> A </v-avatar>
				Audit
				
			</v-chip>
		
			</v-layout>
		  </v-toolbar>
		 
		<LoginForm id="audit" />
		
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

</style>
