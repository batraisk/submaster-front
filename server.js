//Install express server
const express = require('express');
const path = require('path');
// var proxy = require('express-http-proxy');
const createProxyMiddleware = require('http-proxy-middleware');
const app = express();

app.use('/api', createProxyMiddleware({ target: 'https://submaster-api.herokuapp.com/', changeOrigin: true }));

// app.use('http://localhost:4200/api', proxy('https://submaster-api.herokuapp.com/'));
// Serve only the static files form the dist directory
app.use(express.static('./dist/'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/'}),
);

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
app.listen(4200);
