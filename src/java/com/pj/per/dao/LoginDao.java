/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pj.per.dao;

import com.pj.per.entities.Sistema;
import com.pj.per.entities.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import com.pj.per.util.Conexion;

/**
 *
 * @author irvinmarin
 */
public class LoginDao {

    static LoginDao INSTANCE;

    public static LoginDao getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new LoginDao();
        }
        return INSTANCE;
    }

    private PreparedStatement ps;
    private ResultSet rs;

    public int validateUser(String usernanme, String clave, String session) {
        Usuario u = null;
        int userId = 0;

        try {

            ps = Conexion.getInstanceConexion().prepareStatement("Select * from mae_persona "
                    + "                                   where     c_login='" + usernanme + "' "
                    + "                                   and       c_clave='" + clave + "' ");
            rs = ps.executeQuery();
            while (rs.next()) {
                u = new Usuario();
                u.setUserId(rs.getInt("n_persona"));
                u.setUsername(usernanme);
                u.setNombre(rs.getString("x_nombre"));

                userId = rs.getInt("n_persona");
            }

        } catch (SQLException e) {
            // closeConexion(username, sesionId);
            System.out.println("Error: validateUser " + e);
        }

        return userId;
    }

}
