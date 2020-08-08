<template >
    <v-container>
      <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                 <v-card class="elevation-12">
                   <v-toolbar dark color="dark">
                     <v-toolbar-title>Login form</v-toolbar-title>
                     <v-spacer></v-spacer>
                   </v-toolbar>
                   <v-card-text>
                     <v-form ref="form" v-model="valid" lazy-validation>
                       <v-text-field
                                     v-model="form.username"
                                     :rules="[() => !!form.username || 'Please Input User']"
                                     prepend-icon="person"
                                     label="Login"
                                     @keyup.enter="chkform"
                                     required>
                       </v-text-field>
                       <v-text-field
                                  prepend-icon="lock"
                                  :append-icon="showpass ? 'visibility' : 'visibility_off'"
                                  @click:append="showpass = !showpass"
                                  :rules="[rules.required, rules.min]"
                                  :type="showpass? 'text' : 'password'"
                                  label="password"
                                  v-model="form.password"
                                  class="input-group--focused"
                                  @keyup.enter="chkform"
                                ></v-text-field>
                     </v-form>
                   </v-card-text>
                   <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="primary" :loading="btnLoading" type="submit"  @click="chkform">Login</v-btn>
                   </v-card-actions>
									 <v-alert :type="alertStatus? 'success':'error'" :value="alertStatus">
										 {{alertMsg}}
									 </v-alert>
                 </v-card>
               </v-flex>
             </v-layout>
           	 <MySnackbar  :show="snackBar"  :status="snackBarStatus" :msg="snackBarMsg" />
    </v-container>
</template>

<script type="text/javascript">
    import lnc    			from '../../include/include';
	  import MySnackbar   from '../../components/SnackBar';
    import axios   			from 'axios';
    import delay   			from 'delay';
    import moment   		from 'moment';
	  import jwt_decode   from 'jwt-decode'
		import { mapActions,mapGetters  } from 'vuex'
		
    export default{
			components : {
				MySnackbar,
			},
      data: () => ({
					snackBar:false,
					snackBarStatus:false,
					snackBarMsg:'',
					alertActive:false,
					alertStatus:false,
					alertMsg:'',
          btnLoading:false,
          valid:true,
          drawer: null,
          form:{
            username:'',
            password:''
          },
          showpass: false,
          rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Invalid Condition',
          },
        }),
      props : {
        source : String
      },
      created() {
					lnc.chklogin()
					this.chklogin()
      },
			computed:{
						...mapGetters({
								user       		: 'user/user',
								userLogin  		: 'user/login',
						}),
			},
      methods : {
			 ...mapActions({
						userLoginAction  : 'user/login',
						userAction   	 	 : 'user/user',
   	   }),
				chklogin(){
						if(this.userLogin)location.assign(`/ordersold/history/${this.user._id}`)
						else{
								console.log(this.userLogin,'this.userLogin');
						}
				},
        async chkauthen(){
              let token = this.$route.query.token
              let store = this.$route.query.store
              if(token && store){
                localStorage.setItem("token", JSON.stringify({token:token}));
                localStorage.setItem("storeSelected", store);

              }
        },
        chkform(){
            if(this.$refs.form.validate()){
                console.log('valid');
                this.login()
            }else{
                console.log('invalid');
            }
        },
        async login(){
            this.btnLoading = true
            try{
								const rs = await axios.post('/api/users/login',this.form)
								if(rs.status == 200 && rs.data.status){
									const token = rs.data.token;
									const user  = jwt_decode(token);
									this.snackAlert(rs.data.status,rs.data.msg)
									this.vAlert(rs.data.status,rs.data.msg)
											localStorage.setItem("token", JSON.stringify({token:token}));
											location.assign(`/dashboard`)
								}else{
								  this.snackAlert(false,rs.data.msg || `!Some Thing Wrong.`)
								}
            }catch(e){
              console.log(e,'catch on login');
              this.snackAlert(false,`!Some Thing Wrong.`)
            }
            this.btnLoading = false
        },		
				async vAlert(status,msg){
						this.alertMsg = msg
						this.alertStatus = status
						this.alertActive = true
				},
        snackAlert(status,msg){
              this.snackBar = !this.snackBar
              this.snackBarStatus = status
              this.snackBarMsg = msg
        },
      },
      mounted () {
      },
    }
</script>
