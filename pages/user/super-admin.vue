<template>
  <div>
	  <v-toolbar  class="login-grad" >
			<v-layout justify-center>
			<v-flex sm5 xs5 md4 offset-sm1 offset-xs1 offset-md1 >
				
			<v-chip class="chip-alignment" color="#f06d5f" text-color="white">
				<v-avatar class="super-admin-color"> SA </v-avatar>
				Super-Admin Login
				
			</v-chip>
			</v-flex>
			</v-layout>
		  </v-toolbar>
	  
		<LoginForm id="super-admin" />
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
