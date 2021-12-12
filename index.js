const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/hakemclub-bot/choose_trump_suite', (_req, res) => res.json(Math.floor(Math.random() * 4)));
app.post('/hakemclub-bot/play_card', (req, res) => {
  const cards = req.body.your_cards_your_can_play ?? [];
  const ix = Math.floor(Math.random() * cards.length);
  res.json(cards[ix]);
});

// start server
app.listen(process.env.PORT, function () {
  console.log(`Web server started at http://localhost:${process.env.PORT}`);
});
