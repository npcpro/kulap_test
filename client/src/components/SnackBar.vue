<template>
  <v-snackbar
      v-model="showSnack"
      :buttom="true"
      multi-line
      flat
    >
    <v-icon flat icon :color="status? 'green' : 'red' " class="pr-3">{{status? 'check_circle' : 'clear'}}</v-icon>
    <br>
    <span class="ml-0 pl-0" v-html="msg"></span>

    <v-btn
      color="pink"
      flat
      @click="showSnack = false"
      >
      Close
    </v-btn>
  </v-snackbar>
</template>
<script>
  import moment from 'moment'
  export default {
    props: {
      show: {type: Boolean},
      status:{type:Boolean},
      msg:{type:String},
    },
    data: () => ({
      showSnack:false
    }),
    created  (){

    },
    methods: {
      snack() {
        let call = this
            call.showSnack = true
            setTimeout(function(){
              call.showSnack = false
            }, 8000);
      }
    },
    watch : {
          show() {
              this.snack()
          }
    },
  }
</script>
