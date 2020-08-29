package com.smartflashcards.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import com.smartflashcards.objects.Card;
import com.smartflashcards.objects.CardPayload;

import org.springframework.stereotype.Component;
import java.util.ArrayList;

@Component
public class CardsDao extends Dao {
    public CardsDao() {
       super();
    }

    // Retrieve all cards in a deck
    public Card[] getCards(Integer deckId) throws Exception {
        Statement statement = connect.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from smart_flash_cards.card_info where deckId=" + deckId.toString());
        Card[] cards = transformToCardArray(resultSet);
        finishStatementExecution(statement, null, resultSet);
        return cards;
    }

    // Retrieve a card by card id
    public Card getCard(Integer deckId, Integer cardId) throws Exception {
        Statement statement = connect.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from smart_flash_cards.card_info where cardId=" + cardId.toString() + " and deckId=" + deckId.toString());
        Card card = transformToCard(resultSet);
        finishStatementExecution(statement, null, resultSet);
        return card;
    }

    // Create new card in a deck
    public Card createCard(Integer deckId, CardPayload payload, String pronunciationUrl) throws Exception {
        PreparedStatement preparedStatement = connect.prepareStatement("insert into smart_flash_cards.card_info (source, translation, pronunciationUrl, deckId) values (?, ?, ?, ?)");
        preparedStatement.setString(1, payload.getSource());
        preparedStatement.setString(2, payload.getTranslation());
        preparedStatement.setString(3, pronunciationUrl);
        preparedStatement.setString(4, deckId.toString());
        Integer numRows = preparedStatement.executeUpdate();
        if (numRows == 1) {
            Statement statement = connect.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM card_info WHERE cardId=(SELECT LAST_INSERT_ID())");
            Card card = transformToCard(resultSet);
            finishStatementExecution(statement, preparedStatement, resultSet);
            return card;
        } else {
            throw new Exception("Unable to create new card.");
        }
    }

    // Update a card
    public Card updateCard(Integer deckId, Integer cardId, CardPayload payload, String pronunciationUrl) throws Exception {
        Statement statement = connect.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from smart_flash_cards.card_info where cardId=" + cardId.toString() + " and deckId=" + deckId.toString());
        Card card = transformToCard(resultSet);

        PreparedStatement preparedStatement = connect.prepareStatement("update smart_flash_cards.card_info set source=?, translation=?, pronunciationUrl=? where cardId=? and deckId=?");
        preparedStatement.setString(1, payload.getSource());
        preparedStatement.setString(2, payload.getTranslation());
        preparedStatement.setString(3, pronunciationUrl);
        preparedStatement.setString(4, card.getId().toString());
        preparedStatement.setString(5, card.getDeckId().toString());
        Integer numRows = preparedStatement.executeUpdate();
        if (numRows == 1) {
            statement = connect.createStatement();
            resultSet = statement.executeQuery("select * from smart_flash_cards.card_info where cardId=" + cardId.toString() + " and deckId=" + deckId.toString());
            Card updatedCard= transformToCard(resultSet);
            finishStatementExecution(statement, preparedStatement, resultSet);
            return updatedCard;
        } else {
            throw new Exception("Unable to update card.");
        }
    }

    // Delete a card by id
    public void deleteCard(Integer deckId, Integer cardId) throws Exception {
        PreparedStatement preparedStatement = connect.prepareStatement("delete from smart_flash_cards.card_info where cardId=? and deckId=?");
        preparedStatement.setString(1, cardId.toString());
        preparedStatement.setString(2, deckId.toString());
        Integer numRows = preparedStatement.executeUpdate();
        if (numRows != 1) {
            throw new Exception("Unable to delete card.");
        }
        finishStatementExecution(null, preparedStatement, null);
    }

    private Card[] transformToCardArray(ResultSet resultSet) throws Exception {    
        ArrayList<Card> cards = new ArrayList<Card>();
        while (resultSet.next()){
            Integer cardId = resultSet.getInt("cardId");
            String source = resultSet.getString("source");
            String translation = resultSet.getString("translation");
            String pronunciationUrl = resultSet.getString("pronunciationUrl");
            Integer deckId = resultSet.getInt("deckId");
            Card card = new Card(cardId, source, translation, pronunciationUrl, deckId);
            cards.add(card);
        }
        Card[] cardsArr = new Card[cards.size()];
        cards.toArray(cardsArr);
        return cardsArr;
    }

    private Card transformToCard(ResultSet resultSet) throws Exception {
        if (resultSet.next()){
            Integer cardId = resultSet.getInt("cardId");
            String source = resultSet.getString("source");
            String translation = resultSet.getString("translation");
            String pronunciationUrl = resultSet.getString("pronunciationUrl");
            Integer deckId = resultSet.getInt("deckId");
            Card card = new Card(cardId, source, translation, pronunciationUrl, deckId);
            return card;
         } else {
            throw new Exception("No card with that id found.");
         }
    }
}