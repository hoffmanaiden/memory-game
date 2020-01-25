import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import Card from './Card';
import Nav from './Nav';

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}


//  
//   _______  _______  __   __  _______ 
//  |       ||   _   ||  |_|  ||       |
//  |    ___||  |_|  ||       ||    ___|
//  |   | __ |       ||       ||   |___ 
//  |   ||  ||       ||       ||    ___|
//  |   |_| ||   _   || ||_|| ||   |___ 
//  |_______||__| |__||_|   |_||_______|
//  (font: Modular)

class Game extends Component {
  constructor(props) {
    super(props);

    // The cards that we will use for our state.
    let cards = [
      { id: 0, cardState: CardState.HIDING, backgroundColor: 'LightGreen' },
      { id: 1, cardState: CardState.HIDING, backgroundColor: 'LightGreen' },
      { id: 2, cardState: CardState.HIDING, backgroundColor: 'Yellow' },
      { id: 3, cardState: CardState.HIDING, backgroundColor: 'Yellow' },
      { id: 4, cardState: CardState.HIDING, backgroundColor: 'Aqua' },
      { id: 5, cardState: CardState.HIDING, backgroundColor: 'Aqua' },
      { id: 6, cardState: CardState.HIDING, backgroundColor: 'Aquamarine' },
      { id: 7, cardState: CardState.HIDING, backgroundColor: 'Aquamarine' },
      { id: 8, cardState: CardState.HIDING, backgroundColor: 'DarkSlateBlue' },
      { id: 9, cardState: CardState.HIDING, backgroundColor: 'DarkSlateBlue' },
      { id: 10, cardState: CardState.HIDING, backgroundColor: 'Beige' },
      { id: 11, cardState: CardState.HIDING, backgroundColor: 'Beige' },
      { id: 12, cardState: CardState.HIDING, backgroundColor: 'DarkGoldenRod' },
      { id: 13, cardState: CardState.HIDING, backgroundColor: 'DarkGoldenRod' },
      { id: 14, cardState: CardState.HIDING, backgroundColor: 'Olive' },
      { id: 15, cardState: CardState.HIDING, backgroundColor: 'Olive' },
      { id: 16, cardState: CardState.HIDING, backgroundColor: 'Darkorange' },
      { id: 17, cardState: CardState.HIDING, backgroundColor: 'Darkorange' },
      { id: 18, cardState: CardState.HIDING, backgroundColor: 'Blue' },
      { id: 19, cardState: CardState.HIDING, backgroundColor: 'Blue' },
      { id: 20, cardState: CardState.HIDING, backgroundColor: 'HotPink' },
      { id: 21, cardState: CardState.HIDING, backgroundColor: 'HotPink' },
      { id: 22, cardState: CardState.HIDING, backgroundColor: 'Brown' },
      { id: 23, cardState: CardState.HIDING, backgroundColor: 'Brown' },
      { id: 24, cardState: CardState.HIDING, backgroundColor: 'DarkGreen' },
      { id: 25, cardState: CardState.HIDING, backgroundColor: 'DarkGreen' },
      { id: 26, cardState: CardState.HIDING, backgroundColor: 'red' },
      { id: 27, cardState: CardState.HIDING, backgroundColor: 'red' },
      { id: 28, cardState: CardState.HIDING, backgroundColor: 'Chartreuse' },
      { id: 29, cardState: CardState.HIDING, backgroundColor: 'Chartreuse' },
      { id: 30, cardState: CardState.HIDING, backgroundColor: 'Coral' },
      { id: 31, cardState: CardState.HIDING, backgroundColor: 'Coral' },
      { id: 32, cardState: CardState.HIDING, backgroundColor: 'CornflowerBlue' },
      { id: 33, cardState: CardState.HIDING, backgroundColor: 'CornflowerBlue' },
      { id: 34, cardState: CardState.HIDING, backgroundColor: 'DarkOrchid' },
      { id: 35, cardState: CardState.HIDING, backgroundColor: 'DarkOrchid' },
    ];
    cards = shuffle(cards);
    this.state = { cards, noClick: false };

    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }



  
  handleNewGame() {
    // copy state and set all cards to HIDING
    let cards = this.state.cards.map(card => ({
      ...card, // destructure each card
      cardState: CardState.HIDING // set cardState to HIDING
    }));
    cards = shuffle(cards); // shuffle cards
    this.setState({ cards }); // set state to newly shuffled cards
  };



  handleClick(id) {
    // Map card state function
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }

    // Card that is clicked
    const foundCard = this.state.cards.find(c => c.id === id);
    // Do nothing if... card is showing, or noClick is true
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    let noClick = false;
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING);
    const ids = showingCards.map(c => c.id);

    // If, 2 cards showing and matching...
    if (showingCards.length === 2 &&
        showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      noClick = true;
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.3 seconds
          this.setState({cards: hidingCards, noClick: false});
        }, 300);
      });
      return;
    }

    this.setState({cards, noClick});
  }


  // RENDER method -------------------------------------
  render() {
    const cards = this.state.cards.map(card => (
      <Card
        key={card.id}
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)}
      />
    ));

    return (
      <div className="game">
        <Nav onNewGame={this.handleNewGame} />
        {cards}
      </div>
    );
  }
}

export default Game;




//
//             __
//        (___()'`;
//        /,    /`
//  jgs   \\"--\\