package com.smartflashcards.controllers;

import com.smartflashcards.daos.CardsDao;
import com.smartflashcards.objects.Card;
import com.smartflashcards.objects.CardPayload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardController {

    @Autowired
    private CardsDao cardsDao;
        
	@GetMapping("/v1/Decks/{id}/Cards")
	public Card[] getAllCards(@PathVariable(name="id") Integer deckId) {
        Card[] cards;
        try{
            cards = cardsDao.getCards(deckId);
            return cards;
        } catch (Exception e) {
            System.out.println("Couldn't retrieve cards. Due to " + e);
            cards = new Card[0];
            return cards;
        }
    }

    @GetMapping("/v1/Decks/{deckId}/Cards/{cardId}")
	public Card getCard(@PathVariable(name="deckId") Integer deckId, @PathVariable(name="cardId") Integer cardId) {
        Card card;
        try{
            card = cardsDao.getCard(deckId, cardId);
            return card;
        } catch (Exception e) {
            System.out.println("Couldn't retrieve card. Due to " + e);
            return null;
        }
    }
    
    @PostMapping("/v1/Decks/{id}/Cards")
	public Card createNewCard(@PathVariable(name="id") Integer deckId, @RequestBody CardPayload payload) {
        Card card;
        try{
            // Todo: Retrieve the pronunciation using Google APIs
            String pronunciationUrl = "fake pronunciation retrieved from Google API";
            card = cardsDao.createCard(deckId, payload, pronunciationUrl);
            return card;
        } catch (Exception e) {
            System.out.println("Couldn't create card. Due to " + e);
            return null;
        }
    }

    @PutMapping("/v1/Decks/{deckId}/Cards/{cardId}")
	public Card updateCard(@PathVariable(name="deckId") Integer deckId, @PathVariable(name="cardId") Integer cardId, @RequestBody CardPayload payload) {
        Card card;
        try{
            Card oldCard = cardsDao.getCard(deckId, cardId);
            String pronunciationUrl = oldCard.getPronunciationUrl();
            if (oldCard.getTranslation() != payload.getTranslation()){
                // Todo: Retrieve the pronunciation of new translation using Google APIs
                pronunciationUrl = "fake pronunciation retrieved from Google API";
            }
            card = cardsDao.updateCard(deckId, cardId, payload, pronunciationUrl);
            return card;
        } catch (Exception e) {
            System.out.println("Couldn't update card. Due to " + e);
            return null;
        }
    }
    
    @DeleteMapping("/v1/Decks/{deckId}/Cards/{cardId}")
	public void deleteCard(@PathVariable(name="deckId") Integer deckId, @PathVariable(name="cardId") Integer cardId) {
        try{
            cardsDao.deleteCard(deckId, cardId);
        } catch (Exception e) {
            System.out.println("Couldn't delete card. Due to " + e);
        }
    }
}