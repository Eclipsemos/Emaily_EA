const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const Users = mongoose.model('users');

passport.serializeUser// In: user Out:user.id
   (
      (user, done) => {
         done(null, user.id);
      }
   );

passport.deserializeUser // In:user.id Out:user
   (
      (id, done) => {
         Users.findById(id)
            .then
            (
               user => {
                  done(null, user);
               }
            );
      }
   );

passport.use
   (
      new GoogleStrategy
         (
            {
               clientID: keys.googleClientID,
               clientSecret: keys.googleClientSecret,
               callbackURL: '/auth/google/callback',
               proxy: true
            },
            (accessToken, refreshToken, profile, done) => {
               Users.findOne({ googleId: profile.id })
                  .then
                  (
                     (existingUser) => {
                        if (existingUser) {
                           //Id has existed
                           done(null, existingUser);
                        }
                        else {
                           //New user
                           new Users({ googleId: profile.id })
                              .save()
                              .then(user => done(null, user));
                        }
                     }
                  );
            }
         )
   );