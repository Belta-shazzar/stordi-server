// import passport from 'passport';
// import passportGoogle from 'passport-google-oauth20';
// // import { SocialAuthRequest } from '../../module/auth/validators';
// // import * as AuthService from '../../module/auth/services';
// import config from '../../config';

// const GoogleStrategy = passportGoogle.Strategy;

// passport.serializeUser((user: any, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((id: string, done) => {
//   const user = 'User';
//   done(null, user);
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: config.google.clientId,
//       clientSecret: config.google.secret,
//       callbackURL: '/v0/auth/google/redirect',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const {
//         provider, id, name, photos, emails
//       } = profile;
//       const verificationDetail: SocialAuthRequest = {
//         provider,
//         id,
//         email: emails![0].value,
//         firstName: name!.givenName,
//         lastName: name!.familyName,
//         profileImage: photos![0].value,
//       };

//       const user = await AuthService.socialAuthentication(verificationDetail);
//       // console.log(user);
//       done(null, user);
//     }
//   )
// );

// export default passport;
