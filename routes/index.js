var express = require("express");
var router = express.Router();
const passport = require("passport");

const usersModel = require("./users");
const postsModel = require("./posts");
const upload = require("./multer");

const localStrategy = require("passport-local");
passport.use(new localStrategy(usersModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index");
});

router.get("/login", function (req, res, next) {
    res.render("login", { error: req.flash("error") });
});

router.get("/feed", isLoggedIn, function (req, res, next) {
    res.render("feed");
});

// for file uploading
router.post("/upload", isLoggedIn , upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(404).send("No file were Uploaded");
    }
    const user = await usersModel.findOne({username: req.session.passport.user})
    const post = await postsModel.create({
        image: req.file.filename,
        imageText: req.body.filecaption,
        user: user._id
    })
    user.posts.push(post._id)
    await user.save()
    res.redirect("/profile")
});

// profile route
router.get("/profile", isLoggedIn, async function (req, res) {
    const user = await usersModel.findOne({
        username: req.session.passport.user,
    }).populate("posts")
    res.render("profile", { user });
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
        failureFlash: true,
    }),
    function (req, res) {
        console.log("Login Successful");
    }
);

// for Logout the user
router.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
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
