package com.smartflashcards.objects;

public class Card {
    private final Integer id;
    private final String source;
    private final String translation;
    private final String pronunciationUrl;
    private final Integer deckId;


    public Card() {
        this.id = null;
        this.source = null;
        this.translation = null;
        this.pronunciationUrl = null;
        this.deckId = null;
    }

    public Card(Integer id, String source, String translation, String pronunciationUrl, Integer deckId) {
        this.id = id;
        this.source = source;
        this.translation = translation;
        this.pronunciationUrl = pronunciationUrl;
        this.deckId = deckId;
    }

    public Integer getId() {
        return id;
    }

    public String getSource() {
        return source;
    }

    public String getTranslation() {
        return translation;
    }

    public String getPronunciationUrl() {
        return pronunciationUrl;
    }

    public Integer getDeckId() {
        return deckId;
    }
    
}