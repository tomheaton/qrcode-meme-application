const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");
const lodash = require("lodash");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const restoreDefaults = async () => {
  fs.readFile("../defaults.json", 'utf8', (err, data) => {
    fs.writeFile('../data.json', data, (err) => {
      let timestamp = new Date();
      if (err) return console.error(err);
      console.log(`--> Meme database successfully restored to defaults. - ${timestamp.toLocaleTimeString()}`);
    })
  })
};

const removeEntry = async (name, index) => {
  fs.readFile("../data.json", 'utf8', (err, data) => {

    let memeData = JSON.parse(data);
    if (index > -1) {
      memeData["Memes"]["Videos"].splice(index, 1);
    }
    let string = JSON.stringify(memeData, null, '\t');

    fs.writeFile('./data.json', string, (err) => {
      let timestamp = new Date();
      if (err) return console.error(err);
      console.log(`--> Meme successfully removed from JSON File. - ${timestamp.toLocaleTimeString()}`);
    })
  })
};

const saveMemeToJSON = async (meme) => {
  fs.readFile("../data.json", 'utf8', (err, data) => {

    let memeData = JSON.parse(data);
    memeData["Memes"]["Videos"].push(meme);
    let string = JSON.stringify(memeData, null, '\t');

    fs.writeFile('../data.json', string, (err) => {
      let timestamp = new Date();
      if (err) return console.error(err);
      console.log(`--> Meme successfully added to JSON file. - ${timestamp.toLocaleTimeString()}`);
    })
  })
};

const saveSettingsToJSON = async (name, method) => {
  fs.readFile("./data.json", 'utf8', (err, data) => {

    let memeData = JSON.parse(data);
    let chosenMeme = lodash.filter(memeData["Memes"]["Videos"], x => x.name === name);

    memeData["Memes"]["ChosenMeme"] = chosenMeme;
    memeData["Memes"]["Method"] = method;

    let string = JSON.stringify(memeData, null, '\t');

    fs.writeFile('./data.json', string, (err) => {
      let timestamp = new Date();
      if (err) return console.error(err);
      console.log(`--> Settings successfully updated and added to JSON file. - ${timestamp.toLocaleTimeString()}`);
    })
  })
};

app.post('/api/memes', async (req, res) => {
  let response = await saveMemeToJSON(req.body);
  res.send("Your meme has been added.");
});

app.post('/api/memes/restore', async (req, res) => {
  let response = await restoreDefaults();
  res.send("Meme database has been Restored To Defaults.");
});

app.post('/api/memes/remove', async (req, res) => {
  let response = await removeEntry(req.body.name, req.body.index);
  res.send("Meme removed from Database.");
});

app.post('/api/memes/settings', async (req, res) => {
  let response = await saveSettingsToJSON(req.body.name, req.body.method);
  res.send("Settings Updated.");
});

app.get('/api/memes', async (req, res) => {
  fs.readFile("./data.json", 'utf8', (err, data) => {
    if (err) return console.error(err);
    res.send(JSON.parse(data));
  });
});

app.get('/api/meme', async (req, res) => {
  fs.readFile("./data.json", 'utf8', (err, data) => {
    if (err) return console.error(err);
    let meme = {};
    let memeData = JSON.parse(data);
    let memeList = memeData["Memes"]["Videos"];
    if (memeData["Memes"]["Method"] === "random") {
      meme = memeList[Math.floor(Math.random() * memeList.length)];
    } else {
      meme = memeData["Memes"]["ChosenMeme"][0];
    }

    //res.send(meme);
    res.statusCode = 302; // 301 = permanent redirect, 302 = temporary redirect.
    res.setHeader("Location", meme.url);
    res.end();
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));