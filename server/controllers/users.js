
const fs     = require('fs');
const root   = require('path').dirname(require.main.filename);
const users  = require(`${root}/models/users`);
const mg     = require(root+'/CONFIG/mongodb');

exports.login = async (req,res) => {
        try {
						const data = req.body
						const username = data.username
						const password = data.password
						const rs = await users.login(username,password)
            res.send(rs)
        } catch (e) {
            res.sendStatus(503)
            console.log(e,'catch on users login');

        }
}

exports.register = async (req,res) => {
        try {
			   		const data =  req.body
						if(data.recaptcha && data.randomRecaptcha && data.recaptcha === data.randomRecaptcha){
								const rs = await users.register(data)
          		  res.send(rs)
						}else{
								res.sendStatus(401)
						}
        } catch (e) {
            res.sendStatus(503)
            console.log(e,'catch on users register');
        }
}

exports.profile = async (req,res) => {
        try {
						const user	  = await lnc.userHeader(mg,req.headers.authorization)
						const rs = await users.getProfile(user._id)
            res.send(rs)
        } catch (e) {
            res.sendStatus(503)
            console.log(e,'catch on users login');
        }
}

exports.updateProfile = async (req,res) => {
        try {
						console.log('start updateProfile');
						const user = await lnc.userHeader(mg,req.headers.authorization)
						const data = req.body
						const rs = await users.updateProfile(user._id,data)
            res.send(rs)
        } catch (e) {
            res.sendStatus(503)
            console.log(e,'catch on users login');

        }
}

exports.account = async (req,res) => {
        try {
						const user	  = await lnc.userHeader(mg,req.headers.authorization)
						const rs = await users.getAccount(user._id)
            res.send(rs)
        } catch (e) {
            res.sendStatus(503)
            console.log(e,'catch on users login');
        }
}

exports.updateEmail = async (req,res) => {
        try {
						console.log('start updateAccount');
						const user = await lnc.userHeader(mg,req.headers.authorization)
						const data = req.body
						const rs = await users.updateEmail(user._id,data.email)
            res.send(rs)
        } catch (e) {
            res.sendStatus(503)
            console.log(e,'catch on updateEmail');

        }
}

exports.updatePassword = async (req,res) => {
        try {
						console.log('start updatePassword');
						const user = await lnc.userHeader(mg,req.headers.authorization)
						const data = req.body
						const rs = await users.updatePassword(user._id,data)
            res.send(rs)
        } catch (e) {
            res.sendStatus(503)
            console.log(e,'catch on updatePassword');

        }
}

exports.updateNewPassword = async (req,res) => {
        try {
						console.log('start updateNewPassword');
						const data = req.body
						const email = req.query.email;
						const token = req.query.token;
						const rs = await users.updateNewPassword(email,token,data)
            res.send(rs)
        } catch (e) {
            res.sendStatus(503)
            console.log(e,'catch on updateNewPassword');

        }
}


exports.forgotPassword = async (req,res) => {
        try {	
						console.log('start forgotPassword');
						const data = req.body
						const email = data.email
						const rs = await users.forgotPassword(email)
            res.send(rs)
        } catch (e) {
            res.sendStatus(503)
            console.log(e,'catch on users forgotpassword');

        }
}
