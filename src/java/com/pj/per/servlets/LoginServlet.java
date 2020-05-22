/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pj.per.servlets;

import com.google.gson.Gson;
import com.pj.per.dao.LoginDao;
import java.io.IOException;
import java.io.PrintWriter;
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
@WebServlet(name = "LoginServlet", urlPatterns = {"/ls"})
public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String option = request.getParameter("action");
        System.out.println(option);
        switch (option) {
            case "login":

                response.setContentType("application/json");
                response.setCharacterEncoding("utf-8");
//                ParamsLogin params = new Gson().fromJson(request.getParameter("params"), ParamsLogin.class);
//                System.out.println(params.toString());
                int idUsuario = LoginDao.getInstance().validateUser(request.getParameter("username"), request.getParameter("clave"), "");

                if (idUsuario >= 1) {
                    HttpSession se = request.getSession(true);
                    se.setAttribute("userName", request.getParameter("username"));
                    se.setAttribute("clave", request.getParameter("clave"));
                    se.setAttribute("userId", idUsuario);
                    response.getWriter().write(new Gson().toJson("1")); 

                } else {
                    response.getWriter().write(new Gson().toJson("0"));

                }

                break;
            case "op2":
                break;
        }

    }

}
