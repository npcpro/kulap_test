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
														}
														const rs_resgister = await this.create(user);
														console.log(rs_resgister,'rs_resgister');
														if(rs_resgister){
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
													const data = {_id:user._id,profile:user.profile,email:user.email}  
													const jwt_token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 1 });
													return {status:true,msg:'Welcome',token:jwt_token}
										}else{
												return {status:false,msg:'Username Or Password Invalid.'}
										}
								} catch (e) {
									console.log(e,'catch on login');
									return {status:false,msg:'catch'};
								}
			},		
				chkEmail: async function (email) {
				const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				const chkEmail = email.match(new RegExp(emailPattern,'gim'))				 
				return chkEmail != null;
			},
		
}
module.exports = mongoose.model("users", mangoSchema);
