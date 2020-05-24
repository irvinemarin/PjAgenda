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

    public List<ParticipanteAgenda> getParticipanteAgenda(String n_grupoPersona) {
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
                    + "               where pag.l_activo='1' "
                    + "                     and rop.n_grupo_per=" + n_grupoPersona + ""
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

    public List<Agenda> getParticipanteAgendas(String dateSelected, String idUsuario, String userName) {
        String dateParam = "";
        if ("today".equals(dateSelected)) {
            dateParam = getDateToday();
        } else {
            dateParam = dateSelected;
        }

        List<Agenda> list = new ArrayList<>();

        try {
            cx = Conexion.getInstanceConexion();
            ps = cx.prepareStatement("Select  	pas.n_rechazo, pas.n_persona , pag.x_nombre, ag.*  "
                    + "from 		Agenda ag "
                    + "inner join 	participante_asiste pas on ag.n_ano=pas.n_ano and ag.n_agenda=pas.n_agenda "
                    + "inner join 	participante_agenda pag on pas.n_persona=pag.n_persona "
                    + "where           TO_DATE(to_char(f_inicio,'YYYY-MM-DD'),'YYYY-MM-DD') = to_timestamp('" + dateParam + "', 'YYYY-MM-DD') "
                    + "and 		pas.n_rechazo= 0 "
                    + "and 		pas.n_persona=" + idUsuario);

            rs = ps.executeQuery();

            int positionrow = 0;
            while (rs.next()) {
                positionrow++;
                Agenda k = new Agenda();

                k.setN_ano(rs.getInt("n_ano"));
                k.setN_agenda(rs.getInt("n_agenda"));
                k.setRechazoPersonal(rs.getInt("n_rechazo"));
                k.setX_titulo(rs.getString("x_titulo"));
                k.setX_descripcion(rs.getString("x_descripcion"));
                k.setX_meet_url(rs.getString("x_meet_url"));
                k.setF_inicio("Hora Inicio : " + rs.getString("f_inicio").substring(10, 16));
                k.setF_inicio_real(rs.getString("f_inicio_real"));
                k.setF_fin("Hora Final : " + rs.getString("f_fin").substring(10, 16));
                k.setF_fin_real(rs.getString("f_fin_real"));
//                k.setN_agenda_pad(rs.getInt("x_agenda_pad"));
//                k.setX_agenda_pad(rs.getString("x_agenda_pad"));

                k.setInvitadosList(getPersonasAsisteByAgenda(rs.getInt("n_ano"), rs.getInt("n_agenda")));

                list.add(k);

            }
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;

    }

    public List<ParticipanteAgenda> getPersonasAsisteByAgenda(int n_ano, int n_agenda) {
        List<ParticipanteAgenda> list = new ArrayList<>();
        System.out.println("n_ano :" + n_ano);
        System.out.println("n_agenda :" + n_agenda);
        try {

            String sql2 = "select        pag.n_persona, "
                    + "                             pag.x_nombre,pag.x_apellido_paterno,"
                    + "                             pag.x_apellido_materno,pag.x_correo,"
                    + "                             pag.l_ind_sexo,"
                    + "                             pas.n_ano,"
                    + "                             ag.n_agenda "
                    + "               from          participante_asiste pas"
                    + "               inner join    agenda ag on pas.n_ano=ag.n_ano and pas.n_agenda=ag.n_agenda "
                    + "               inner join    participante_agenda pag on pas.n_persona=pag.n_persona "
                    + "               where         pas.n_agenda=" + n_agenda + " and pas.n_ano=" + n_ano;

            Statement st2;
            cx = Conexion.getInstanceConexion();
            st2 = cx.createStatement();
            ResultSet rst2 = st2.executeQuery(sql2);

            while (rst2.next()) {

                ParticipanteAgenda k = new ParticipanteAgenda();
                System.out.println("ParticipanteAgenda n_persona :" + rst2.getInt("n_persona"));
                k.setN_persona(rst2.getInt("n_persona"));
                k.setX_nombre(rst2.getString("x_nombre"));
                k.setX_apellido_paterno(rst2.getString("x_apellido_paterno"));
                k.setX_apellido_materno(rst2.getString("x_apellido_materno"));
                k.setX_correo(rst2.getString("x_correo"));
                k.setFullName(rst2.getString("x_apellido_paterno") + " " + rst2.getString("x_apellido_materno") + ", " + rst2.getString("x_nombre"));
                list.add(k);
            }
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: getPersonasAsisteByAgenda " + e);
        }

//        System.out.println("getInvitadosList :" + list.toString());
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
            ps = cx.prepareStatement("Select * from grupo_personas where l_activo='1'");
            rs = ps.executeQuery();

            while (rs.next()) {

                GrupoPersonas k = new GrupoPersonas();
                k.setN_grupo_per(rs.getInt("n_grupo_per"));
                k.setX_descripcion(rs.getString("x_descripcion"));

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

    public int addAgenda(Agenda agendaItem, String urlMeet) {

        int insert = 0;
        String sql = "INSERT INTO agenda(n_ano,n_agenda,n_estado_agenda,"
                + "f_registro, n_tipo_agenda,"
                + "x_titulo, x_descripcion, "
                + "f_inicio, f_fin,"
                + "n_tododia,x_meet_url,"
                + "f_aud,  c_aud_uid, c_aud_uidred,"
                + "n_sala_audiencia, n_tipo_audiencia)"
                + "values ((select coalesce(MAX(n_agenda),0) from agenda)+1,(select coalesce(MAX(n_ano),0) from agenda)+1,1,"
                + "'" + getDateToday() + "'," + "'" + agendaItem.getN_tipo_agenda() + "',"
                + "'" + agendaItem.getX_titulo() + "','" + agendaItem.getX_descripcion() + "',"
                + "'" + agendaItem.getF_inicio() + " " + agendaItem.getH_in() + "',"
                + "'" + agendaItem.getF_inicio() + " " + agendaItem.getH_fin() + "',"
                + "'" + agendaItem.getN_tododia() + "','" + urlMeet + "',"
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

            for (ParticipanteAsiste item : agendaItem.getInvitados()) {
                insert = insertarDetalle(item.getN_persona(), rst1);
            }
            if (insert == 0) {
                cx.rollback();
            } else {
                cx.commit();
            }

            //cx.close();
        } catch (SQLException e) {

            System.out.println("Error: addAgenda " + e.getLocalizedMessage());
            System.out.println("Error:  addAgenda " + e.toString());
        }

        return insert;
    }

    private int insertarDetalle(int n_perona, ResultSet rst1) {
        System.out.println("n_person - " + n_perona);
        int insert = 0;
        try {
            String sql2 = "INSERT INTO participante_asiste(n_ano,n_agenda,n_persona,"
                    + "f_registro,n_rechazo,"
                    + "f_aud,  c_aud_uid, c_aud_uidred)"
                    + "values (" + rst1.getInt("n_agenda") + "," + rst1.getInt("n_ano") + "," + n_perona + ","
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
        int updateRechazo = 0;
        System.out.println("ParticipanteAsiste" + parasis.toString());
        String sql = "update participante_asiste set "
                + "n_rechazo='" + parasis.getN_rechazo() + "', "
                + "f_rechazo='" + getDateToday() + "', "
                + "x_rechazo='" + parasis.getX_rechazo() + "' "
                + ""
                + "where        n_persona= '" + n_persona + "' "
                + "and          n_ano= '" + parasis.getN_ano() + "' "
                + "and          n_agenda= '" + parasis.getN_agenda() + "' "
                + "RETURNING n_agenda";

        try {

            Statement st;
            cx = Conexion.getInstanceConexion();
            cx.setAutoCommit(false);
            st = cx.createStatement();
            ResultSet rst = st.executeQuery(sql);
            rst.next();

            updateRechazo = rst.getRow();

            if (updateRechazo == 0) {
                cx.rollback();
            } else {
                cx.commit();
            }
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e.getLocalizedMessage());
            System.out.println("Error: " + e.toString());
        }

        return updateRechazo;
    }

    private String getDateToday() {

        Date date = new Date();
        String mtoday = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
        return mtoday;
    }

    public List<Agenda> getAgendasTabs(String tabNumber, String idUsuario, String userName) {
        List<Agenda> list = new ArrayList<>();

        int nrechazo = 0;
        if ("2".equals(tabNumber)) {
            nrechazo = 0;
        } else if ("3".equals(tabNumber)) {
            nrechazo = 1;
        }

        String SQL = "Select  pas.n_rechazo, pas.n_persona , pag.x_nombre, ag.*  "
                + "from 	Agenda ag "
                + "inner join 	participante_asiste pas on ag.n_ano=pas.n_ano and ag.n_agenda=pas.n_agenda "
                + "inner join 	participante_agenda pag on pas.n_persona=pag.n_persona "
                + "where 	pas.n_rechazo=" + nrechazo + " "
                + "and 		pas.n_persona=" + idUsuario
                + "and 		ag.n_estado_agenda=1";

        try {
            cx = Conexion.getInstanceConexion();
            ps = cx.prepareStatement(SQL);

            rs = ps.executeQuery();

            while (rs.next()) {

                Agenda k = new Agenda();

                k.setN_ano(rs.getInt("n_ano"));
                k.setN_agenda(rs.getInt("n_agenda"));
                k.setRechazoPersonal(rs.getInt("n_rechazo"));
                k.setX_titulo(rs.getString("x_titulo"));
                k.setX_descripcion(rs.getString("x_descripcion"));
                k.setX_meet_url(rs.getString("x_meet_url"));
                k.setF_inicio("Hora Inicio : " + rs.getString("f_inicio").substring(10, 16));
                k.setF_inicio_real(rs.getString("f_inicio").substring(0, 10));
                k.setF_fin("Hora Final : " + rs.getString("f_fin").substring(10, 16));
                k.setF_fin_real(rs.getString("f_fin_real"));
//                k.setN_agenda_pad(rs.getInt("x_agenda_pad"));
//                k.setX_agenda_pad(rs.getString("x_agenda_pad"));
                k.setInvitadosList(getPersonasAsisteByAgenda(rs.getInt("n_ano"), rs.getInt("n_agenda")));
//                System.out.println("getInvitadosList :" + getPersonasAsisteByAgenda(rs.getInt("n_ano"), rs.getInt("n_agenda")));

                list.add(k);

            }
            //cx.close();

        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }

        return list;

    }

}
