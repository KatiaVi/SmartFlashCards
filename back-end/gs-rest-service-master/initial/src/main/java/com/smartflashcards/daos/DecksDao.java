package com.smartflashcards.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import com.smartflashcards.objects.Deck;
import com.smartflashcards.objects.DeckPayload;

import org.springframework.stereotype.Component;
import java.util.ArrayList;

@Component
public class DecksDao extends Dao {
    public DecksDao() {
       super();
    }

    // Retrieve all decks for a user
    public Deck[] getDecks(Integer userId) throws Exception {
        Statement statement = connect.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from smart_flash_cards.deck_info where userId=" + userId.toString());
        Deck[] decks = transformToDeckArray(resultSet);
        finishStatementExecution(statement, null, resultSet);
        return decks;
    }

    // Retrieve a deck by deck id
    public Deck getDeck(Integer userId, Integer deckId) throws Exception {
        Statement statement = connect.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from smart_flash_cards.deck_info where deckId=" + deckId.toString() + " and userId=" + userId.toString());
        Deck deck = transformToDeck(resultSet);
        finishStatementExecution(statement, null, resultSet);
        return deck;
    }

    // Create new deck for user
    public Deck createDeck(Integer userId, DeckPayload payload) throws Exception {
        PreparedStatement preparedStatement = connect.prepareStatement("insert into smart_flash_cards.deck_info (title, language, userId) values (?, ?, ?)");
        preparedStatement.setString(1, payload.getTitle());
        preparedStatement.setString(2, payload.getLanguage());
        preparedStatement.setString(3, userId.toString());
        Integer numRows = preparedStatement.executeUpdate();
        if (numRows == 1) {
            Statement statement = connect.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM deck_info WHERE deckId=(SELECT LAST_INSERT_ID())");
            Deck deck = transformToDeck(resultSet);
            finishStatementExecution(statement, preparedStatement, resultSet);
            return deck;
        } else {
            throw new Exception("Unable to create new deck.");
        }
    }

    // Update a deck
    public Deck updateDeck(Integer userId, Integer deckId, DeckPayload payload) throws Exception {
        Statement statement = connect.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from smart_flash_cards.deck_info where deckId=" + deckId.toString() + " and userId=" + userId.toString());
        Deck deck = transformToDeck(resultSet);

        PreparedStatement preparedStatement = connect.prepareStatement("update smart_flash_cards.deck_info set title=?, language=? where deckId=? and userId=?");
        preparedStatement.setString(1, payload.getTitle());
        preparedStatement.setString(2, payload.getLanguage());
        preparedStatement.setString(3, deck.getId().toString());
        preparedStatement.setString(4, deck.getUserId().toString());
        Integer numRows = preparedStatement.executeUpdate();
        if (numRows == 1) {
            statement = connect.createStatement();
            resultSet = statement.executeQuery("select * from smart_flash_cards.deck_info where deckId=" + deckId.toString() + " and userId=" + userId.toString());
            Deck updatedDeck = transformToDeck(resultSet);
            finishStatementExecution(statement, preparedStatement, resultSet);
            return updatedDeck;
        } else {
            throw new Exception("Unable to update deck.");
        }
    }

    // Delete a deck by id
    public void deleteDeck(Integer userId, Integer deckId) throws Exception {
        PreparedStatement preparedStatement = connect.prepareStatement("delete from smart_flash_cards.deck_info where deckId=? and userId=?");
        preparedStatement.setString(1, deckId.toString());
        preparedStatement.setString(2, userId.toString());
        Integer numRows = preparedStatement.executeUpdate();
        if (numRows != 1) {
            throw new Exception("Unable to delete deck.");
        }
        finishStatementExecution(null, preparedStatement, null);
    }

    private Deck[] transformToDeckArray(ResultSet resultSet) throws Exception {    
        ArrayList<Deck> decks=new ArrayList<Deck>();
        while (resultSet.next()){
            Integer deckId = resultSet.getInt("deckId");
            String title = resultSet.getString("title");
            String language = resultSet.getString("language");
            Integer userId = resultSet.getInt("userId");
            Deck deck = new Deck(deckId, title, language, userId);
            decks.add(deck);
        }
        Deck[] decksArr = new Deck[decks.size()];
        decks.toArray(decksArr);
        return decksArr;
    }

    private Deck transformToDeck(ResultSet resultSet) throws Exception {
        if (resultSet.next()){
            Integer deckId = resultSet.getInt("deckId");
            String title = resultSet.getString("title");
            String language = resultSet.getString("language");
            Integer userId = resultSet.getInt("userId");
            Deck deck = new Deck(deckId, title, language, userId);
            return deck;
         } else {
            throw new Exception("No deck with that id found.");
         }
    }
}