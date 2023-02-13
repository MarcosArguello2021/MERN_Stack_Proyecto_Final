import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import mongoose from 'mongoose';
import { User } from "../models/userModel.js";
import config from '../../config.js';

await mongoose.connect(config.mongodb.uri, config.mongodb.options);

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.signedCookies[opts.jwtCookieName];
  }
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: config.jwt.secretKey,
  jwtCookieName: 'jwt'
};

export const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  await mongoose.connect(config.mongodb.uri, config.mongodb.options);
  const user = await User.findOne(jwt_payload.username)
  if (user) return done(null, user);
  else return done(null, false)
});