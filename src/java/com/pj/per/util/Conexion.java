/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pj.per.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author PJUDICIAL
 */
public class Conexion {

    private static final String URL = "jdbc:postgresql://localhost:5432/segurity2";
    private static final String DRIVER = "org.postgresql.Driver";
    private static final String USER = "postgres";
    private static final String PASS = "11111";
    private static Connection instance = null;

    public static Connection getConexion() {
        try {
            Class.forName(DRIVER);
            if (instance == null) {
                instance = DriverManager.getConnection(URL, USER, PASS);
                System.out.println("Connection");

            }
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("Error: conections  " + e.getMessage());
        }
        return instance;
    }

    public void cerrarConexion() {
        try {
            instance.close();
        } catch (SQLException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
