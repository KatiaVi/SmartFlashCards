package com.smartflashcards.objects;

public class Deck {
    private final Integer id;
    private final String title;
    private final String language;
    private final Integer userId;


    public Deck() {
        this.id = null;
        this.title = null;
        this.language = null;
        this.userId = null;
    }

    public Deck(Integer id, String title, String language, Integer userId) {
        this.id = id;
        this.title = title;
        this.language = language;
        this.userId = userId;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getLanguage() {
        return language;
    }

    public Integer getUserId() {
        return userId;
    }
}