<template>
	<v-app :dark="dark" class="global-font">
		<v-navigation-drawer
			v-model="primaryDrawer.model"
			
			
			:floating="primaryDrawer.floating"
			
			absolute
			overflow
			app>

	<!-- new nav -->
		<!-- <v-layout row>
		<v-flex xs10 sm10 md10 lg10>
			<UserProfile />
		</v-flex>
		<v-flex xs2 sm2 lg2 md2>
							<v-list>
								<v-list-tile-action>
									<v-btn icon
										@click.stop="closeDrawerModel">
									<font-awesome-icon :icon="['fas', 'times']"/>
									</v-btn>
								</v-list-tile-action>
							</v-list>
						</v-flex>
		</v-layout>
		<hr>
    <v-list>
		<v-list-tile @click="">
			<v-list-tile-action>
			<v-icon>home</v-icon>
			</v-list-tile-action>
			<v-list-tile-title>Home</v-list-tile-title>
		</v-list-tile>

      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="(admin, i) in admins"
            :key="i"
            @click=""
          >
            <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Actions</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(crud, i) in cruds"
            :key="i"
            @click=""
          >
            <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list-group>
    </v-list> -->


		<!-- old nav -->
		<!-- <v-hover v-slot:default="{ hover }"> -->
			<v-list >
				
				<div>
					<v-layout row>
						<v-flex xs10 sm10 md10 lg10>
							
							<UserProfile />
						
						</v-flex>
						<v-flex xs2 sm2 lg2 md2>
							<v-list>
								<v-list-tile-action>
									<v-btn icon
										@click.stop="closeDrawerModel">
									<font-awesome-icon :icon="['fas', 'times']"/>
									
									</v-btn>
									
								</v-list-tile-action>
							</v-list>
						</v-flex>
					</v-layout>
				</div>
				<hr>
		
				
				<v-list-group
					
					v-for="(item, i) in selectItems"
					:key="i"
					router
					exact
					
				>

					<template v-slot:activator >
						
						<v-list-tile class="tile" >
							<v-list-tile-action >
								
								<font-awesome-icon :icon="[item.icon.prefix, item.icon.name]"/>
							</v-list-tile-action>
							<v-list-tile-content>
								
								<v-list-tile-title >{{ item.title }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						
					</template>

						<v-list-tile
							:to="subItem.to"
							v-for="subItem in item.items"
							:key="subItem.title"
						>
							{{ subItem.title }}
						</v-list-tile>

				</v-list-group>
					
			</v-list>
		<!-- </v-hover> -->

		</v-navigation-drawer>
		<v-toolbar color="primary" :clipped-left="primaryDrawer.clipped" app absolute>
			<v-toolbar-side-icon
				class="white--text"
				@click.stop="primaryDrawer.model = !primaryDrawer.model"
			></v-toolbar-side-icon>
			<img class="logo" src="/nurture-logo.png">
			<v-toolbar-title class="white--text">Nurture</v-toolbar-title>

			<v-spacer />

			<span class="toolbar-icons">
			<v-menu offset-y>
			<template v-slot:activator="{ on }">
				<v-badge
			overlap
			color="orange"
			>
				<template v-slot:badge>
					<span class="badge-text">2</span>
				</template>
				<font-awesome-icon v-on="on" :icon="['far', 'bell']" size="2x" color="white"/>
			</v-badge>

			</template>
			<v-list>
				<v-list-tile>
					<v-list-tile-title>Notification 1</v-list-tile-title>
				</v-list-tile>
				<v-list-tile>
					<v-list-tile-title>Notification 2</v-list-tile-title>
				</v-list-tile>
				<v-list-tile>
					<v-list-tile-title>Notification 3</v-list-tile-title>
				</v-list-tile>
				<v-list-tile>
					<v-list-tile-title>Notification 4</v-list-tile-title>
				</v-list-tile>
			</v-list>
			</v-menu>
			</span>

			<v-menu offset-y>
				<template v-slot:activator="{ on }">
				<v-toolbar-title v-on="on">
					<span class="toolbar-icons"><v-btn icon><font-awesome-icon :icon="['fas', 'cog']" size="2x" color="white"/></v-btn></span>
				</v-toolbar-title>
				</template>

				<v-list>
				<v-list-tile
				>
					<v-list-tile-action><v-switch @change="changeTheme" v-model="dark" primary color="primary" :label="switchLabel"></v-switch></v-list-tile-action>


				</v-list-tile>
				<v-list-tile
				>
					<v-list-tile-action><font-awesome-icon :icon="['fas', 'sign-out-alt']"/></v-list-tile-action>
					<v-list-tile-title @click="userLogout" class="logout" >Logout</v-list-tile-title>
					<!-- <v-btn flat @click="userLogout"><v-list-tile-title >Logout</v-list-tile-title></v-btn> -->
				</v-list-tile>
				</v-list>
     		</v-menu>

		</v-toolbar>


		<nuxt />


        <v-footer :inset="footer.inset" app>
        	<span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
	</v-app>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import UserProfile from '@/components/UserProfile.vue'

export default {
	name: 'DashboardNavigationLayout',
	components: {
		UserProfile
	},
    data: () => ({
		primaryDrawer: {
			model: null,
			type: 'default',
			clipped: false,
			floating: true,
			
		},
		footer: {
			inset: true
		},
		right: true,
		rightDrawer: false,
		fixed: false
	}),
	computed: {
		...mapState({
			studentItems : state => state.dashboard.studentItems,
			teacherItems : state => state.dashboard.teacherItems,
			superAdminItems : state => state.dashboard.superAdminItems,
			mentorItems : state => state.dashboard.mentorItems,
			adminItems : state => state.dashboard.adminItems,
			auditItems : state => state.dashboard.auditItems,
			dark: state => state.theme.dark
		}),
		selectItems() {
			if(this.studentItems.active==true)
			{
				return this.studentItems.items
			}
			else if(this.teacherItems.active==true)
			{
				return this.teacherItems.items
			}
			else if(this.mentorItems.active==true)
			{
				return this.mentorItems.items
			}
			else if(this.superAdminItems.active==true)
			{
				return this.superAdminItems.items
			}
			else if(this.adminItems.active==true)
			{
				return this.adminItems.items
			}
			else if(this.auditItems.active==true)
			{
				return this.auditItems.items
			}
		},
		switchLabel() {
			if(this.dark == true)
			{
				return 'Light Mode'
			}
			else
			{
				return 'Dark Mode'
			}
		}
	},
	methods: {
		...mapActions('theme',['changeTheme']),
		closeDrawerModel() {
			this.primaryDrawer.model = !this.primaryDrawer.model
		},
		async userLogout() {
			await this.$auth.logout()
			.then(() => this.$toast.success('Thank You. You are successfully logged out', {icon: "done"}))
			.catch(e => {
				this.$toast.error('Failed Logging Out. Please try again', {icon: "error_outline"});
			});
		}
	},
	created() {
		this.primaryDrawer.model = false
		if(this.$auth.loggedIn)
		{
			if(this.$auth.user.authentication==1)
			{
				this.studentItems.active=true
			}
			else if(this.$auth.user.authentication==5)
			{
				this.superAdminItems.active=true
			}
			else if(this.$auth.user.authentication==4)
			{
				this.adminItems.active=true
			}
		}
		else
		{
			this.$router.push('/')
		}
	}
}
</script>


<style lang="scss" scoped >
@import '~/assets/scss/_variables.scss';

.logo{
	height: 40px;
	width: 60px;
	padding-left: 15px;

}


  .tile:hover {
	color: #10b687;
	
  }
  .tile:active {
    color:#10b687;
  }

.menu-sublist
{
	margin-left: 20%;
}

.toolbar-icons {
	margin: 5px;
}
.badge-text {
	font-size: 10px;
}
.logout
{
	cursor: pointer;
}
</style>
