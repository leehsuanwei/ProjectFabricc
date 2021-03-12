const functions = require("firebase-functions");
const express = require("express");
const app = express();

const userRouter = require("./api/routers/userRouter");
const communityRouter = require("./api/routers/communityRouter");
const postRouter = require("./api/routers/postRouter");
const commentRouter = require("./api/routers/commentRouter");

app.use(express.json());

app.get("/", (req, res, next) =>
    res.json({ message: "root" })
);

app.use("/user", userRouter);
app.use("/community", communityRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

exports.api = functions.https.onRequest(app);

// To handle "Function Timeout" exception
exports.functionsTimeOut = functions.runWith({
    timeoutSeconds: 300,
});
