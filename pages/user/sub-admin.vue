<template>
  <div>
	  <v-toolbar class="login-grad">
		<div class="text-xs-center">
			<v-chip color="#ff5512" >
				<v-avatar class="admin-color"> SA </v-avatar>
				Sub Admin
				<v-spacer />
			</v-chip>
		</div>
	  </v-toolbar>
		<br>
		<LoginForm id="admin" />
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
	border-radius: 15px 15px 15px 15px;
}
v-toolbar{
	justify-content:center;
}
</style>
