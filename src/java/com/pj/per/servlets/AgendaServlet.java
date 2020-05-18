/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pj.per.servlets;

import com.google.gson.Gson;
import com.pj.per.dao.AgendaDao;
import com.pj.per.entities.Agenda;
import com.pj.per.entities.EstadoAgenda;
import com.pj.per.entities.GrupoPersonas;
import com.pj.per.entities.ParticipanteAgenda;
import com.pj.per.entities.ParticipanteAsiste;
import com.pj.per.entities.SalaAudiencia;
import com.pj.per.entities.TipoAgenda;
import com.pj.per.entities.TipoAudiencia;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author irvinmarin
 */
@WebServlet(name = "LoginServlet", urlPatterns = {"/ags"})
public class AgendaServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("doGet");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("doPost");

        String option = request.getParameter("action");
        System.out.println(request.getParameter("action"));

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        switch (option) {
            case "op01":
//                List<Agenda> agendalist = new ArrayList<>();
//                System.out.println(request.getParameter("AgendaItem"));
//
//                agendalist = AgendaDao.getInstance().getAgendas(request.getParameter("AgendaItem"));
//                response.getWriter().write(new Gson().toJson(agendalist));

                break;
            case "op02":
//                List<ParticipanteAsiste> participanteAsistes = new ArrayList<>();
//                participanteAsistes = AgendaDao.getInstance().getPersonasAsiste();
//                response.getWriter().write(new Gson().toJson(participanteAsistes));
                break;
            case "op03":
//                List<ParticipanteAgenda> participanteAgendasList = new ArrayList<>();
//                participanteAgendasList = AgendaDao.getInstance().getParticipanteAgenda();
//                response.getWriter().write(new Gson().toJson(participanteAgendasList));
                break;
            case "op04":
//                List<EstadoAgenda> estadoAgendaList = new ArrayList<>();
//                estadoAgendaList = AgendaDao.getInstance().getEstadoAgenda();
//                response.getWriter().write(new Gson().toJson(estadoAgendaList));
                break;
            case "op05":
//                List<GrupoPersonas> grupoPersonasList = new ArrayList<>();
//                grupoPersonasList = AgendaDao.getInstance().getGrupoPersonas();
//                response.getWriter().write(new Gson().toJson(grupoPersonasList));
                break;
            case "op06":
                List<TipoAgenda> tipoAgendaList = new ArrayList<>();
                tipoAgendaList = AgendaDao.getInstance().getTipoAgenda();
                response.getWriter().write(new Gson().toJson(tipoAgendaList));
                break;
            case "op07":
                List<SalaAudiencia> salaAudienciaList = new ArrayList<>();
                salaAudienciaList = AgendaDao.getInstance().getSalaAudiencia();
                response.getWriter().write(new Gson().toJson(salaAudienciaList));
                break;
            case "op08":
                List<TipoAudiencia> tipoAudienciaList = new ArrayList<>();
                tipoAudienciaList = AgendaDao.getInstance().getTipoAudiencia();
                response.getWriter().write(new Gson().toJson(tipoAudienciaList));
                break;
            case "ins":
//                Agenda agendaItem = new Gson().fromJson(request.getParameter("AgendaItem"), Agenda.class);
//                int agendaSaved = AgendaDao.getInstance().addAgenda(agendaItem);
//                response.getWriter().write(new Gson().toJson(agendaSaved));
                break;
        }

    }

}
