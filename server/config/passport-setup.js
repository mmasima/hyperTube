const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var db = require('../model/dbQuery');

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "413586251028-61h4lrk5gro06hjpjk8k0nln3os1oa6b.apps.googleusercontent.com",
    clientSecret: "ipJ1ckmw1VQ9-M_Nnhf2pd8C",
    callbackURL: "http://localhost:5000/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
      console.log('google signin');
      var check = await db.checkUserNameExists(profile.name.givenName);
      if(check.length === 0){
        console.log("registering user to db")
        db.googleRegiser(profile.name.givenName, profile.name.familyName, profile.familyName, profile.id)
        return done(null, profile);
      }
      else {
        console.log("user already registered with google")
        return done(null, profile);
      }
    }
    catch(error){
      console.log("error in google signin");
      console.log(error);
    }
    
  }
));
