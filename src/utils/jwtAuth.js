import passport from "./passport.js"

export const authJWT = passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
});