const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Auth = require("./models/auth.model");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Auth.findById(jwt_payload.sub)
                .then(auth => {
                    if (err) {
                        return done(err, false);
                    }
                    if (auth) {
                        return done(null, auth);
                    } else {
                        return done(null, false);
                    }
                })
                .catch(err => console.log(err));
        })
    );
};