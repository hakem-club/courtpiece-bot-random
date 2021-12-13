import { PlayingCard, PlayingCardSuite } from "courtpiece-web/common/types";

export type TTrumpSuitePayload = {
    your_cards: PlayingCard[], // length of exactly 5
}

export type TPlayCardPayload = {
    your_cards_your_can_play: PlayingCard[],
    trump_suite: PlayingCardSuite,
}

export interface TBot {
    identifier: string,
    chooseTrumpSuite(payload: TTrumpSuitePayload): PlayingCardSuite;
    playCard(payload: TPlayCardPayload): PlayingCard;
}
