<template>
<div>
	<br>
	<v-form @submit.prevent="checkLogin" id="login-form" class="login-form" method="post">
		<v-text-field
			prepend-icon="person"
			label="Email ID"
			placeholder=" "
			name="email"
			type="email"
			v-model="email"
			:rules="[rules.required,rules.emailValid]"
			autocomplete="off"
			required>
		</v-text-field>
		<v-text-field id="password"
			prepend-icon="lock"
			v-model="password"
			:append-icon="show ? 'visibility' : 'visibility_off'"
			:rules="[rules.required, rules.min]"
			:type="show ? 'text' : 'password'"
			name="password"
			label="Password"
			placeholder=" "
			hint="At least 8 characters"
			counter
			autocomplete="off"
			@click:append="show = !show">
		</v-text-field>
		<v-layout row wrap>

			<v-flex xs5 sm5 md5>
				<v-checkbox
					v-model="checkbox"
					label="Remember Me"
				></v-checkbox>
			</v-flex>
			<v-flex xs4 sm4 md4 offset-xs3 offset-sm3 offset-md3>
				<br>
				<nuxt-link to="/">forgot password?</nuxt-link>

			</v-flex>
		</v-layout>


			<v-btn
				:disabled="disabled"
				block
				color="primary"
				type="submit"
				form="login-form"
				:class="disabled ? 'btn-login' : 'btn-login-color'"
			>LogIn</v-btn>
		{{message}}
	</v-form>
	<!-- snackbar -->
	<v-snackbar
		v-model="snackbar"
		:timeout="timeout"
		top
		vertical
    >
		{{ message }}
		<v-btn
			color="pink"
			flat
			@click="snackbar = false"
		>
			Close
		</v-btn>
    </v-snackbar>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'LogInForm',
	props : {
		id: String
	},
	data() {
		return {
			email: '',
			password: '',
			authentication: '',
			show: false,
			rules: {
				required: v => !!v || 'Required.',
				min: v => v.length >= 8 || 'Min 8 characters',
				emailValid : v=> /.+@.+/.test(v) || 'E-mail must be valid'
			},
			checkbox: false,
			button: 'btn-login',
			snackbar: false,
			timeout: 3000,
			message: '',
			url : ''
		}
	},
	computed: {
		disabled() {
			if(this.email.length==0 || this.password.length<8 || this.email==/.+@.+/.test(this.email))
			{
				return true
			}
			else
			{
				return false
			}
		}
	},
	methods: {
		...mapActions('dashboard',['getActiveUser']),
		async checkLogin() {
			this.$toast.show('Logging in...', {icon: "fingerprint"});
			if(this.id== "student")
			{
				this.authentication="student"
			}
			else if(this.id == "faculty")
			{
				this.authentication="faculty"
			}
			else if(this.id == "faculty-head")
			{
				this.authentication="facultyhead"
			}
			else if(this.id == "sub-admin")
			{
				this.authentication="subadmin"
			}
			else if(this.id == "admin")
			{
				this.authentication="admin"
			}
			await this.$auth.loginWith('local', {
				data: {
					"email": this.email,
					"password": this.password,
					"authentication" : this.authentication
				}
			}).catch(e => {
				this.$toast.error('Failed Logging In', {icon: "error_outline"});
			});
			if (this.$auth.loggedIn)
			{
				this.$toast.success('Successfully Logged In', {icon: "done"});
			}
			this.check()
		},
		check(){
			if(this.$auth.loggedIn)
			{
				this.$router.push('/dashboard');
			}
			else
			{
				this.message = "Invalid email or password"
				this.snackbar = true
			}
		}
	}
}
</script>

<style lang="css" scoped>
.login-form {
	padding-left: 20px;
	padding-right: 20px;
}
.btn-login-color {
	border-radius: 10px;
	background-image: linear-gradient(to top,#4e54c8 0%, #8f94fb 100%);
	color: aliceblue;
}
.btn-login {
	border-radius: 10px;
}
</style>
