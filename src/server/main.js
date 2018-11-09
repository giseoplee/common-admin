"use strict"

require('./utils/functional');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const util = require('util');
const methodOverride = require('method-override');
const http = require('http');
const fileUpload = require('express-fileupload');
const moment = require('moment');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const WebpackDevServer = require('webpack-dev-server');
const webpack =  require('webpack');

const config = require('./config');
const routes = require('./modules/routeModule');
const entity = require('./modules/entityModule');
const { run } = require('./modules/clusterModule');

const forkCount = parseInt(process.env.FORK_CNT) || undefined;
const clusterOn = process.env.CLUSTER_ON || false;

const devPort = 3000;

global.app = new express();
global.baseUrl = process.env.NODE_ENV === 'ec2' ? `http://ec2-18-225-32-252.us-east-2.compute.amazonaws.com:${config.server.port}`
: `http://localhost:${config.server.port}`;


app.use(cookieParser());

app.use(
  expressSession({
    key: "bot_builder_user",
    secret: config.server.auth_key,
    resave: false,
    saveUninitialized: false
  })
);

app.use(async(req, res, next) => {
  if(req.cookies.key && !req.session.auth){
    await res.clearCookie('key');
  }
  next();
});

const sessionCheck = (req, res, next) => {
  if(req.session.auth && req.cookies.key){
    res.redirect('/home');
  }
  else{
    next();
  }
};

function processRun() {
  (async () => {
    app.set('port', process.env.PORT || config.server.port);
    app.use(fileUpload({
      limits: { fileSize: 15 * 1024 * 1024 },
    }));
    app.use(compression());
    app.use(methodOverride());
    app.use(bodyParser.json({limit: '15mb'}));
    app.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));
    app.set('trust proxy', config.server.trust_proxy_host);
    app.use(express.static('dist'));

    entity.Init();
    routes.Init();
  })().then(_ => {
    http.createServer(app).listen(app.get('port'), () => {
      console.log(util.format('[Logger]::[Process On]::[Pid:%d]::[Server Running At %d]::[%s]::[Started]',
                                process.pid,
                                config.server.port,
                                moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')));
    });
  });
};

console.log('Server is running on development mode');
const configDev = require('../../build/webpack.config');
const compiler = webpack(configDev);
const devServer = new WebpackDevServer(compiler, configDev.devServer);
devServer.listen(
    devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    }
);

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

!!clusterOn ? run(processRun, forkCount) : processRun();

