var express = require('express');
var Proxy = require('http-proxy-middleware');

var app = express();

app.use('/api', Proxy({target: 'http://localhost:3001/', changeOrigin: true}));
app.listen(5000);