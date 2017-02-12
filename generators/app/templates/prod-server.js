/* eslint-env node */
const path = require('path');
const express = require('express');

const serve = (host,port) =>{

  const app = express();

  app.use('/ui',express.static('dist')) 

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname,'dist', 'index.html'));
  });

  app.listen(port, host, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://'+host+":"+port);
  });

}

serve('localhost',3000)