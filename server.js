const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

var app = express();
var PORT = 3000;

var currentTables = [];
var waitList = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", (req, res) => {
	res.json(currentTables);
})

app.get("/api/waitlist", (req, res) => {
	res.json(waitList);
})

app.post("/api", (req, res) => {
	console.log("REQUEST", req.body);
	if (currentTables.length < 5) {
		currentTables.push(req.body);
	} else {
		waitList.push(req.body);
	}
	console.log("currentTables ARRAY", currentTables);
	console.log("waitList ARRAY", waitList);
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});