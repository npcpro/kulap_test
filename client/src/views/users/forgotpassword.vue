<template >
    <v-container>
      <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
									<v-card>
										<v-card-text>
											<v-text-field
												v-model="email"
												name="Email"
												label="Email"
											></v-text-field>			
										</v-card-text>
										<v-card-actions>
											 <v-btn color="success" @click="forgotPassword" :loading="btnLoading" small block>SUBMIT</v-btn>
										</v-card-actions>
									</v-card>
               </v-flex>
             </v-layout>
           	 <MySnackbar  :show="snackBar"  :status="snackBarStatus" :msg="snackBarMsg" />
    </v-container>
</template>

<script type="text/javascript">
    import lnc     			from '../js/include';
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
          btnLoading:false,
          email:'',
        }),
			computed:{
						...mapGetters({
								user       		: 'user/user',
								userLogin  		: 'user/login',
						}),
			},
      methods : {
        async forgotPassword(){
            this.btnLoading = true
            try{
								const rs = await lnc.post('/api/users/forgotpassword',{email:this.email})
								console.log(rs,'rs');
								if(rs.status == 200){
              		 this.snackAlert(rs.data.status,rs.data.msg)								
								}else{
             			 this.snackAlert(false,`!Some Thing Wrong.`)
								}
								await delay(2000);
								location.assign('/')
            }catch(e){
              console.log(e,'catch on login');
              this.snackAlert(false,`!Some Thing Wrong.`)
            }
            // this.btnLoading = false
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
