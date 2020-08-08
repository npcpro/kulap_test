<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card >
          <v-card-title >
            <h1>{{page}}</h1>
          </v-card-title>			
					<v-layout row wrap>
					<!-- Email -->
						<v-flex class="pl-3 pt-3" xs4>
							<span>
								<b>Email : </b>
							</span>
						</v-flex>
						<v-flex xs6>
							<v-text-field
								name="email"
								class="pt-1"
								v-model="account.email"
								:disabled="true"
							></v-text-field>
						</v-flex>
						<v-flex class="pt-2" xs1>
							<v-btn color="warning" @click="editEmail()"  small outline icon>
								<v-icon>edit</v-icon>
							</v-btn>				
						</v-flex>
					</v-layout>
					<!-- Email-->
					
					<!-- Password -->
				<v-layout row wrap>			
					<v-flex class="pl-3 pt-3" xs4>
						<span>
							<b>Password : </b>
						</span>
					</v-flex>
					<v-flex xs6>
						<v-text-field
							name="email"
							class="pt-1"
							value="********"
							:disabled="true"
						></v-text-field>
					</v-flex>
					<v-flex class="pt-2" xs1>
						<v-btn color="warning" @click="editPassword()"  small outline icon>
							<v-icon>edit</v-icon>
						</v-btn>				
					</v-flex>
				</v-layout>
				<!-- Password-->
				</v-card>	
      </v-flex>
    </v-layout>
		<!-- email dialog -->
		<v-dialog v-if="editEmailDialog" v-model="editEmailDialog" persistent  min-width="550px" max-width="650px" transition="scale-transition">
      <v-card>
						<v-card-title  class="headline blue lighten-3"primary-title>
							<b>Update Email</b>
							<v-spacer></v-spacer>
							<v-card-actions>
								<v-icon size="30" @click="editEmailDialog=false" color="">close</v-icon></v-btn>
							</v-card-actions>
						</v-card-title>
						<v-card-text>
							<v-text-field
								name="email"
								label="Email"
								v-model="editAccount.email"
							></v-text-field>	
						</v-card-text>
						<v-card-actions class="pa-1">
							<v-btn color="success" @click="updateEmail" :loading="btnLoading" :disabled="!chkEmail" small block tile>SAVE</v-btn>
						</v-card-actions>
      </v-card>
    </v-dialog>
		<!-- dialog -->

		<!-- password dialog -->
		<v-dialog v-if="editPasswordDialog" v-model="editPasswordDialog" persistent  min-width="550px" max-width="650px" transition="scale-transition">
      <v-card>
						<v-card-title  class="headline blue lighten-3"primary-title>
							<b>Update Password</b>
							<v-spacer></v-spacer>
							<v-card-actions>
								<v-icon size="30" @click="editPasswordDialog=false" color="">close</v-icon></v-btn>
							</v-card-actions>
						</v-card-title>
						<v-card-text>
							<v-text-field
								name="currentPassword"
								label="Current Password"
								v-model="editAccount.currentPassword"
								type="password"
							></v-text-field>	
						</v-card-text>
					 	<v-card-text>
							<v-text-field
								name="newPassword"
								label="New Password"
								v-model="editAccount.newPassword"
								type="password"

							></v-text-field>	
						</v-card-text>
						<v-card-actions class="pa-1">
							<v-btn color="success" @click="updatePassword" :loading="btnLoading" :disabled="!chkPassword" small block tile>SAVE</v-btn>
						</v-card-actions>
      </v-card>
    </v-dialog>
		<!-- password dialog -->
    <MySnackbar  :show="snackBar" :status="snackBarStatus" :msg="snackBarMsg" />
  </v-container>
</template>


<script>
import MySnackbar from '../../components/SnackBar';
import lnc     from '../js/include';
import numeral from 'numeral';
import moment from 'moment';
import delay from 'delay';
import { mapActions,mapGetters  } from 'vuex'


export default {
  components : {
    MySnackbar
  },
  data(){
      return{
      snackBar:false,
      snackBarStatus:false,
      snackBarMsg:'',
			page:'',
      waitStoreId:false,
      btnLoading:false,
      editEmailDialog:false,
			editPasswordDialog:false,
			account:{},
			editAccount:{
				email:'',
				currentPassword:'',
				newPassword:'',
			},
      pageData : {}
    }
  },
  computed: {
    ...mapGetters({
          //userStoreSelected   : 'user/storeSelected',
    }),
		chkEmail(){
			return lnc.chkEmail(this.editAccount.email)
		},
		chkPassword(){
			return this.editAccount.currentPassword.length >= 8 && this.editAccount.newPassword.length >= 8
		},
		chkProfile(){
			// return this.profile.profilename && this.profile.profilename.length > 4;
		},
  },

  watch: {
  },
  created () {
    // this.showData()
    // this.page = this.$route.name
    this.page = this.$route.name
    this.show()
  },
  methods: {
        async show(){
                this.dataLoading = true
                try {
                  const rs = await lnc.get(`/api/users/account`)
									console.log(rs,'rs show');
                  if(rs.status == 200 && rs.data){
                      this.account = rs.data;
                    }
                } catch (e) {
                  console.log(e,'catch on showData');
                }
                this.dataLoading = false
        },
				editEmail(){
						this.editEmailDialog = true
						this.editAccount.email = this.account.email
				},
				async updateEmail(){
						this.btnLoading = true
						try {
							const rs = await lnc.patch(`/api/users/account/email`,{email:this.editAccount.email})
							console.log(rs,'rs updateEmail');
							if(rs.status == 200){
								this.snackAlert(rs.data.status,rs.data.msg);
							 	this.account.email = this.editAccount.email
							}else{
								this.snackAlert(false,'!Something Wrong.')
							}
						} catch (e) {
							console.log(e,'catch on updateEmail');
						}
						this.editEmailDialog = false
						this.btnLoading = false							
				},
				editPassword(){
						this.editPasswordDialog = true
				},
				async updatePassword(){
						this.btnLoading = true
						try {
							const data = { currentPassword:this.editAccount.currentPassword,
														 newPassword:this.editAccount.newPassword
													 }
							const rs = await lnc.patch(`/api/users/account/password`,data)
							console.log(rs,'rs updatePassword');
							if(rs.status == 200){
								this.snackAlert(rs.data.status,rs.data.msg);
								this.editAccount.currentPassword = ''
								this.editAccount.newPassword = ''
							}else{
								this.snackAlert(false,'!Somethin Wrong.')
							}
						} catch (e) {
							console.log(e,'catch on updatePassword');
						}
						this.editPasswordDialog = false
						this.btnLoading = false
				},
        // async save(){
        //       this.btnLoading = true
        //       try {
        //         if(this.chkProfile){
        //         const rs = await lnc.patch(`/api/users/profile`,this.profile)
				// 				console.log(rs,'rs');
				// 					if(rs.status == 200){
				// 						this.snackAlert(rs.data.status,rs.data.msg)
				// 					}else{
				// 						this.snackAlert(false,'!Something Wrong.')
				// 					}								
				// 				}
        //       } catch (e) {
        //         console.log(e,'catch on udpate Data');
        //       }
				// 			await delay(500)
        //       this.btnLoading = false
        // },
        snackAlert(status,msg){
              this.snackBar = !this.snackBar
              this.snackBarStatus = status
              this.snackBarMsg = msg
        },
  }
}
</script>
<style media="screen">
  .opa0{
    opacity:0;
  }
  .opa1{
    opacity:1;
  }
</style>
