module.exports = function(app) {
    var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    FacebookStrategy = require('passport-facebook').Strategy,
    passport = require('passport');
    passport.use(new FacebookStrategy({
        clientID: '1648655142067050',
        clientSecret: '6aba9b520f779c5ccdd80796ea1d5f06',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        enableProof: false,
        "scope": ["email"]
    },
        function (accessToken, refreshToken, profile, done) {
            //console.log(profile);
            var loopback  = require('loopback');
            var User = loopback.findModel('AuctionUserSocial');
            //console.log(profile);
            var userinstance = User.findOrCreate({where : {id : profile.id}}, {id: profile.id, username: profile.displayName}, function (err, user) {
                if (err) {console.log(err); return done(err); }
                done(null, user);
            });




        }));

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ["email"]
    }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login2'
    }));
};