/* """
Design a deck of cards
Design the data structures for a generic deck of cards. Explain how you would subclass the data
structures to implement blackjack

Constraints and assumptions
1. Is this a generic deck of cards for games like poker and black jack?
-> Yes, design a generic deck then extend it to black jack

2. Can we assume the deck has 52 cards (2-10, Jack, Queen, King, Ace) and 4 suits?
-> Yes

3. Can we assume inputs are valid or do we have to validate them?
-> Assume they're valid

Solution:
First, we need to recognize that a "generic" deck of cards can mean many things. Generic could
mean a standard deck of cards that can play a poker-like game, or it could even stretch to Uno or
Baseball cards. It is important to ask your interviewer what she means by generic.

"""
 */

enum Suit {
    HEART = 0,
    DIAMOND = 1,
    CLUBS = 2,
    SPADE = 3
}

abstract class Card {
    suit: Suit;
    isAvailable: boolean = true;

    constructor(public value: number, suit: Suit) {
        this.suit = suit;
    }

    abstract isAce(): boolean;

    abstract isFaceCard(): boolean;
}

class BlackJackCard extends Card {
    isAce(): boolean {
        return this.value === 1;
    }

    isFaceCard(): boolean {
        return this.value > 10 && this.value <= 13;
    }

    getValue(): number {
        if (this.isAce()) {
            return 11;
        } else if (this.isFaceCard()) {
            return 10;
        } else {
            return this.value;
        }
    }
}

class Hand {
    cards: Card[] = [];

    addCard(card: Card): void {
        this.cards.push(card);
    }

    score(): number {
        return this.cards.reduce((total, card) => total + card.value, 0);
    }
}

class BlackJackHand extends Hand {
    constructor(cards: BlackJackCard[]) {
        super();
        for (const card of cards) {
            this.addCard(card);
        }
    }
    static BLACKJACK: number = 21;

    score(): number {
        const possibleScores: number[] = this.possibleScores();
        let minOver: number = Number.MAX_SAFE_INTEGER;
        let maxUnder: number = Number.MIN_SAFE_INTEGER;

        for (const score of possibleScores) {
            if (score > BlackJackHand.BLACKJACK && score < minOver) {
                minOver = score;
            } else if (score <= BlackJackHand.BLACKJACK && score > maxUnder) {
                maxUnder = score;
            }
        }

        return maxUnder !== Number.MIN_SAFE_INTEGER ? maxUnder : minOver;
    }

    possibleScores(): number[] {
        const numAces: number = this.cards.filter(card => (card as BlackJackCard).isAce()).length;
        let totalValue: number = this.score();
        const possibleScores: number[] = [totalValue];

        for (let i = 0; i < numAces; i++) {
            totalValue -= 10; // Convert an ace from 11 to 1
            possibleScores.push(totalValue);
        }

        return possibleScores;
    }
}

class Deck {
    cards: BlackJackCard[] = [];
    dealIndex: number = 0;

    constructor() {
        for (let value = 1; value <= 13; value++) {
            for (const suit in Suit) {
                if (isNaN(Number(suit))) {
                    this.cards.push(new BlackJackCard(value, Suit[suit] as Suit));
                }
            }
        }
    }

    remainingCards(): number {
        return this.cards.length - this.dealIndex;
    }

    dealCard(): BlackJackCard | null {
        try {
            const card = this.cards[this.dealIndex];
            card.isAvailable = false;
            this.dealIndex++;
            return card;
        } catch (error) {
            return null;
        }
    }

    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}

// Example usage:

// Create a deck and shuffle it
const deck = new Deck();
deck.shuffle();

// Deal cards to players
const playerHand = new BlackJackHand([deck.dealCard()!, deck.dealCard()!]);
const dealerHand = new BlackJackHand([deck.dealCard()!, deck.dealCard()!]);

// Display hands
console.log("Player's hand:", playerHand.cards.map(card => card.value));
console.log("Dealer's hand:", dealerHand.cards.map(card => card.value));
console.log("Remaining cards in the deck:", deck.remainingCards());
