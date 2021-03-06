const csurf = require('csurf');
const util = require('util');
const moment = require('moment');
const csrfProtection = new csurf({ cookie: true });
const config = require('../config');
const { authCtrl, botCtrl } = require('../controller');

const RoutesModule = (function (){
  return {
    Init: function () {
      if (app.get('env') === 'production') {
          app.use(csrfProtection);
          console.log(util.format('[Logger]::[Route]::[Setup CSRF Protection]::[Access Time %s]',
                                          moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                                  ));
      }

      app.use((req, res, next) => {
          res.header('Access-Control-Allow-Origin', config.server.accept_domain);
          res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          console.log(util.format('[Logger]::[Route]::[Access URL %s]::[Access Ip %s]::[Access Time %s]',
                                      req.originalUrl,
                                      req.ip,
                                      moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                                  ));
          next();
      });

      app.use('/auth', authCtrl);
      app.use('/bot', botCtrl);
      console.log(util.format('[Logger]::[Route]::[Service]::[%s]::[Started]',
                                moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')));
    }
  }
})();

module.exports = RoutesModule;
