<template>
  <v-app :dark="dark">
    <Head />
    <Navbar v-if="userLogin && userSwDrawer"/>
    <v-content>
        <router-view></router-view>
    </v-content>
    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>
<script>
import lnc    from './include/include';
import Head   from './components/Head'
import Navbar from './components/Navbar'
import moment from 'moment'
import jwt		from 'jsonwebtoken'
import { mapActions,mapGetters  } from 'vuex'

export default {
  name: 'App',
  components: {
    Head,Navbar
  },
  data () {
    return {
      dark:false,
      login:true,
      chkWallets:false,
    }
  },
computed : {
      ...mapGetters({
        user 							 : 'user/user',
        userLogin 				 : 'user/login',
        userSwDrawer 			 : 'user/sw_drawer',				
      }),
			showHead(){
					return this.$route.path.match('login') == null;
			},		
  },
	created(){
			this.chklogin()
	},
	methods: {
		...mapActions({
											userAction   	 	 : 'user/user',
											userLoginAction  : 'user/login',
		}),
		chklogin(){
					   const user = lnc.chklogin()
						 if(user){					
								this.userLoginAction(true);
								this.userAction(user)
					   }else{
						 		localStorage.clear()
						 }
		},
  },

}
</script>

<style media="screen">
    .f20{
      font-size:20px!important
    }
    .f11{
      font-size:11px!important;
    }
    .cpoint{
      cursor:pointer;
      color:#2a80d5;
    }
</style>
