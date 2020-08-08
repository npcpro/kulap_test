<template >
    <v-container class="pa-0">
      <v-layout row wrap>
				<v-flex offset-lg4 lg4>
					<v-card>	
				 	 <v-alert type="success" :value="true" class="text-xs-center">
						<h2>
							 You have register already,But not activate.
						</h2>
						<br>
						<h3>
							 <u>Please check your email and activate before.</u>
						</h3>
						</v-alert>
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
	  import jwt_decode from 'jwt-decode'

    export default{
			components : {
				MySnackbar,
			},
      data: () => ({
					snackBar:false,
					snackBarStatus:false,
					snackBarMsg:'',
          btnLoading:false,
        }),
      methods : {
        snackAlert(status,msg){
          let call = this
              call.snackBar = !call.snackBar
              call.snackBarStatus = status
              call.snackBarMsg = msg
        },
      },
    }
</script>
