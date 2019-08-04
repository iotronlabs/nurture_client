<template>
  	<div>
		  <v-container fluid>
		  <v-toolbar  class="login-grad" >
			<v-layout justify-center>
			
			<v-chip color="#f06d5f"  text-color="white">
				<v-avatar class="admin-color"> A </v-avatar>
				Admin
			</v-chip>

			</v-layout>
		  </v-toolbar>
		<LoginForm id="sub-admin" />
		</v-container>
	</div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
export default {
	layout: 'LoginLayout',
	components : {
		LoginForm
	}
}

</script>

<style scoped>
.login-grad
{
	background-image: linear-gradient(to bottom,#434343 0%, black 100%);
	border-radius: 10px;

}

.chip-alignment{
	margin-left: -20%;
}
</style>
