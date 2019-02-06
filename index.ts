import * as express from "express";

const server = express();

server.use("/assets", express.static("assets"));
server.use(express.static("public"));

server.listen(process.env.PORT, () =>
    console.log(
        `Under construction site listening on port ${process.env.PORT}!`,
    ),
);
