import { PlayerIndex, PlayingCard, PlayingCardSuite } from "courtpiece-web/common/types";

export type TTrumpSuitePayload = {
    your_cards: PlayingCard[], // length of exactly 5
}

export type TPlayCardPayload = {
    // index of the lead player (hakem)
    whos_lead: PlayerIndex;

    // index of the player whose requested this data
    your_index: PlayerIndex;

    // current cards in hands of the player whose requested this data
    your_cards: PlayingCard[];

    // current (playable) cards in hands of the player whose requested this data
    your_cards_your_can_play: PlayingCard[];

    // cards currently on the floor
    floor_cards: PlayingCard[];

    // floor suite (indicated by the first card played on this round — on the floor)
    floor_suite: PlayingCardSuite;

    // trump suite — as chosen by the starting player of this game
    trump_suite: PlayingCardSuite;

    // wins per team — array of length two indicating number of wins by each team
    wins: [number, number];

    // list of all tricks (previous rounds) played
    tricks: TTrick[],
}

export type TTrick = {
    cards: PlayingCard[]; // exactly 4
    starting_player: PlayerIndex,
    winner: PlayerIndex;
};

export interface TBot {
    identifier: string,
    chooseTrumpSuite(payload: TTrumpSuitePayload): PlayingCardSuite;
    playCard(payload: TPlayCardPayload): PlayingCard;
}
