package com.smartflashcards.controllers;

import com.smartflashcards.daos.UsersDao;
import com.smartflashcards.objects.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UsersDao usersDao;
        
	@GetMapping("/v1/Users/{id}")
	public User greeting(@PathVariable(name="id") Integer userId) {
        User user;
        try{
            user = usersDao.getUser(userId);
            return user;
        } catch (Exception e) {
            System.out.println("Couldn't retrieve user. Due to " + e);
            user = new User();
            return user;
        }
	}
}