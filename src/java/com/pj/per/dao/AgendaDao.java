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
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

            cx = Conexion.getInstanceConexion();

            ps = cx.prepareStatement("select gpe.x_descripcion,"
                    + "                     pag.n_persona,"
                    + "                     pag.x_nombre,"
                    + "                     pag.x_apellido_paterno,"
                    + "                     pag.x_apellido_materno,"
                    + "                     pag.x_correo"
                    + "               from  participante_agenda pag "
                    + "                     inner join rol_persona rop on pag.n_persona=rop.n_persona "
                    + "                     left join grupo_personas gpe on gpe.n_grupo_per=rop.n_grupo_per "
                    + "                     where pag.l_activo='1' "
                    //+ "where rop.n_grupo_per=1"                    
                    + "");
            rs = ps.executeQuery();

            while (rs.next()) {

                ParticipanteAgenda k = new ParticipanteAgenda();
                k.setN_persona(rs.getInt("n_persona"));
                k.setX_nombre(rs.getString("x_nombre"));
                k.setX_apellido_paterno(rs.getString("x_apellido_paterno"));
                k.setX_apellido_materno(rs.getString("x_apellido_materno"));
                k.setX_correo(rs.getString("x_correo"));
                k.setFullName(rs.getString("x_apellido_paterno") + " " + rs.getString("x_apellido_materno") + ", " + rs.getString("x_nombre"));

                list.add(k);

            }
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;

    }

    public List<Agenda> getAgendas(String userData) {

        List<Agenda> list = new ArrayList<>();

        try {
            cx = Conexion.getInstanceConexion();
            ps = cx.prepareStatement("Select * from Agenda "
                    + " where TO_DATE(to_char(f_inicio,'YYYY-MM-DD'),'YYYY-MM-DD') = to_timestamp('" + getDateToday() + "', 'YYYY-MM-DD') ");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                Agenda k = new Agenda();

                k.setN_ano(rs.getInt("n_ano"));
                k.setN_agenda(rs.getInt("n_agenda"));
                k.setX_titulo(rs.getString("x_titulo"));
                k.setX_descripcion(rs.getString("x_descripcion"));
                k.setF_inicio(rs.getString("f_inicio"));
                k.setF_inicio_real(rs.getString("f_inicio_real"));
                k.setF_fin(rs.getString("f_fin"));
                k.setF_fin_real(rs.getString("f_fin_real"));
//                k.setN_agenda_pad(rs.getInt("x_agenda_pad"));
//                k.setX_agenda_pad(rs.getString("x_agenda_pad"));

                list.add(k);

            }
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;

    }

    public List<ParticipanteAsiste> getPersonasAsiste() {
        List<ParticipanteAsiste> list = new ArrayList<>();

        try {

            cx = Conexion.getInstanceConexion();
            ps = cx.prepareStatement("");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                ParticipanteAsiste k = new ParticipanteAsiste();

                list.add(k);

            }
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<EstadoAgenda> getEstadoAgenda() {
        List<EstadoAgenda> list = new ArrayList<>();

        try {

            cx = Conexion.getInstanceConexion();
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
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<GrupoPersonas> getGrupoPersonas() {
        List<GrupoPersonas> list = new ArrayList<>();

        try {
            list = new ArrayList<>();
            cx = Conexion.getInstanceConexion();
            ps = cx.prepareStatement("");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                GrupoPersonas k = new GrupoPersonas();

                list.add(k);

            }
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<TipoAgenda> getTipoAgenda() {
        List<TipoAgenda> list = new ArrayList<>();

        try {

            cx = Conexion.getInstanceConexion();
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
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<SalaAudiencia> getSalaAudiencia() {
        List<SalaAudiencia> list = new ArrayList<>();

        try {

            cx = Conexion.getInstanceConexion();
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
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public List<TipoAudiencia> getTipoAudiencia() {
        List<TipoAudiencia> list = new ArrayList<>();

        try {

            cx = Conexion.getInstanceConexion();
            ps = cx.prepareStatement("Select * from tipo_audiencia ");
            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                TipoAudiencia k = new TipoAudiencia();
                k.setN_tipo_audiencia(rs.getInt("n_tipo_audiencia"));
                k.setX_descripcion(rs.getString("x_descripcion"));

                list.add(k);

            }
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;
    }

    public int addAgenda(Agenda agendaItem) {

        int insert = 0;
        String sql = "INSERT INTO agenda(n_ano,n_agenda,"
                + "f_registro, n_tipo_agenda,"
                + "x_titulo, x_descripcion, "
                + "f_inicio, f_fin,"
                + "n_estado_agenda, "
                + "n_tododia,"
                + "f_aud,  c_aud_uid, c_aud_uidred,"
                + "n_sala_audiencia, n_tipo_audiencia)"
                + "values ((select coalesce(MAX(n_agenda),0) from agenda)+1,(select coalesce(MAX(n_ano),0) from agenda)+1,"
                //                + "values (2,2,"
                + "'" + getDateToday() + "'," + "'" + agendaItem.getN_tipo_agenda() + "',"
                + "'" + agendaItem.getX_titulo() + "','" + agendaItem.getX_descripcion() + "',"
                + "'" + agendaItem.getF_inicio() + " " + agendaItem.getH_in() + "',"
                + "'" + agendaItem.getF_inicio() + " " + agendaItem.getH_fin() + "',"
                + "1,"
                + "'" + agendaItem.getN_tododia() + "',"
                + "'" + getDateToday() + "','1111','21312',"
                + "'" + agendaItem.getN_sala_audiencia() + "','" + agendaItem.getN_tipo_audiencia() + "'"
                + ")RETURNING n_agenda , n_ano";

        try {
            Statement st1;
            cx = Conexion.getInstanceConexion();
            cx.setAutoCommit(false);
            st1 = cx.createStatement();
            ResultSet rst1 = st1.executeQuery(sql);
            rst1.next();

            insert = insertarDetalle(agendaItem, rst1);
            if (insert == 0) {
                cx.rollback();
            } else {
                cx.commit();
            }

            //cx.close();
        } catch (SQLException e) {
            System.out.println("Error: " + e.getLocalizedMessage());
            System.out.println("Error: " + e.toString());
        }

        return insert;
    }

    private int insertarDetalle(Agenda agendaItem, ResultSet rst1) {
        int insert = 0;
        try {
            String sql2 = "INSERT INTO participante_asiste(n_ano,n_agenda,n_persona,"
                    + "f_registro,n_rechazo,"
                    + "f_aud,  c_aud_uid, c_aud_uidred)"
                    + "values (" + rst1.getInt("n_agenda") + "," + rst1.getInt("n_ano") + ",1,"
                    + "'" + getDateToday() + "',0,"
                    + "'" + getDateToday() + "','1111','21312'"
                    + ")RETURNING n_agenda ";

            Statement st2;
            cx = Conexion.getInstanceConexion();
            st2 = cx.createStatement();
            ResultSet rst2 = st2.executeQuery(sql2);
            rst2.next();
            insert = 1;

        } catch (SQLException e) {
            System.out.println("Error: participante_asiste " + e.getLocalizedMessage());
            System.out.println("Error: participante_asiste " + e.toString());
        }
        return insert;
    }

    public int rechAgenda(ParticipanteAsiste parasis, int n_persona) {
        int insert = 0;
        System.out.println("ParticipanteAsiste" + parasis.toString());
        String sql = "update participante_asiste set "
                + "n_rechazo='" + parasis.getN_rechazo() + "', "
                + "f_rechazo='" + getDateToday() + "' "
                + ""
                + "where        n_persona= '" + n_persona + "' "
                + "and          n_ano= '" + parasis.getN_ano() + "' "
                + "and          n_agenda= '" + parasis.getN_agenda() + "' "
                + "       ";
        try {
            Statement st;
            cx = Conexion.getInstanceConexion();
            st = cx.createStatement();
            ResultSet rst = st.executeQuery(sql);
            rst.next();

            insert = 1;
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e.getLocalizedMessage());
            System.out.println("Error: " + e.toString());
        }

        return insert;
    }

    private String getDateToday() {

        Date date = new Date();
        String mtoday = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
        return mtoday;
    }

}
