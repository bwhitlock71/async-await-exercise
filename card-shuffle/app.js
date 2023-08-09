$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    async function newCard() {
      let data = await $.getJSON(`${baseURL}/new/draw/`);
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
  

    async function sameDeck() {
      let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
      let deckId = firstCardData.deck_id;
      let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
      [firstCardData, secondCardData].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
    }
 
    async function drawCard() {
      let $btn = $('button');
      let $cardArea = $('#cards');
  
      let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
      $btn.show().on('click', async function() {
        let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
        let cardSrc = cardData.cards[0].image;
        $cardArea.append(
          $('<img>', {
            src: cardSrc,
          })
        );
        if (cardData.remaining === 0) $btn.remove();
      });
    }
    drawCard();
  });