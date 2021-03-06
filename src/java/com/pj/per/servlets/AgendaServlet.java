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
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author irvinmarin
 */
@WebServlet(name = "AgendaServlet", urlPatterns = {"/ags"})
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

        HttpSession se = request.getSession(false);

        if (se == null || se.getAttribute("userName").equals("") || se.getAttribute("userName") == null) {
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().write(new Gson().toJson("-2"));
        } else {
            String option = request.getParameter("action");
            System.out.println(request.getParameter("action"));
            String idUsuario = se.getAttribute("userId").toString();
            String userName = se.getAttribute("userName").toString();
            switch (option) {

                case "op00":

                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    response.getWriter().write(new Gson().toJson(se.getAttribute("userName")));

                    break;

                case "op01":
                    List<Agenda> agendalist = new ArrayList<>();
//                System.out.println(request.getParameter("Agenda"));
                    String dateSelected = request.getParameter("dateSelected");
                    agendalist = AgendaDao.getInstance().getParticipanteAgendas(dateSelected, idUsuario, userName);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    response.getWriter().write(new Gson().toJson(agendalist));

                    break;
                case "op01-2":
                    List<Agenda> agendaInvitadoslist = new ArrayList<>();
//                System.out.println(request.getParameter("Agenda"));
                    String tabNumber = request.getParameter("tabNumber");
                    agendaInvitadoslist = AgendaDao.getInstance().getAgendasTabs(tabNumber, idUsuario, userName);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    response.getWriter().write(new Gson().toJson(agendaInvitadoslist));

                    break;
                case "op02":
//                List<ParticipanteAsiste> participanteAsistes = new ArrayList<>();
//                participanteAsistes = AgendaDao.getInstance().getPersonasAsiste();
//                response.getWriter().write(new Gson().toJson(participanteAsistes));
                    break;
                case "op03":
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    List<ParticipanteAgenda> participanteAgendasList = new ArrayList<>();
                    String n_grupo = request.getParameter("n_grupo");
                    participanteAgendasList = AgendaDao.getInstance().getParticipanteAgenda(n_grupo);
                    response.getWriter().write(new Gson().toJson(participanteAgendasList));
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
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    List<TipoAgenda> tipoAgendaList = new ArrayList<>();
                    tipoAgendaList = AgendaDao.getInstance().getTipoAgenda();
                    response.getWriter().write(new Gson().toJson(tipoAgendaList));
                    break;
                case "op07":
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    List<SalaAudiencia> salaAudienciaList = new ArrayList<>();
                    salaAudienciaList = AgendaDao.getInstance().getSalaAudiencia();
                    response.getWriter().write(new Gson().toJson(salaAudienciaList));
                    break;
                case "op08":
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    List<TipoAudiencia> tipoAudienciaList = new ArrayList<>();
                    tipoAudienciaList = AgendaDao.getInstance().getTipoAudiencia();
                    response.getWriter().write(new Gson().toJson(tipoAudienciaList));
                    break;
                case "op09":
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    List<GrupoPersonas> grupoPersonases = new ArrayList<>();
                    grupoPersonases = AgendaDao.getInstance().getGrupoPersonas();
                    response.getWriter().write(new Gson().toJson(grupoPersonases));
                    break;
                case "ins":
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    Agenda agendaItem = new Gson().fromJson(request.getParameter("Agenda"), Agenda.class);
                    System.out.println(agendaItem.toString());
                    int agendaSaved = AgendaDao.getInstance().addAgenda(agendaItem, request.getParameter("urlCalendarMeet"));

                    if (agendaSaved == 1) {
                        response.getWriter().write(new Gson().toJson("1"));
                    } else {
                        response.getWriter().write(new Gson().toJson("0"));

                    }

                    break;
                case "rech":

                    ParticipanteAsiste asis = new ParticipanteAsiste();

                    int userId = (int) se.getAttribute("userId");

                    System.out.println("getParameter  n_agenda" + request.getParameter("n_agenda"));
                    System.out.println("getParameter  n_ano" + request.getParameter("n_ano"));
                    System.out.println("getParameter  n_rechazo" + request.getParameter("n_rechazo"));
                    System.out.println("getParameter  x_rechazo" + request.getParameter("x_rechazo"));
                    System.out.println("getParameter  userId" + userId);
                    asis.setN_agenda(Integer.parseInt(request.getParameter("n_agenda")));
                    asis.setN_ano(Integer.parseInt(request.getParameter("n_ano")));
                    asis.setN_rechazo(Integer.parseInt(request.getParameter("n_rechazo")));
                    asis.setX_rechazo(request.getParameter("x_rechazo"));

                    int agendaRechazed = AgendaDao.getInstance().rechAgenda(asis, userId);

                    System.out.println("updateRechazo " + agendaRechazed);

                    if (agendaRechazed == 1) {
                        response.setContentType("application/json");
                        response.setCharacterEncoding("utf-8");
                        response.getWriter().write(new Gson().toJson("1"));
                    } else {
                        response.setContentType("application/json");
                        response.setCharacterEncoding("utf-8");
                        response.getWriter().write(new Gson().toJson("0"));

                    }
                    break;
                default:
                    RequestDispatcher dispatcher = getServletContext()
                            .getRequestDispatcher("/login.html");
                    dispatcher.forward(request, response);

                    break;
            }

        }

    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
