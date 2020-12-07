package com.smartflashcards.controllers;

import com.smartflashcards.daos.UsersDao;
import com.smartflashcards.objects.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private UsersDao usersDao;
        
	@GetMapping("/v1/Users/{id}")
	public User getUser(@PathVariable(name="id") Integer userId) {
        User user;
        try {
            user = usersDao.getUser(userId);
            return user;
        } catch (Exception e) {
            System.out.println("Couldn't retrieve user. Due to " + e);
            return null;
        }
    }
    
    @PostMapping("/v1/Users")
	public User createNewUser(@RequestParam(value="username", required=false) String username) {
        User user;
        try {
            user = usersDao.createUser(username);
            return user;
        } catch (Exception e) {
            System.out.println("Couldn't create user. Due to " + e);
            return null;
        }
	}
}