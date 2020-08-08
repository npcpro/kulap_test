<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card >
          <v-card-title >
            <h1>{{page}}</h1>
          </v-card-title>			
					<v-layout row wrap>
					<!-- profile name -->
						<v-flex xs3>
						<v-card-title primary-title>
							<b>Profile Name : </b>
						</v-card-title>
						</v-flex>
						<v-flex xs7>
							<v-text-field
								name="profilename"
								v-model="profile.profilename"
								:disabled="true"
							></v-text-field>
						</v-flex>
						<v-flex class="pt-3" xs1>
							<v-btn color="warning" @click="editProfileInfo"  small outline icon>
								<v-icon>edit</v-icon>
							</v-btn>
						</v-flex>
					</v-layout>
					<!-- profile name -->
					
					<!-- firstname name -->
					<v-layout row wrap>
						<v-flex class="pl-3" xs10>
							<span>
								<b>First Name : </b> &nbsp;	{{profile.firstname}}
							</span>
						</v-flex>
					</v-layout>
					<!-- firstname name -->

					<!-- lastname name -->
					<v-layout row wrap>
						<v-flex class="pl-3" xs10>
							<span>
								<b>Last Name : </b>	&nbsp; {{profile.lastname}}
							</span>
						</v-flex>
					</v-layout>
				</v-card>	
      </v-flex>
    </v-layout>
		<!-- profile name dialog -->
		<v-dialog v-if="editProfileDialog" v-model="editProfileDialog" persistent  min-width="550px" max-width="650px" transition="scale-transition">
      <v-card>
						<v-card-title  class="headline blue lighten-3"primary-title>
							<b>Update Profile Name</b>
							<v-spacer></v-spacer>
							<v-card-actions>
								<v-icon size="30" @click="editProfileDialog=false" color="">close</v-icon></v-btn>
							</v-card-actions>
						</v-card-title>
						<v-card-text>
							<v-text-field
								name="profilename"
								label="Profile Name"
								v-model="editProfile.profilename"
							></v-text-field>	
						</v-card-text>
						<v-card-actions class="pa-1">
							<v-btn color="success" @click="updateProfile" :loading="btnLoading" :disabled="!chkProfile" small block tile>SAVE</v-btn>
						</v-card-actions>
      </v-card>
    </v-dialog>
		<!-- profile name dialog -->


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
      editProfileDialog:false,
			profile:{},
			editProfile:{
				profilename:'',
			},
      pageData : {}
    }
  },
  computed: {
    ...mapGetters({
          //userStoreSelected   : 'user/storeSelected',
    }),
		chkProfile(){
			return this.editProfile.profilename && this.editProfile.profilename.length > 4;
		}
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
                  const rs = await lnc.get(`/api/users/profile`)
									console.log(rs,'rs show');
                  if(rs.status == 200 && rs.data.profile){
                      this.profile = rs.data.profile;
                    }
                } catch (e) {
                  console.log(e,'catch on showData');
                }
                this.dataLoading = false
        },
				editProfileInfo(){
					this.editProfileDialog = true
					this.editProfile.profilename = this.profile.profilename;
				},

        async updateProfile(){
              this.btnLoading = true
              try {
                if(this.chkProfile){
                const rs = await lnc.patch(`/api/users/profile`,this.editProfile)
								console.log(rs,'rs');
									if(rs.status == 200 && rs.data.status){
										this.snackAlert(true,rs.data.msg)
										this.profile.profilename = this.editProfile.profilename;
									}else{
										this.snackAlert(false,'!Something Wrong.')
									}								
								}
              } catch (e) {
                console.log(e,'catch on udpate Data');
              }
							await delay(500)
							this.editProfileDialog = false
              this.btnLoading = false
        },
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
