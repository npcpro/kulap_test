const cors        = require('cors');
const http 				= require('http');
const path        = require('path');
const dotenv      = require('dotenv').config();
const express     = require('express');
const bodyParser  = require('body-parser');

const app = express()
			app.use(cors());
      app.use(bodyParser.json({limit: '5mb'}));
      app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
      app.get("/",require('./api/custom'))
      app.get("/custom",require('./api/custom'))
      app.use("/api/users",require('./routers/users'))
      app.use('/public',express.static('public'))
      //////////////////////  use dist //////////////////////////
      app.use(express.static(__dirname+"/../client/dist"))
			app.get('*', (_, res) => {
					res.sendFile(path.join(__dirname+"/../client/dist/index.html"))
     })
			//////////////////////////////////////////////////////////
      app.get('*',async function(_,res){
        res.sendStatus(404)
      })

		/////////// https server ////////
		const server = http.createServer(app)	
		server.listen(process.env.SERVER_PORT,async function(){
			console.log('START AT PORT 	: ',Number(process.env.SERVER_PORT));
			console.log('SET_PRODUCTION : ',(process.env.SET_PRODUCTION));	
			require('./mongoose').start();
		})
