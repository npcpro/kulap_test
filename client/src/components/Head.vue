<template >
  <nav>
      <v-toolbar app fixed clipped-left :height="userLogin === true? 60 : 50" class="white--text" :color="(showConsole)? 'indigo' : 'grey darken-4'" >
        <v-toolbar-title >WELCOME </v-toolbar-title>
        <v-spacer></v-spacer>
				  <div class="pr-1" v-if="userLogin && showConsole">
							<v-icon @click="logout()" class="white--text text-xs-right" style="cursor:pointer;">input</v-icon>
					</div>
      </v-toolbar>
</nav>
</template>
<script>
  import lnc from '../include/include';
  import { mapActions,mapGetters  } from 'vuex'
  import jwt_decode    from 'jwt-decode'
  import moment        from 'moment'
  export default{
    data(){
      return{
        drawer:true,
        selected:'',
				sw_showHidden:false,
      }
    },
    computed : {
				...mapGetters({
					user       				: 'user/user',
					userLogin  				: 'user/login',
				}),
				showConsole(){
						return lnc.showConsole(this.$route.path)
				},
		},
    methods : {
      sw_drawer(){
        this.$store.dispatch('user/sw_drawer',this.$store.getters['user/sw_drawer'])
      },
      logout(){
        this.$store.dispatch('user/login',false)
        this.$store.dispatch('user/user',{})
        localStorage.clear()
        location.assign(process.env.VUE_APP_BASE_URL)
      },    
			logout(){
				console.log('aaaaaab');
        this.$store.dispatch('user/login',false)
        this.$store.dispatch('user/user',{})
        localStorage.clear()
        location.assign(process.env.VUE_APP_BASE_URL)
      },   
  	},
		watch : {
    },
	}
</script>
