package com.smartflashcards.daos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import com.smartflashcards.objects.User;

import org.springframework.stereotype.Component;

@Component
public class UsersDao {
    private Connection connect = null;

    public UsersDao() {
        try {
            // This will load the MySQL driver, each DB has its own driver
            Class.forName("com.mysql.cj.jdbc.Driver").newInstance();

            // Setup the connection with the DB
            connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/smart_flash_cards?"
                    + "user=root&password=learnAndGrow123&serverTimezone=UTC");

        } catch (Exception e) {
            System.out.println("Issues connecting to smart_flash_cards database.");
        } 
    }

    // Retrieve user by userId
    public User getUser(Integer userId) throws Exception {
        Statement statement = connect.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from smart_flash_cards.user_info where userId=" + userId.toString());
        User user = transformToUser(resultSet);
        finishStatementExecution(statement, resultSet);
        return user;
    }

    private User transformToUser(ResultSet resultSet) throws Exception {
        if (resultSet.next()){
            User user;
            Integer userId = resultSet.getInt("userId");
            String username = resultSet.getString("username");
            if (username != null) {
                user = new User(userId, username);
            } else {
                user = new User(userId);
            }
            return user;
         } else {
            throw new Exception("No user with that id found.");
         }
    }

    // You need to close the resultSet
    private void closeConnection() {
        try {
            if (connect != null) {
                connect.close();
            }
        } catch (Exception e) {
            System.out.println("Unable to close connection.");
        }
    }

    private void finishStatementExecution(Statement statement, ResultSet resultSet) {
        try {
            if (statement != null) {
                statement.close();
            }
            if (resultSet != null) {
                resultSet.close();
            }
        } catch (Exception e) {
            System.out.println("Unable to finish statement execution.");
        }
    }
}