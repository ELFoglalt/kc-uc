"use strict";

const express = require("express");

const app = express();

app.use("/assets", express.static("assets"));
app.use(express.static("public"));

app.all("*", (req, res) => {
    res.redirect("/");
});

module.exports = app;

if (require.main === module) {
    app.listen(process.env.PORT, () =>
        console.log(`Server listening on port ${process.env.PORT}!`),
    );
}
