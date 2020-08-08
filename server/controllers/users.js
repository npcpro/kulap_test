
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
						console.log('start register ');
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
