<template >
    <v-container>
      <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
									<v-card >
										<v-card-text>
											<v-text-field
												name="newPassword"
												label="New Password"
												type="password"
												v-model="data.newPassword"
											></v-text-field>			
										</v-card-text>
										<v-card-text>
											<v-text-field
												name="confirmNewPassword"
												label="Confirm New Password"
												type="password"
												v-model="data.confirmNewPassword"
											></v-text-field>			
										</v-card-text>
										<v-card-actions>
											 <v-btn color="success" @click="updateNewPassword" :loading="btnLoading" :disabled="!chkPass" small block>SUBMIT</v-btn>
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
          data:{
            newPassword:'',
            confirmNewPassword:''
          },
					email:'',
					token:'',
        }),
			computed:{
						...mapGetters({
								user       		: 'user/user',
								userLogin  		: 'user/login',
						}),
						chkPass(){
							return   this.data.newPassword.length >= 8 
										&& this.data.confirmNewPassword.length >= 8
										&& this.data.newPassword === this.data.confirmNewPassword
						}
			},
			created(){
				this.email = this.$route.query.email;
				this.token = this.$route.query.token;
			},
      methods : {
        async updateNewPassword(){
            this.btnLoading = true
            try{
								const rs = await lnc.post(`/api/users/updatenewpassword?email=${this.email}&token=${this.token}`,this.data)
								console.log(rs,'rs');
								if(rs.status == 200){
									this.snackAlert(rs.data.status,rs.data.msg);
									await delay(2000)
									location.assign('/login');
								}else{
									this.snackAlert(false,'!Somethin Wrong.')
								}
            }catch(e){
              console.log(e,'catch on login');
              this.snackAlert(false,`!Some Thing Wrong.`)
            }
        },		
        snackAlert(status,msg){
              this.snackBar = !this.snackBar
              this.snackBarStatus = status
              this.snackBarMsg = msg
        },
      },
    }
</script>
