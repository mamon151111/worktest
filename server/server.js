var loopback = require('loopback');
var path = require('path');
var boot = require('loopback-boot');

var app = module.exports = loopback();
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);
//var bodyParser = require('body-parser');
var passportConfigurator = new PassportConfigurator(app);

app.use(loopback.static(path.resolve(__dirname, '../client')));

app.start = function () {
    // start the web server
    return app.listen(function() {
        app.emit('started');
        var baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
});


app.use(loopback.session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Load the provider configurations
var config = {};
try {
    config = require('../providers.json');
} catch (err) {
    console.trace(err);
    process.exit(1); // fatal
}
// Initialize passport
var passport = passportConfigurator.init();
// Set up related models
passportConfigurator.setupModels({
    userModel: app.models.AuctionUser,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
});
// Configure passport strategies for third party auth providers
for(var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
}