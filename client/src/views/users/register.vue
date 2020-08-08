<template >
    <v-container class="pa-0">
      <v-layout row wrap>
				<v-flex class="offset-md4 md4 xs12" >
					<v-card class="mt-2  elevation-5" tile>
					<v-layout row wrap>
							<v-flex class="pt-2 pl-2" xs12>
								<span class="title" style="font-size:38px!important">Register</span>								
							</v-flex>
							<v-flex class="sm6 xs12">
								<v-text-field v-model="user.firstname" 
														  name="First Name" 
															label="First Name" 
															class="pl-3 pr-3" 
															:rules="[() => (user.firstname.length > 3) || 'Prease Input First Name More 3 Charactors.']"
															>
								</v-text-field>
							</v-flex>
							<v-flex class="sm6 xs12">
									<v-text-field 
													v-model="user.lastname" 
													name="Last Name" 
													label="Last Name" 
													class="pl-3 pr-3" 
													:rules="[() => (user.lastname.length  > 3) || 'Prease Input Last Name More 3 Charactors.']"												
													>
									</v-text-field>
							</v-flex>
							<v-flex class="xs12">
									<v-text-field 
											v-model="user.username" 
											name="Username" 
											label="Username" 
											class="pl-3 pr-3" 
											:rules="[() => (user.username.length >= 6) || 'Prease Input Username More 6 Charactors.']"																							
											>
									</v-text-field>
							</v-flex>
							<v-flex class="xs12">
									<v-text-field 
											v-model="user.email" 
											name="Email" 
											label="Email" 
											class="pl-3 pr-3" 
											:rules="[() => (!!chkEmail) || 'Prease Input Valid Email.']"																							
											>
									</v-text-field>
							</v-flex>
							<v-flex class="xs12">
									<v-text-field 
												v-model="user.password" 
												name="Password" 
												label="Password" 
												class="pl-3 pr-3"
												type="password" 
												:rules="[() => {return (user.password.length < 8)? 'Prease Input Password More 8 Charactors.' : true}]"																																		
												>
									</v-text-field>
							</v-flex>
							<v-flex class="xs12">
									<v-text-field 
												v-model="user.confirmPassword" 
												name="confirmPassword" 
												label="confirmPassword" 
												class="pl-3 pr-3"
												type="password" 
												:rules="[() => {return (!user.confirmPassword || user.password !== user.confirmPassword)? 'Prease Input Confirm Password.' : true}]"																																	
												>
								</v-text-field>
							</v-flex>
							<v-flex class="xs12 text-xs-left" >
								<v-text-field 
											v-model="user.recaptcha" 
											name="Recaptcha" 
											label="Recaptcha" 
											class="pl-3 pr-3" 
											maxlength="6"											
											:rules="[() => (user.recaptcha.length == 6) || 'Prease Input Valid Recaptcha.']"					
											>
									</v-text-field>					
								<div class="pl-3">
									<canvas class="" style="background-color:#fafaff" width="100" height="60" v-insert-message="randomRecaptcha"></canvas>	
								</div>			
							</v-flex>
							<v-flex xs12>
									<v-btn color="success" class="title pa-0 ma-0" @click="submit" :disabled="!chkForm" :loading="btnLoading" tile block>SUBMIT</v-btn>
							</v-flex>
					</v-layout>
					</v-card>
				</v-flex>
			</v-layout>
   	 <MySnackbar  :show="snackBar"  :status="snackBarStatus" :msg="snackBarMsg" />
    </v-container>
</template>

<script type="text/javascript">
    import lnc    from '../js/include';
	  import MySnackbar     from '../../components/SnackBar';
    import axios  from 'axios';
    import moment from 'moment';
    import delay 	from 'delay';
	  import jwt_decode from 'jwt-decode'

    export default{
			components : {
				MySnackbar,
			},
      data: () => ({
					snackBar:false,
					snackBarStatus:false,
					snackBarMsg:'',
					randomRecaptcha:'',
          btnLoading:false,
          drawer: null,
          user:{
            firstname:'',
            lastname:'',
						username:'',
						email:'',
						password:'',
						confirmPassword:'',
						recaptcha:'',				
          },
          showpass: false,
        }),
			directives: {
						insertMessage: function(canvasElement, binding) {
								var ctx = canvasElement.getContext("2d");
								ctx.clearRect(0, 0, 300, 150);
								ctx.fillStyle = "black";
								ctx.font = "20px Georgia";
								ctx.fillText(binding.value, 10, 40);
						}
			},
			computed : {
				chkForm(){
						return 		this.user.firstname.length >= 3
									 && this.user.lastname.length >= 3
									 && this.user.username.length >= 6
									 && this.user.email.length >= 8 
									 && this.chkEmail
									 && this.user.password.length >= 8
									 && this.user.recaptcha.length == 6
									 
				},
				chkEmail(){
						return lnc.chkEmail(this.user.email)
				}
			},
	
      created() {
        this.newRandomRecaptcha()
      },
      methods : {
        newRandomRecaptcha() {
					var length = 6;
					var result           = '';
					var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
					var charactersLength = characters.length;
					for ( var i = 0; i < length; i++ ) {
							result += characters.charAt(Math.floor(Math.random() * charactersLength));
					}
					this.randomRecaptcha = result;
				},
				async submit(){
							if(		this.user.firstname.length >= 3
									&& this.user.lastname.length >= 3
									&& this.user.username.length >= 6
									&& this.user.email.length >= 8 
									&& this.chkEmail
									&& this.user.password.length >= 8
									&& this.user.recaptcha.length == 6
									&& this.user.recaptcha === this.randomRecaptcha
							){
								try {
									this.btnLoading = true
								  console.log({...this.user,...{randomRecaptcha:this.randomRecaptcha}},'{...this.user,...{randomRecaptcha:this.randomRecaptcha}}');
									const rs_register = await lnc.post(`/api/users/register`,{...this.user,...{randomRecaptcha:this.randomRecaptcha}});
									if(rs_register.status == 200 && rs_register.data.status){
											this.snackAlert(true,rs_register.data.msg)
											location.assign('/waitactivate');
									}else{
											this.snackAlert(false,rs_register.data.msg)
									}
								} catch (e) {
										console.log(e,'catch on submit');
										this.snackAlert(false,'!Some Thing Wrong.')							
								}
									await delay(2000);
									this.btnLoading = false
							}else{
								this.snackAlert(false,'!Some Thing Wrong.')
							}
								this.newRandomRecaptcha()
								this.user.recaptcha = ''
				},
        snackAlert(status,msg){
          let call = this
              call.snackBar = !call.snackBar
              call.snackBarStatus = status
              call.snackBarMsg = msg
        },
      },
      mounted () {
      },
    }
</script>
