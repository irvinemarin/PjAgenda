/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pj.per.dao;

import com.pj.per.entities.Agenda;
import com.pj.per.entities.EstadoAgenda;
import com.pj.per.entities.GrupoPersonas;
import com.pj.per.entities.ParticipanteAgenda;
import com.pj.per.entities.ParticipanteAsiste;
import com.pj.per.entities.SalaAudiencia;
import com.pj.per.entities.TipoAgenda;
import com.pj.per.entities.TipoAudiencia;
import com.pj.per.util.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author irvinmarin
 */
public class AgendaDao {

    private static AgendaDao INSTANCE;
    private Connection cx;
    private PreparedStatement ps;
    private ResultSet rs;

    public static AgendaDao getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new AgendaDao();

        }
        return INSTANCE;
    }

    public List<ParticipanteAgenda> getParticipanteAgenda() {
        List<ParticipanteAgenda> list = new ArrayList<>();

        try {

            cx = Conexion.getConexion();

            ps = cx.prepareStatement("");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                ParticipanteAgenda k = new ParticipanteAgenda();

                list.add(k);

            }
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;

    }

    public List<Agenda> getAgendas(String parameter) {

        List<Agenda> list = new ArrayList<>();

        try {
            cx = Conexion.getConexion();
            ps = cx.prepareStatement("Select * from Agenda ");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                Agenda k = new Agenda();

                k.setX_titulo(rs.getString("x_titulo"));
                k.setX_descripcion(rs.getString("x_descripcion"));
                k.setF_inicio(rs.getString("f_inicio"));
                k.setF_inicio_real(rs.getString("f_inicio_real"));
                k.setF_fin(rs.getString("f_fin"));
                k.setF_fin_real(rs.getString("f_fin_real"));

                list.add(k);

            }
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;

    }

    public List<ParticipanteAsiste> getPersonasAsiste() {
        List<ParticipanteAsiste> list = new ArrayList<>();

        try {

            cx = Conexion.getConexion();
            ps = cx.prepareStatement("");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                ParticipanteAsiste k = new ParticipanteAsiste();

                list.add(k);

            }
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<EstadoAgenda> getEstadoAgenda() {
        List<EstadoAgenda> list = new ArrayList<>();

        try {

            cx = Conexion.getConexion();
            ps = cx.prepareStatement("Select * from estado_agenda where l_activo='1'");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                EstadoAgenda k = new EstadoAgenda();
                k.setN_estado_agenda(rs.getInt("n_estado_agenda"));
                k.setL_activo(rs.getString("l_activo"));

                list.add(k);

            }
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<GrupoPersonas> getGrupoPersonas() {
        List<GrupoPersonas> list = new ArrayList<>();

        try {
            list = new ArrayList<>();
            cx = Conexion.getConexion();
            ps = cx.prepareStatement("");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                GrupoPersonas k = new GrupoPersonas();

                list.add(k);

            }
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<TipoAgenda> getTipoAgenda() {
        List<TipoAgenda> list = new ArrayList<>();

        try {

            cx = Conexion.getConexion();
            ps = cx.prepareStatement("Select * from tipo_agenda where l_activo='1'");
            rs = ps.executeQuery();
            int positionrow = 0;

            while (rs.next()) {
                positionrow++;
                TipoAgenda k = new TipoAgenda();
                k.setN_tipo_agenda(rs.getInt("n_tipo_agenda"));
                k.setX_descripcion(rs.getString("x_descripcion"));

                list.add(k);

            }
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<SalaAudiencia> getSalaAudiencia() {
        List<SalaAudiencia> list = new ArrayList<>();

        try {

            cx = Conexion.getConexion();
            ps = cx.prepareStatement("Select * from sala_audiencia where l_activo='1'");
            rs = ps.executeQuery();
            int positionrow = 0;

            while (rs.next()) {
                positionrow++;
                SalaAudiencia k = new SalaAudiencia();
                k.setN_sala_audiencia(rs.getInt("n_sala_audiencia"));
                k.setX_descripcion(rs.getString("x_descripcion"));
                list.add(k);

            }
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<TipoAudiencia> getTipoAudiencia() {
        List<TipoAudiencia> list = new ArrayList<>();

        try {

            cx = Conexion.getConexion();
            ps = cx.prepareStatement("Select * from tipo_audiencia where l_activo='1'");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                TipoAudiencia k = new TipoAudiencia();
                k.setN_tipo_audiencia(rs.getInt("n_tipo_audiencia"));
                k.setX_descripcion(rs.getString("x_descripcion"));

                list.add(k);

            }
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public int addAgenda(Agenda agendaItem) {

        String sql = "INSERT INTO agenda('x_titulo','x_descripcion','f_inico','f_fin') "
                + "values ('" + agendaItem.getX_titulo() + "','" + agendaItem.getX_descripcion() + "','" + agendaItem.getF_inicio() + "','" + agendaItem.getF_fin() + "')";

        try {

            cx = Conexion.getConexion();
            ps = cx.prepareStatement(sql);
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;

            }
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return 0;
    }

}
