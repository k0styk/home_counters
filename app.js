const path = require('path');
const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const http = require('http');
const PORT = 3001;
const HOST = 'localhost';

const server = http.createServer(app);
const io = require('socket.io')(server, {
    // transports: ['websocket']
});

// Helmet will set various HTTP headers to help protect your app
app.use(helmet());
// support parsing of application/json type post data
app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// support compress response headers
app.use(compression());
// support parse cookie
app.use(cookieParser());




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.use('/', serveStatic(path.join(__dirname, './public')));


// app.listen(PORT, function () {
//   console.log('Example app listening on port 3000!');
// });

server.listen(PORT,listenCallback);
io.on('connection', socket => {
  console.log('a user connected:',socket.id);

});

// MONGO ON WINDOWS LOAD SO BAD, we deal connection on start app
async function listenCallback() {
  try {
    console.log(`Server started at: http://${HOST}:${PORT}`);
  } catch (err) {
    console.log(err);
  }
}