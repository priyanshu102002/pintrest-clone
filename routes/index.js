var express = require("express");
var router = express.Router();
const passport = require("passport");

const usersModel = require("./users");
const postsModel = require("./posts");

const localStrategy = require("passport-local");
passport.use(new localStrategy(usersModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index");
});

router.get("/login", function (req, res, next) {
    res.render("login");
});

router.get("/feed",isLoggedIn , function (req, res, next) {
    res.render("feed");
});

router.get("/profile", isLoggedIn, function (req, res) {
    res.render("profile");
});

// For Registering the new user and storing it in database
router.post("/register", function (req, res, next) {
    let userData = new usersModel({
        username: req.body.username,
        email: req.body.email,
        fullname: req.body.fullname,
    });

    usersModel.register(userData, req.body.password).then(function () {
        passport.authenticate("local")(req, res, function () {
            res.redirect("/profile");
        });
    });
});

// For Login the user
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/login",
    }),
    function (req, res) {
        console.log("Login Successful");
    }
);

// for Logout the user
router.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) next(err);
        res.redirect("/");
    });
});

// for loggedIn middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
