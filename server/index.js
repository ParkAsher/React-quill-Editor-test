const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

/*
    model
*/
const { Postme } = require("./Model/Post");

const setUpload = require("./Util/upload");

const port = 5000;

const config = require("./Config/dev");

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})




app.listen(port, () => {

    mongoose.connect(config.mongoURI).then(() => {

        console.log(`example app listening at http://localhost:${port}`);
        console.log("Connecting MongoDB.. Success..");

    }).catch((err) => {

        console.log(`${err}`);
    });

})

app.post("/api/image", setUpload("quilltest/image"), (req, res, next) => {

    console.log(req)

    res.status(200).json({ success: true, filePath: res.req.file.location })

})

app.post("/api/post/submit", (req, res) => {
    let temp = {
        content: req.body.content,
    }

    const Postdata = new Postme(temp);

    Postdata.save().then(() => {
        res.status(200).json({ success: true })
    }).catch((err) => {
        res.status(400).json({ success: false })
    })
})