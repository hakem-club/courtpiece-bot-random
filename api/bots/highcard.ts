import { PlayingCardSuite, PlayingCard } from "courtpiece-web/common/types";
import { getSuiteOfCard, getRankOfCard } from "courtpiece-web/common/utils";
import { TBot, TPlayCardPayload, TTrumpSuitePayload } from "../types";

export default class HighCardBot implements TBot {
    identifier = 'highcard-bot'

    chooseTrumpSuite(payload: TTrumpSuitePayload): PlayingCardSuite {
        const your_cards = payload.your_cards;
        const suite_collective_ranks = [0, 0, 0, 0];
        your_cards.forEach(card => {
            const suite = getSuiteOfCard(card);
            suite_collective_ranks[suite] = suite_collective_ranks[suite] + getRankOfCard(card);
        });

        // return index of the highest value
        return suite_collective_ranks
            .map((value, index) => ({ index, value }))
            .sort((a, b) => b.value - a.value)
        [0].index as PlayingCardSuite;
    }

    playCard(payload: TPlayCardPayload): PlayingCard {
        let [highestRank, high_card] = [-1, -1];
        payload.your_cards_your_can_play.forEach(card => {
          const suite = getSuiteOfCard(card);
          const rank = getRankOfCard(card);
          const effective_rank = suite === payload.trump_suite ? rank * 100 : rank;

          if (effective_rank > highestRank) {
            [highestRank, high_card] = [effective_rank, card];
          }
        });

        return high_card as PlayingCard;
    }
}
