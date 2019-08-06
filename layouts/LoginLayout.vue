<template>
	<v-app class="global-font">
		<v-content>
			<v-container fluid fill-height class="container-grad">
				<v-layout  justify-center row wrap>
					<v-flex xs12 sm12 md12>
						<center><img class="logo" src="/nurture-logo.png"></center>
					</v-flex>

					<v-flex xs12 sm6 md4 :class="this.$vuetify.breakpoint.smAndDown ">

						<v-card class="elevation-10 card-design">
							
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
import preventInspect from '@/assets/js/main'
export default {
	created() {
		if(this.$auth.loggedIn)
		{
			this.$router.push('/dashboard')
		}
		preventInspect
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

.logo{
	height: 200px;
	width: 200px;
}

.card-design {
	border-radius: 20px ;


}
.toolbar-text {
	font-size: 1.5em;
	color: white;
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
