const mg         = require('../CONFIG/mongodb');
const moment     = require('moment')
const jwt 			 = require('jsonwebtoken');
module.exports = async (req,res,next) => {
      try {
						const token = JSON.parse(req.headers.authorization).token
						jwt.verify(token,process.env.JWT_SECRET,(err, decoded)=>{
							if(err)return false
							else{
										const user = decoded
										const loginAt  = moment(new Date()).format()
										const expAt    = moment(new Date(user.exp*1000)).format()
										const datediff = moment(loginAt).diff(moment(expAt),'seconds');
										if(datediff < 0){
											next()
										}else{
											res.sendStatus(401)
										}
									}
						})
          } catch (e) {
							console.log(e,'catch on check login');
              res.sendStatus(503)
          }
}
