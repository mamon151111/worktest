module.exports = function(app) {
    var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    FacebookStrategy = require('passport-facebook').Strategy,
    passport = require('passport');
    passport.use(new FacebookStrategy({
        clientID: '1648655142067050',
        clientSecret: '6aba9b520f779c5ccdd80796ea1d5f06',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        enableProof: false,
        "scope": ["email", "public_profile", "user_friends"],
        "ProfileFields": ["id", "displayName", "email"]
    },
        function (accessToken, refreshToken, profile, done) {
          //console.log(profile);
          //  var loopback  = require('loopback');
          //  var User = loopback.findModel('AuctionUserSocial');
            //console.log(profile);
          //  var userinstance = User.findOrCreate({where : {id : profile.id}}, {id: profile.id, username: profile.displayName}, function (err, user) {
          //      if (err) {console.log(err); return done(err); }
          //      done(null, user);
          //  });
            profile.token = accessToken;
            done(null, profile);
        }));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            var user = req.user;
            // https://graph.facebook.com/USER_NAME_OR_ID?access_token=ACCESS_TOKEN
            var https = require('https');
            var options = {
                host: 'graph.facebook.com',
                path: '/me?access_token=' + user.token + 'grant_type=client_credentials&fields=id,name,email'
            };
            https.get(options, function (res) {
                var data = '';

                res.on('data', function (chunk) {
                    data += chunk;
                });

                res.on('end', function() {
                    console.log(data);
                });
            });
            //res.redirect('/#/register');
       /*     loopback  = require('loopback'),
            User = loopback.findModel('AuctionUserSocial');
            User.find({where : {id : req.user.id}}, function (err, returned) {
                //console.log(returned);
                if (!returned[0]) {
                    var loopback  = require('loopback');
                      var User = loopback.findModel('AuctionUserSocial');
                      var userinstance = User.findOrCreate({where : {id : user.id}},
                            {
                                id: user.id,
                                name: user.name.givenName,
                                familyName: user.name.familyName
                            },
                          function (err, user) {

                          });
                    res.redirect('/#/register');
                } else {
                    res.redirect('/#/login2');
                }
            });*/
        });
    /*  app.get('/auth/facebook/callback', function (req, res, next) {

          passport.authenticate('facebook', function (err, user, info) {
              if (err) { return next(err); }
              if (!user) { return res.redirect('/login2'); }
              /*var loopback  = require('loopback');
              var User = loopback.findModel('AuctionUserSocial');
              User.find({where : {id : user.id}}, function (err, returned) {
               if (!returned[0]) {
                  res.body.user = user;
                  res.json({user : user});
                  return res.redirect('/#/register');
               } else {
                  req.logIn(user, function(err) {
                  if (err) { return next(err); }
                      return res.redirect('#/login2');
                  });
                  }
              });*/
    /*        return res.redirect('/');
        })(res, req, next);
    });*/







    app.get ('/signup', function (req, res, next) {
    /*    var User = app.models.user;

        var newUser = {};
        newUser.email = req.body.email.toLowerCase();
        newUser.username = req.body.username.trim();
        newUser.password = req.body.password;

        User.create(newUser, function (err, user) {
            console.log(user);
            if (err) {
                req.flash('error', err.message);
                return res.redirect('back');
            } else {
                // Passport exposes a login() function on req (also aliased as logIn())
                // that can be used to establish a login session. This function is
                // primarily used when users sign up, during which req.login() can
                // be invoked to log in the newly registered user.
                req.login(user, function (err) {
                    if (err) {
                        req.flash('error', err.message);
                        return res.redirect('back');
                    }

                    console.log(user);
                    return res.redirect('/auth/account');
                });
            }
        });*/
        return res.redirect('/');
    });
};