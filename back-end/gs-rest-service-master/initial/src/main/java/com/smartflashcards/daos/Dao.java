package com.smartflashcards.daos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Dao {
    public Connection connect = null;

    public Dao() {
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


    // You need to close the resultSet
    public void closeConnection() {
        try {
            if (connect != null) {
                connect.close();
            }
        } catch (Exception e) {
            System.out.println("Unable to close connection.");
        }
    }

    public void finishStatementExecution(Statement statement, PreparedStatement preparedStatement, ResultSet resultSet) {
        try {
            if (statement != null) {
                statement.close();
            }
            if (preparedStatement != null) {
                preparedStatement.close();
            }
            if (resultSet != null) {
                resultSet.close();
            }
        } catch (Exception e) {
            System.out.println("Unable to finish statement execution.");
        }
    }
}