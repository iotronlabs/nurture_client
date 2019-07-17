<template>
	<v-app class="global-font">
		<v-content>
			<v-container fluid fill-height class="container-grad">
				<v-layout align-center justify-left row wrap>
					<v-flex justify-center align-center xs12 sm6 md5 offset-md2 offset-xs2>
						<img class="logo" src="/nurture-logo.png">
					</v-flex>

					<v-flex xs12 sm6 md4 :class="this.$vuetify.breakpoint.smAndDown ? 'device-sm' : ''">

						<v-card class="elevation-12 card-design">
							<!-- <v-toolbar class="login-grad" >
							</v-toolbar> -->
								<v-card-text>


								<nuxt />

							</v-card-text>
							<br>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>

		<v-footer class="footer">
			<v-layout>
				<v-flex>
					Made with <span class="heart">&hearts;</span> at
					<a href="http://www.iotronlabs.com" target="_blank" class="footer-link">Iotronlabs</a>
				</v-flex>
			</v-layout>
		</v-footer>
  	</v-app>

</template>

<script>
export default {
	created() {
		if(this.$auth.loggedIn)
		{
			this.$router.push('/dashboard')
		}
		document.addEventListener('keydown', function() {
		if (event.keyCode == 123) {
			return false;
		}  if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
			return false;
		}  if (event.ctrlKey && event.keyCode == 85) {
			return false;
		}
		}, false);

		if (document.addEventListener) {
		document.addEventListener('contextmenu', function(e) {
			e.preventDefault();
		}, false);
		} else {
		document.attachEvent('oncontextmenu', function() {
			window.event.returnValue = false;
		});
		}
	}
}
</script>

<style scoped>
.device-sm
{
	padding-top: 10%;
}
.container-grad
{
	background-image: linear-gradient(to top,#4e54c8 0%, #8f94fb 100%);	
	/* background-image: linear-gradient(to top,#10cf99 0%, #5effd1 100%); */
}
.login-grad
{
	background-image: linear-gradient(to right,#434343 0%, black 100%);
	border-radius: 0px 0px 15px 15px;
}
.logo{
	height: 200px;
	width: 200px;
	padding-left: 25px;
}
.v-toolbar {
	height: 60px;
}

.card-design {
	border-radius: 15px;


}
.toolbar-text {
	font-size: 1.5em;
	color: white;
}
img
{
	height: 30px;
	width: 25%;
	min-width: 100px;
}
.footer
{
	background-image: linear-gradient(to top,#4e54c8 0%, #8f94fb 100%);	
	text-align: center;
	color: white;

}
.heart
{
	color: #e25555;
}
.footer-link
{
	text-decoration: none;
	color: #fff;
}
</style>
