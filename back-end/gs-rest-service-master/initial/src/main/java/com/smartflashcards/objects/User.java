package com.smartflashcards.objects;

public class User {
	private final Integer id;
	private final String username;

    public User() {
        this.id = null;
		this.username = null;
    }
    
    public User(Integer id, String username) {
		this.id = id;
		this.username = username;
	}

	public Integer getId() {
		return id;
	}

	public String getUsername() {
		return username;
    }
}