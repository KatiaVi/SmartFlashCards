package com.smartflashcards.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import com.smartflashcards.objects.User;

import org.springframework.stereotype.Component;

@Component
public class UsersDao extends Dao {
    public UsersDao() {
        super();
    }

    // Retrieve user by userId
    public User getUser(Integer userId) throws Exception {
        Statement statement = connect.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from smart_flash_cards.user_info where userId=" + userId.toString());
        User user = transformToUser(resultSet);
        finishStatementExecution(statement, null, resultSet);
        return user;
    }

    // Create new user
    public User createUser(String name) throws Exception {
        PreparedStatement preparedStatement = connect.prepareStatement("insert into smart_flash_cards.user_info (username) values (?)");
        preparedStatement.setString(1, name);
        Integer numRows = preparedStatement.executeUpdate();
        if (numRows == 1) {
            Statement statement = connect.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM user_info WHERE userId=(SELECT LAST_INSERT_ID())");
            User user = transformToUser(resultSet);
            finishStatementExecution(statement, preparedStatement, resultSet);
            return user;
        } else {
            throw new Exception("Unable to create new user.");
        }
    }

    private User transformToUser(ResultSet resultSet) throws Exception {
        if (resultSet.next()){
            Integer userId = resultSet.getInt("userId");
            String username = resultSet.getString("username");
            username = username == null ? "Learner " + userId.toString(): username;
            User user = new User(userId, username);
            return user;
         } else {
            throw new Exception("No user with that id found.");
         }
    }
}