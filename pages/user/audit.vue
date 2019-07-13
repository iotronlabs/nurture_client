<template>
 	<div>
		 <v-toolbar class="login-grad" >
		<div class="text-xs-center">
				<v-chip color="#f2c94c">
					<v-avatar class="audit-color"> AU </v-avatar>
					Audit Login
					<v-spacer />
				</v-chip>
			</div>
		 </v-toolbar>
		<br>
		<LoginForm id="audit" />
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
