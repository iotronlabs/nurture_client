<template>
  <div>
	  <v-container>
		  <v-toolbar  class="login-grad" >
			<v-layout justify-center>
			

			<v-chip color="#f06d5f" text-color="white">
				<v-avatar class="super-admin-color"> SA </v-avatar>
				Super-Admin 

			</v-chip>
			
			</v-layout>
		  </v-toolbar>

		<LoginForm id="admin" />
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
	margin-left: -35%;
}
</style>
