import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RandomBot from "./bots/random";
import HighCardBot from "./bots/highcard";
import { PlayingCard, PlayingCardSuite } from "courtpiece-web/common/types";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ALL_BOTS = [new RandomBot(), new HighCardBot()];

ALL_BOTS.forEach(bot => {
  app.use(
    `/bots/${bot.identifier}`,
    express.Router()
      .post('/choose_trump_suite', (req, res) => {
        res.json(bot.chooseTrumpSuite({
          your_cards: req.body.your_cards! as PlayingCard[],
        }));
      })
      .post('/play_card', (req, res) => {
        res.json(bot.playCard({
          your_cards_your_can_play: req.body.your_cards_your_can_play! as PlayingCard[],
          trump_suite: req.body.trump_suite! as PlayingCardSuite,
        }));
      })
  );
});

// start server
app.listen(process.env.PORT, function () {
  console.log(`Web server started at http://localhost:${process.env.PORT}`);
});
