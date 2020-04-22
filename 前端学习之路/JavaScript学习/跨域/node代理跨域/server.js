const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const { port=8000, proxy:proxyConfig={} } = require('./serverConfig');
 
const app = express();
 
app.use('/', express.static(path.join(__dirname, 'static')))
 
Object.keys(proxyConfig).map(key=>{
    app.use(key, createProxyMiddleware(proxyConfig[key]));
})
 
app.listen(5000, ()=>{
    console.log(`server is running on port ${5000}`);
})