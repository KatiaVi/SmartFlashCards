package com.smartflashcards.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import com.sendgrid.*;

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
        System.out.println("User: " + name);
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

    // Send email to user with unique link
    public void sendEmail(User user, String email) throws Exception {
        Email from = new Email("kvillevald@gmail.com");
        Email to = new Email(email);
        String subject = "Your Smart Flash Cards Learning Space";
        String message = "The link to your unique learning space is: " + "localhost:3000/learning-space/" + user.getId() + "\n Please don't share this unique link with anyone.\n Happy Learning! :)";
        Content content = new Content("text/plain", message);
        Mail mail = new Mail(from, subject, to, content);
        String apiKey = System.getenv("SEND_GRID_MAIL_API_KEY");

        SendGrid sg = new SendGrid(apiKey);
        Request req = new Request();
        req.setMethod(Method.POST);
        req.setEndpoint("mail/send");
        req.setBody(mail.build());
        Response rep = sg.api(req);
        System.out.println("Email response code: " + rep.getStatusCode());
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