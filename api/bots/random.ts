import { PlayingCardSuite, PlayingCard } from "courtpiece-web/common/types";
import { TBot, TPlayCardPayload, TTrumpSuitePayload } from "../types";

export default class RandomBot implements TBot {
    identifier = 'random-bot'

    chooseTrumpSuite(_payload: TTrumpSuitePayload): PlayingCardSuite {
        return Math.floor(Math.random() * 4) as PlayingCardSuite;
    }

    playCard(payload: TPlayCardPayload): PlayingCard {
        const cards = payload.your_cards_your_can_play;
        const ix = Math.floor(Math.random() * cards.length);
        return cards[ix];
    }
}
