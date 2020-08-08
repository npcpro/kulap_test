<template >
  <nav>
      <v-toolbar app fixed clipped-left :height="userLogin === true? 60 : 50" class="white--text" :color="(showConsole)? 'indigo' : 'grey darken-4'" >
        <v-toolbar-side-icon v-if="userLogin && showConsole" @click.stop="sw_drawer" class="white--text"></v-toolbar-side-icon>
        <v-toolbar-title >NONGJAVA </v-toolbar-title>
				<v-spacer></v-spacer>
				    <v-autocomplete
						v-if="userStores.length"
            class="pl-4 pt-2 pr-2 subtitle-2"
						:item-text="(i)=>`${i.storename} / ${i.ownername}`"
            item-value="storeid"
            :items="userStores"
            v-model="selected"
            solo
            @change="changeEbayStore"
            >
            </v-autocomplete>
        <v-spacer></v-spacer>
        	<div class="pr-1" ev style="width:100px;cursor:pointer;" v-if="userLogin && showConsole">
									<div class="pt-2 text-xs-center">
										<v-avatar size="35">
											<img
												src="https://www.nongjava.com/public/uploads/no-img.jpg"
												alt="John"
											>
										</v-avatar>
										<br>
										<span class="f11" style="vertical-align: top;">{{user.profile.profilename}}</span>
									</div>
          </div>
				  <div class="pr-1" v-if="userLogin && showConsole">
							<v-icon @click="logout()" class="white--text text-xs-right" style="cursor:pointer;">input</v-icon>
					</div>
      </v-toolbar>
</nav>
</template>
<script>
  import lnc from '../views/js/include';
  import { mapActions,mapGetters  } from 'vuex'
  import jwt_decode    from 'jwt-decode'
  import moment        from 'moment'
  export default{
    data(){
      return{
        drawer:true,
        selected:'',
				sw_showHidden:false,
				storename:''
      }
    },
		created(){
        // created
		},
    computed : {
				...mapGetters({
					user       				: 'user/user',
					userLogin  				: 'user/login',
					userStores 	  		: 'user/stores',
					userStoreSelected : 'user/storeSelected',
				}),
				showConsole(){
							const showConsole = lnc.showConsole(this.$route.path)
							return showConsole;
				},
		},
    methods : {
      ...mapActions({
          userSelectedAction  : 'user/storeSelected',     
      }),
      sw_drawer(){
        this.$store.dispatch('user/sw_drawer',this.$store.getters['user/sw_drawer'])
      },
			changeEbayStore(){
          this.userSelectedAction(this.selected)
          localStorage.setItem("storeSelected", this.selected);
			},
			setDefultStore(){
            if(this.$route.query.storeid){
              let key =  this.userStores.map(i=>i.storeid).indexOf(this.$route.query.storeid)
              this.userSelectedAction(this.$route.query.storeid)
              localStorage.setItem("storeSelected", this.$route.query.storeid);
							this.selected = this.$route.query.storeid
							// this.$router.push({ name:this.$route.name,path:this.$route.path, params: {},query:{}})
							console.log('1111');
            }else if( this.userStores.length && !this.userStoreSelected){
              this.userSelectedAction(this.userStores[0].storeid)
              this.selected = (this.userStores[0].storeid)
							console.log('2222');
            }else if(localStorage.storeSelected){
                let key = this.userStores.map(i=>i.storeid).indexOf(localStorage.storeSelected)
                if(this.userStores[key]){
                  this.userSelectedAction(localStorage.storeSelected)
                  this.selected = this.userStores[key]
                }else{
                  this.userSelectedAction(this.userStores[0].storeid)
                  this.selected = (this.userStores[0].storeid)
                }
							console.log('3333');						
            }

						
      },
      logout(){
        this.$store.dispatch('user/login',false)
        this.$store.dispatch('user/user',{})
        localStorage.clear()
        location.assign(process.env.VUE_APP_BASE_URL)
      },    
  	},
		watch : {
      userStores(){
        this.setDefultStore()
      },
      userStoreSelected(){
        this.setDefultStore()       
      },
			sw_showHidden(){
				this.showHiddenActions(this.sw_showHidden)
			},
			// selected(){
			// 	const localStorageStore = localStorage.storeSelected
			// 	if(!this.selected && localStorageStore){
			// 		this.selected = localStorageStore
			// 		console.log('user local');
			// 	}
			// }
    },
	}
</script>
