import axios from 'axios'
import CryptoJS from "crypto-js";
import jwt		from 'jsonwebtoken'
import moment from "moment";

export default {
      get : async (url) => {
                  try {
                      const rs = await axios.get(url)
											return rs;
                  } catch (e) {
                      console.log(e);
                      if(e.response.status == 401){
                        cleartoken()
                      }
                  }
      },
      post : async (url,data) => {
        try {
            const rs = await axios.post(url,data)
						return rs;
        } catch (e) {
            console.log(e);
            if(e.response.status == 401){
              cleartoken()
            }else{
							return e;
						}
        }
        
      },
      patch : async (url,data) => {
        let obj ;
        try {
            const rs = await axios.patch(url,data)
						return rs;
        } catch (e) {
            console.log(e);
            if(e.response.status == 401){
              cleartoken()
            }else{
							return e;
						}
        }
        return obj
      },
      delete : async (url,id) => {
        let obj ;
        let url_id = `${url}?id=${id}`
            console.log(url_id,'url_id');
        try {
            const rs = await axios.delete(url_id)
						return rs;
        } catch (e) {
            console.log(e);
            if(e.response.status == 401){
              cleartoken()
            }else{
							return e;
						}
        }
        return obj
      },
      deleteurl : async (url) => {
        console.log(url,'deleteurl');
        try {
            const rs = await axios.delete(url)
						return rs;
        } catch (e) {
            console.log(e.response);
            if(e.response.status == 401){
              cleartoken()
            }else{
							return e;
						}
        }
        return obj
      },
      decodeValue : (value) => {
        return decrypt('cancelgoes',value)
      },
			showConsole : (part) => {
							const showHead = ['/login','/forgotpassword','/','/register','/waitactivate','/updatenewpassword','/forgotpassword'].filter(i=>i === part)
							return showHead.length === 0;
			},
			chkEmail : (email) => {
						const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						const chkEmail = email.match(new RegExp(emailPattern,'gim'))				 
						return chkEmail != null;
			},
			chklogin : () => {
					   try {
						 			if(localStorage.getItem('token')){
											const token = JSON.parse(localStorage.getItem('token')).token
											return jwt.verify(token,process.env.VUE_APP_JWT,(err, decoded)=>{
												if(err)return false
												else{
															const user = decoded
															const loginAt = moment(new Date()).format()
															const expAt   = moment(new Date(user.exp*1000)).format()
															const datediff = moment(loginAt).diff(moment(expAt),'seconds');
															if(datediff < 0){
																console.log('login pass');
																return user

															}else{
																localStorage.clear();
																console.log('login fail');
																return false
															}
														}
											})
									}else{
										return false
									}
						} catch (e) {
									console.log(e,'catch : chklogin');
									console.log('login fail');
									localStorage.clear();
									return false
						}
		},
}

function cleartoken(){
        console.log('clear token');
        // localStorage.token = JSON.stringify({token:''});
        localStorage.setItem("token",'');
        location.assign('/')
        this.$store.dispatch('home/sw_drawer',this.$store.getters['home/drawer'])
}

function decrypt(keys,value) {
        // console.log(value,'=====<====== value');
        const iv = CryptoJS.enc.Hex.parse(value.substr(0, 32));
        const key = CryptoJS.SHA512(keys);

        const decrypted = CryptoJS.AES.decrypt(value.substring(32), key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
}
