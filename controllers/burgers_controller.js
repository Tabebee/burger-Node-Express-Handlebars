var express = require("express");
var router = express.Router();
var burger = require("../models/burger,js");

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var jsonObject = { burger: data };
        console.log(jsonObject);
        res.render("index", jsonObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create(
        [
        "burger_name"
        ],
        [
            req.body.burger_name
        ],
        function (dat) {
            res.
        })
});





