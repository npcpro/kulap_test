<template >
  <nav v-if="showConsole">
      <v-navigation-drawer stateless light :width="navWidth" class=""  clipped fixed  :value="true" app>
        <v-list dense>
          <v-list-group
            :key="list.route"
            v-for="list in homeTab"
            :append-icon="list.children.length ? 'keyboard_arrow_down' : ''"
          >
            <template v-slot:activator>
              <v-list-tile router  :to="list.route" active-class="blue lighten-3" >
                    <v-list-tile-title >{{list.text}}</v-list-tile-title>
              </v-list-tile>
            </template>
              <v-list-tile
                v-if="list.children"
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
        <div class="lineMidText"><span class="lineMidTextSpan">Store Tab</span></div>
          <v-list-group
            v-for="list in storeTab"
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
        <div class="lineMidText"><span class="lineMidTextSpan">Common Tab</span></div>
            <v-list-group
              v-for="list in commonTab"
              :key="list.route"
              :append-icon="list.children.length ? 'keyboard_arrow_down' : ''"
            >
              <template v-slot:activator>
                <v-list-tile router  :to="list.route" active-class="blue lighten-3" >
                      <v-list-tile-title >{{list.text}}</v-list-tile-title>
                </v-list-tile>
              </template>
                <v-list-tile
                  v-if="list.children"
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
                  v-if="list.children"
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
	import lnc 					 from '../views/js/include'
  export default{
    data(){
      return{
        homeTab:[
          // {text:'HOME',route:"/home",children:[]},
          // {text:'DASHBOARD',route:"/dashboard",children:[]},
        ],
        storeTab:[
          {text:'Sold History'  ,route:"/ordersold/history",children:[]},
          {text:'Sold Error'    ,route:"/ordersold/error",children:[]},
          
          // {text:'Items',
          //       children:[
          //         {text:'Add Item',route:"/additem"},
          //         {text:'Asin Item',route:"/asinitem"},
          //         {text:'End  Item',route:"/enditem"},
          // ]},
          {icon:'keyboard_arrow_right',text:'Settings',
                children:[
                    {text:'Auto track'  ,route:"/stores/settings/autotrack"},
                    {text:'Add item'    ,route:"/stores/settings/ebayaddItem"},
                    {text:'Template'    ,route:"/stores/settings/ebaytemplate"},
                    {text:'eBAY Token'	,route:"/stores/settings/ebayaccount"},
                    {text:'Leave feedback message'			,route:"/stores/settings/ebayleavefeedback"},
                    {text:'Order confirmation message'	,route:"/stores/settings/ebaymessage"},
                    {text:'Order cancel message'     		,route:"/stores/settings/ebaycr"},
                    {text:'Shipping restricted message' ,route:"/stores/settings/ebaycr3"},
                    {text:'Item price'  			,route:"/stores/settings/price"},
                    {text:'Billing address'  	,route:"/stores/settings/ebayaddress"},
            ]},
        ],
				commonTab:[
										{text:'Manage Store' ,route:"/stores/manage",children:[]},
       				  	  {text:'Balance'  		 ,route:"/user/balance",children:[]},      
									// {text:'Search'	,route:"/common/ordersold_search",children:[]},
									// {text:'Blue Care',route:"/common/Bluecare",children:[]},
									// // {text:'Users Action Logs'  ,route:"/common/logs/usersAction",children:[]},
									// {text:'Stores Errors',
									// 			children:[
									// 								{text:'eBay',route:"/common/storesError/ebayError"},
									// 								{text:'Vero',route:"/common/storesError/veroError"},
									// 								{text:'Category Error',route:"/common/storesError/categoryError"},
									// 							]
									// },
									// {text:'Reports',
									// 			children:[
									// 								{text:'Sold Cost',route:"/common/report/soldcost"},
									// 								{text:'Ebay Api' ,route:"/common/report/ebayapi"},
									// 								{text:'Add Items',route:"/common/report/AddItems"},
									// 							],
									// },
									// {text:'Settings',
									// 			children:[
									// 													{text:'Vero'		 ,route:"/common/vero"},
									// 													{text:'Proxy Ip' ,route:"/common/proxy"},
									// 													{text:'Auto' 		 ,route:"/common/auto"},
									// 							]
									// },
								],
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
			showConsole(){
					const showConsole = lnc.showConsole(this.$route.path)
					return showConsole
			},
    },
    methods: {
				
    },
		created(){
				// this.commonTab 	= this.commonTab.map(i=> {return{text:i.text,route:i.route? `${i.route}/${this.user._id}`: '',children:i.children}})
				// this.accountTab = this.accountTab.map(i=>{return{text:i.text,route:i.route? `${i.route}/${this.user._id}` : '',children:i.children}})
				this.storeTab 	= this.storeTab.map(i=>  {return{text:i.text,route:i.route? `${i.route}/${this.user._id}` : '',children:i.children}})
		}
  }
</script>

<style media="screen">
  .chiltap{
      font-size:12px !important;
      padding-left:20px;
      /* text-align:right !important;
      display:block !important; */
  }
  .hi30{
    height:35px !important;
  }

  .lineMidText {
     width: 100%;
     text-align: center;
     border-bottom: 1px solid #00000078;
     line-height: 0.1em;
     margin: 10px 0 20px;
   }

   .lineMidTextSpan{
    background:#fff;
    padding:0 10px;
    font-size:12px;
    font-weight: 800;
  }
</style>
