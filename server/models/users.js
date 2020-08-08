const root            = require('path').dirname(require.main.filename);
const fs        	    = require('fs');
const delay        	  = require('delay');
const moment					= require('moment');
const mongoose        = require("mongoose");
const jwt 						= require('jsonwebtoken');
const timestamps      = require("mongoose-timestamp");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt 					= require('bcrypt');
const mangoSchema = mongoose.Schema({
   active 	: {type:Boolean,default:false},
   username	: {type:String,required:true},
   password	: {type:String,required:true},
   email		: {type:String},
   profile	: {type:Object},
});

mangoSchema.index(
  {username: 1},
  {unique: true}
);

mangoSchema.plugin(uniqueValidator);
mangoSchema.plugin(timestamps);


mangoSchema.statics = {
			register: async function (data) {
								try {
										if(  data.firstname.length >= 3
											&& data.lastname.length >= 3
											&& data.username.length >= 6
											&& data.email.length >= 8 
											&& this.chkEmail(data.email)
											&& data.password.length >= 8
											&& data.recaptcha.length == 6
											&& data.recaptcha === data.randomRecaptcha
										){
												const checkDuplicateUserName = await this.findOne({$or:[{username:data.username},{email:data.email}]})
												if(!checkDuplicateUserName){
													  const password = bcrypt.hashSync(data.password,12);
														const user = {
																username:data.username,
																password:password,
																email:data.email,
																profile:{
																				profilename:`${data.firstname} ${data.lastname}`,
																				firstname:data.firstname,
																				lastname:data.lastname,
																		 },		
																activateEmailToken:this.randomStr(256)										
														}
														const rs_resgister = await this.create(user);
														console.log(rs_resgister,'rs_resgister');
														if(rs_resgister){
																this.sendActiveEmail(user.email)
																return {status:true,msg:'Register success.'}
														}else{
																return {status:false,msg:'Fail On Create'};
														}
												}else{
													return {status:false,msg:'This Username Or Email Is Exists.'}
												}
										}else{
											return {status:false,msg:'Wrong Format'}
										}
								} catch (e) {
									console.log(e,'catch on register');
									return {status:false,msg:'catch'};
								}
			},
			login: async function (username,password) {
								console.log('start login',username,password);
								try {
										const user = await this.findOne({username:username});
										if(user && bcrypt.compareSync(password, user.password)){
											if(!user.activeEmail){
													return {status:false,msg:'This Account Not Yet Activate, Please Check Your Email And Activate Before.'}
											}else{
													const data = {_id:user._id,profile:user.profile,email:user.email}  
													const jwt_token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 1 });
													return {status:true,msg:'Wecome to NONGJAVA.',token:jwt_token}
											}
										}else{
												return {status:false,msg:'Username Or Password Invalid.'}
										}
								} catch (e) {
									console.log(e,'catch on login');
									return {status:false,msg:'catch'};
								}
			},		
			changePassword: async function (data) {
								console.log('start changePassword');
								try {
									return true
								} catch (e) {
									console.log(e,'catch on changePassword');
									return {status:false,msg:'catch'};
								}
			},
			getAccount: async function (_id) {
								console.log('start getAccount');
								try {
									const rs = await this.findOne({_id:_id},{_id:1,email:1,usersname:1})
									return rs;
								} catch (e) {
									console.log(e,'catch on getAccount');
									return {status:false,msg:'catch'};
								}
			},
			updateEmail: async function (_id,email) {
								console.log('start updateEmail');
								try {
									if(lnc.chkEmail(email)){
											const rs = await this.updateOne({_id:_id},{$set:{email:email}})
											if(rs)return  {status:true,msg:'Update Email Success'};
											else return {status:false,msg:'Update Email Fail'};
									}else{
											return {status:false,msg:'Update Email Fail'};
									}
								} catch (e) {
									console.log(e,'catch on Update Email');
									return {status:false,msg:'catch'};
								}
			},
			updatePassword: async function (_id,data) {
								console.log('start updatePassword');
								try {
									const currentPassword = data.currentPassword;
									const newPassword = bcrypt.hashSync(data.newPassword,12);
									const user = await this.findOne({_id:_id})							
									if(bcrypt.compareSync(currentPassword, user.password) && newPassword.length >= 8){
											const rs_updatePassword = await this.updateOne({_id:_id},{$set:{password:newPassword}})
											if(rs_updatePassword)return {status:true,'msg':'Update Password Success.'}
												return {status:true,'msg':'Update Password Fail.'}
									}else{
										return {status:false,msg:'Password Invalid.'};
									}	
								} catch (e) {
									console.log(e,'catch on Update Email');
									return {status:false,msg:'catch'};
								}
			},
			getProfile: async function (_id) {
								console.log('start getProfile');
								try {
									const rs = await this.findOne({_id:_id},{_id:1,profile:1})
									return rs;
								} catch (e) {
									console.log(e,'catch on getProfile');
									return {status:false,msg:'catch'};
								}
			},
			updateProfile: async function (_id,data) {
								console.log('start updateProfile');
								try {
									const profile = {
												'profile.profilename':data.profilename,
									}
									const rs = await this.updateOne({_id:_id},{$set:profile})
									if(rs)return  {status:true,msg:'Update Profile Success'};
									else return {status:false,msg:'Update Profile Fail'};
								} catch (e) {
									console.log(e,'catch on updateProfile');
									return {status:false,msg:'catch updateProfile'};
								}
			},
			randomStr: function (length = 64) {
					var result           = '';
					var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
					var charactersLength = characters.length;
					for ( var i = 0; i < length; i++ ) {
							result += characters.charAt(Math.floor(Math.random() * charactersLength));
					}
					return result;
			},
}
module.exports = mongoose.model("users", mangoSchema);
