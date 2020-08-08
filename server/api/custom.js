const root       = require('path').dirname(require.main.filename);
const dotenv     = require('dotenv').config();
const mg         = require(root+'/CONFIG/mongodb');
///////////////////////////////////////////
module.exports = async (_,res) => {
 try {
					res.send('ok');
        } catch (e) {
          console.log(e,'cath on custom');
					res.sendStatus(503)
        }
}

