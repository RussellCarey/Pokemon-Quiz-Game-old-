const express = require("express");
const bodyParser = require("body-parser");
let path = require("path");
const app = express();
const ScoreModel = require("./model/scoreModel");

app.use("/", express.static("public"));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/public/pokemongamev2.html"))
);

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newScores = await ScoreModel.create({
      name: req.body.name,
      score: req.body.score,
    });

    res.status(200).json({
      status: "success",
      data: {
        newScores,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error,
    });
  }
});

module.exports = app;
