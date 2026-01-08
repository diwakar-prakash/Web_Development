import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from '../models/user.model.js';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refeshToken, profile, done) => {
            try {
                const email = profile.email[0].value;
                
                let user = await User.findOne({
                    $or: [{providerId : profile.id}, {email}]
                })

                if(!user) {
                    await User.create({
                        email,
                        provider: "google",
                        providerId: profile.id
                    })
                }
                else if(!user.providerId) {
                    user.provider = "google";
                    user.providerId = profile.id;
                    await user.save();
                }

                done(null, user);
            }
            catch ( err ) {
                done(err, null);
            }
        }
    )
);

export default passport;