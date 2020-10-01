const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("template", {
        locals: {
            title: "Home Page",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: "partial-login"
        }
    });
});

module.exports = router;