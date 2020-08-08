<template >
  <nav v-if="showConsole">
      <v-navigation-drawer stateless light :width="navWidth" class=""  clipped fixed  :value="true" app>
        <v-list dense>
						<div class="lineMidText"><span class="lineMidTextSpan">Account Tab</span></div>
            <v-list-group
              v-for="list in accountTab"
              :key="list.route"
              :append-icon="list.children.length ? 'keyboard_arrow_down' : ''"
            >
              <template v-slot:activator>
                <v-list-tile router  :to="list.route" active-class="blue lighten-3" >
                      <v-list-tile-title >{{list.text}}</v-list-tile-title>
                </v-list-tile>
              </template>
                <v-list-tile
                  v-for="clist in list.children"
                  router :to="clist.route"
                  active-class="blue lighten-3 hi30"
                  class = "hi30"
                  :key="clist.route"
                >
                <v-list-tile-content class="chiltap" >
                  {{clist.text}}
                </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
        </v-list>
      </v-navigation-drawer>
</nav>
</template>
<script>
  import jwt_decode    from 'jwt-decode'
  import moment        from 'moment'
  import { mapActions,mapGetters  } from 'vuex'
	import lnc 					 from '../include/include'
  export default{
    data(){
      return{
				showConsole:false,
				accountTab:[
          					{text:'PROFILE'		 ,route:"/user/profile",children:[]},
          					{text:'MY ACCOUNT' ,route:"/user/account",children:[]},
          					{text:'LOGS' ,route:"/user/logs",children:[]},
        ],
      }
    },
    computed : {
		   ...mapGetters({
				userLogin  		: 'user/login',
				user  				: 'user/user',
      }),
      swdrawer(){
        return this.$store.getters['home/drawer']
      },
			navWidth(){
				return (window.outerWidth <= 600)? window.outerWidth : 220
			},
    },
    methods: {
				
    },
  }
</script>