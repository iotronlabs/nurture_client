<template>
  	<div>
		  <v-toolbar class="login-grad">
		<div class="text-xs-center">
			<v-chip color="#6E7FF3" text-color="white">
				<v-avatar class="teacher-color"> FH </v-avatar>
				Faculty Head Login
				<v-spacer />
			</v-chip>
		</div>
		  </v-toolbar>
		<br>
		<LoginForm id="faculty" />
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
</style>
