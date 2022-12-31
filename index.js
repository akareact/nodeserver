const path = require("path");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + "index.html");
});
app.get("/hello", (req, res) => {
  res.sendFile(__dirname + "/public/" + "hello.html");
});
app.get("/data", (req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(__dirname + "/public/" + "data.json");
});
app.post("/hello", (req, res) => {
  //console.log(req.body.Name);
  //res.send("hey" + req.body.Name);
  var userData = req.body.Name;
  fs.readFile(
    path.resolve(__dirname, "./public/hello.html"),
    "utf8",
    function (err, data) {
      if (err) throw err;
      var $ = cheerio.load(data);
      //console.log(data);
      $(".greeting").text("Hello " + userData);
      res.send($.html());
    }
  );
});
app.listen(port, "0.0.0.0", () => {
  console.log("App running on port 8080");
});
