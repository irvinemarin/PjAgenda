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

    public List<Sistema> validateUser(String usernanme, String clave, String session) {
        Usuario u = null;
        List<Sistema> lista1 = null;

        try {

            ps = Conexion.getConexion().prepareStatement("Select * from mae_persona "
                    + "                                   where     c_login='" + usernanme + "' "
                    + "                                   and       c_clave='" + clave + "' ");
            rs = ps.executeQuery();
            while (rs.next()) {
                System.out.println("n_persona : " + rs.getString("n_persona"));
                u = new Usuario();
                u.setUserId(rs.getInt("n_persona"));
                u.setUsername(usernanme);
                u.setNombre(rs.getString("x_nombre"));
                if (u != null) {
                    ps = null;
                    rs = null;
                    ps = Conexion.getConexion().prepareStatement("select si.n_idsistema, si.x_nombre, si.c_referencia, si.x_descripcion, pf.x_nombre as nombrePerfil "
                            + " from mov_sesion se left join mae_sistema si on se.n_idsistema= si.n_idsistema left join mae_perfil pf  on se.n_idperfil= pf.n_idperfil where se.n_persona=" + u.getUserId()
                    );
                    rs = ps.executeQuery();
                    lista1 = new ArrayList<>();
                    while (rs.next()) {
                        System.out.println("x_descripcion : " + rs.getString("x_descripcion"));
                        Sistema k = new Sistema();

                        k.setIdSistema(rs.getInt("n_idsistema"));
                        k.setNombre(rs.getString("x_nombre"));
                        k.setReferencia(rs.getString("c_referencia"));
                        k.setDescripcion(rs.getString("x_descripcion"));
                        k.setNombrePerfil(rs.getString("nombrePerfil"));
                        lista1.add(k);
//                    countPerson++;
                    }
                }
            }

        } catch (SQLException e) {
            // closeConexion(username, sesionId);
            System.out.println("Error: ban Colegiado " + e);
        }

        return lista1;
    }

}
