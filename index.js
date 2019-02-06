"use strict";

app = require("./app.js");

if (process.env.MODE === "development") {
    app.listen(process.env.PORT, () =>
        console.log(`Server listening on port ${process.env.PORT}!`),
    );
} else {
    function approveDomains(opts, certs, callback) {
        if (!/^(www\.)?kerekescreates\.com$\.?/.test(opts.domain)) {
            callback(new Error("No config found for '" + opts.domain + "'"));
            return;
        }

        opts.email = "contact@kerekescreates.com";
        opts.agreeTos = true;
        opts.domaions = ["kerekescreates.com", "www.kerekescreates.com"];

        callback(null, { options: opts, certs: certs });
    }

    const greenlock = require("greenlock-express").create({
        version: "draft-11",

        server:
            process.env.MODE === "production"
                ? "https://acme-v02.api.letsencrypt.org/directory"
                : "https://acme-staging-v02.api.letsencrypt.org/directory",

        approveDomains: (opts, certs, cb) => {
            approveDomains(opts, certs, cb);
        },

        configDir: "~/.config/acme",

        app: app,
    });
}
