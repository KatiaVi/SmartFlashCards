package com.smartflashcards.controllers;

import com.smartflashcards.daos.DecksDao;
import com.smartflashcards.objects.Deck;
import com.smartflashcards.objects.DeckPayload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeckController {

    @Autowired
    private DecksDao decksDao;
        
	@GetMapping("/v1/Users/{id}/Decks")
	public Deck[] getAllDecks(@PathVariable(name="id") Integer userId) {
        Deck[] decks;
        try{
            decks = decksDao.getDecks(userId);
            return decks;
        } catch (Exception e) {
            System.out.println("Couldn't retrieve decks. Due to " + e);
            decks = new Deck[0];
            return decks;
        }
    }

    @GetMapping("/v1/Users/{userId}/Decks/{deckId}")
	public Deck getDeck(@PathVariable(name="userId") Integer userId, @PathVariable(name="deckId") Integer deckId) {
        Deck deck;
        try{
            deck = decksDao.getDeck(userId, deckId);
            return deck;
        } catch (Exception e) {
            System.out.println("Couldn't retrieve deck. Due to " + e);
            return null;
        }
    }
    
    @PostMapping("/v1/Users/{id}/Decks")
	public Deck createNewDeck(@PathVariable(name="id") Integer userId, @RequestBody DeckPayload payload) {
        Deck deck;
        try{
            deck = decksDao.createDeck(userId, payload);
            return deck;
        } catch (Exception e) {
            System.out.println("Couldn't create deck. Due to " + e);
            return null;
        }
    }

    @PutMapping("/v1/Users/{userId}/Decks/{deckId}")
	public Deck updateDeck(@PathVariable(name="userId") Integer userId, @PathVariable(name="deckId") Integer deckId, @RequestBody DeckPayload payload) {
        Deck deck;
        try{
            deck = decksDao.updateDeck(userId, deckId, payload);
            return deck;
        } catch (Exception e) {
            System.out.println("Couldn't update deck. Due to " + e);
            return null;
        }
    }
    
    @DeleteMapping("/v1/Users/{userId}/Decks/{deckId}")
	public void deleteDeck(@PathVariable(name="userId") Integer userId, @PathVariable(name="deckId") Integer deckId) {
        try{
            decksDao.deleteDeck(userId, deckId);
        } catch (Exception e) {
            System.out.println("Couldn't delete deck. Due to " + e);
        }
    }
}