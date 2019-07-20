<template>
	<div>
		<v-toolbar  class="login-grad" >
			<v-layout justify-center>
			<v-flex sm5 xs5 md4 offset-sm2 offset-xs2 offset-md2 >
			&nbsp;	
			<v-chip class="chip-alignment" color="#2f9e7b" text-color="white">
				<v-avatar class="student-color"> S </v-avatar>
				Student 
				
			</v-chip>
			</v-flex>
			</v-layout>
		</v-toolbar>
		

		<LoginForm id="student" />
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

