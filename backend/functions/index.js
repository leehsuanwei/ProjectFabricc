const functions = require("firebase-functions");
const express = require("express");
const app = express();

const userRouter = require("./api/routers/userRouter");
const agentRouter = require("./api/routers/agentRouter");
const clothRouter = require("./api/routers/clothRouter");

app.use(express.json());

app.get("/", (req, res, next) =>
    res.json({ message: "root" })
);

app.use("/user", userRouter);
app.use("/agent", agentRouter);
app.use("/cloth", clothRouter);

exports.api = functions.https.onRequest(app);

// To handle "Function Timeout" exception
exports.functionsTimeOut = functions.runWith({
    timeoutSeconds: 300,
});
