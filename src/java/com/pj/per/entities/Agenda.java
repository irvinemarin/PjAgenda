/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pj.per.entities;

import java.util.List;

/**
 *
 * @author irvinmarin
 */
public class Agenda {

    public String x_titulo;
    public String x_descripcion;
    public String x_meet_url;

    public String f_inicio;
    public String f_fin;

    public String h_in;
    public String h_fin;

    public String f_inicio_real;
    public String f_fin_real;

    public int n_agenda_pad;
    public String x_agenda_pad;

    public int n_tododia;
    public int rechazoPersonal;
    public int n_sala_audiencia;
    public int n_tipo_audiencia;
    public int n_ubica_agenda;
    public int n_ano;
    public int n_agenda;
    public int n_estado_agenda;
    public int n_tipo_agenda;
    public String f_registro;

    public int n_ano_pad;
    public String x_valor;
    public int n_default;
    public String l_activo;

    public String f_aud;
    public String b_aud;
    public String c_aud_uid;
    public String c_aud_uidred;
    public String c_aud_pc;
    public String c_aud_ip;
    public String c_aud_mcaddr;

    List<ParticipanteAsiste> invitados;
    List<ParticipanteAgenda> invitadosList;

    public int getRechazoPersonal() {
        return rechazoPersonal;
    }

    public void setRechazoPersonal(int rechazoPersonal) {
        this.rechazoPersonal = rechazoPersonal;
    }

    
    
    public String getX_meet_url() {
        return x_meet_url;
    }

    public void setX_meet_url(String x_meet_url) {
        this.x_meet_url = x_meet_url;
    }

    public List<ParticipanteAgenda> getInvitadosList() {
        return invitadosList;
    }

    public void setInvitadosList(List<ParticipanteAgenda> invitadosList) {
        this.invitadosList = invitadosList;
    }

    public String getX_agenda_pad() {
        return x_agenda_pad;
    }

    public List<ParticipanteAsiste> getInvitados() {
        return invitados;
    }

    public void setInvitados(List<ParticipanteAsiste> invitados) {
        this.invitados = invitados;
    }

    public void setX_agenda_pad(String x_agenda_pad) {
        this.x_agenda_pad = x_agenda_pad;
    }

    public String getH_fin() {
        return h_fin;
    }

    public void setH_fin(String h_fin) {
        this.h_fin = h_fin;
    }

    public String getH_in() {
        return h_in;
    }

    public void setH_in(String h_in) {
        this.h_in = h_in;
    }

    public int getN_ano() {
        return n_ano;
    }

    public void setN_ano(int n_ano) {
        this.n_ano = n_ano;
    }

    public int getN_agenda() {
        return n_agenda;
    }

    public void setN_agenda(int n_agenda) {
        this.n_agenda = n_agenda;
    }

    public String getF_registro() {
        return f_registro;
    }

    public void setF_registro(String f_registro) {
        this.f_registro = f_registro;
    }

    public int getN_tipo_agenda() {
        return n_tipo_agenda;
    }

    public void setN_tipo_agenda(int n_tipo_agenda) {
        this.n_tipo_agenda = n_tipo_agenda;
    }

    public int getN_ubica_agenda() {
        return n_ubica_agenda;
    }

    public void setN_ubica_agenda(int n_ubica_agenda) {
        this.n_ubica_agenda = n_ubica_agenda;
    }

    public int getN_estado_agenda() {
        return n_estado_agenda;
    }

    public void setN_estado_agenda(int n_estado_agenda) {
        this.n_estado_agenda = n_estado_agenda;
    }

    public String getF_inicio() {
        return f_inicio;
    }

    public void setF_inicio(String f_inicio) {
        this.f_inicio = f_inicio;
    }

    public String getF_fin() {
        return f_fin;
    }

    public void setF_fin(String f_fin) {
        this.f_fin = f_fin;
    }

    public String getF_inicio_real() {
        return f_inicio_real;
    }

    public void setF_inicio_real(String f_inicio_real) {
        this.f_inicio_real = f_inicio_real;
    }

    public String getF_fin_real() {
        return f_fin_real;
    }

    public void setF_fin_real(String f_fin_real) {
        this.f_fin_real = f_fin_real;
    }

    public String getX_titulo() {
        return x_titulo;
    }

    public void setX_titulo(String x_titulo) {
        this.x_titulo = x_titulo;
    }

    public String getX_descripcion() {
        return x_descripcion;
    }

    public void setX_descripcion(String x_descripcion) {
        this.x_descripcion = x_descripcion;
    }

    public int getN_tododia() {
        return n_tododia;
    }

    public void setN_tododia(int n_tododia) {
        this.n_tododia = n_tododia;
    }

    public String getX_valor() {
        return x_valor;
    }

    public void setX_valor(String x_valor) {
        this.x_valor = x_valor;
    }

    public int getN_default() {
        return n_default;
    }

    public void setN_default(int n_default) {
        this.n_default = n_default;
    }

    public String getL_activo() {
        return l_activo;
    }

    public void setL_activo(String l_activo) {
        this.l_activo = l_activo;
    }

    public int getN_ano_pad() {
        return n_ano_pad;
    }

    public void setN_ano_pad(int n_ano_pad) {
        this.n_ano_pad = n_ano_pad;
    }

    public int getN_agenda_pad() {
        return n_agenda_pad;
    }

    public void setN_agenda_pad(int n_agenda_pad) {
        this.n_agenda_pad = n_agenda_pad;
    }

    public String getF_aud() {
        return f_aud;
    }

    public void setF_aud(String f_aud) {
        this.f_aud = f_aud;
    }

    public String getB_aud() {
        return b_aud;
    }

    public void setB_aud(String b_aud) {
        this.b_aud = b_aud;
    }

    public String getC_aud_uid() {
        return c_aud_uid;
    }

    public void setC_aud_uid(String c_aud_uid) {
        this.c_aud_uid = c_aud_uid;
    }

    public String getC_aud_uidred() {
        return c_aud_uidred;
    }

    public void setC_aud_uidred(String c_aud_uidred) {
        this.c_aud_uidred = c_aud_uidred;
    }

    public String getC_aud_pc() {
        return c_aud_pc;
    }

    public void setC_aud_pc(String c_aud_pc) {
        this.c_aud_pc = c_aud_pc;
    }

    public String getC_aud_ip() {
        return c_aud_ip;
    }

    public void setC_aud_ip(String c_aud_ip) {
        this.c_aud_ip = c_aud_ip;
    }

    public String getC_aud_mcaddr() {
        return c_aud_mcaddr;
    }

    public void setC_aud_mcaddr(String c_aud_mcaddr) {
        this.c_aud_mcaddr = c_aud_mcaddr;
    }

    public int getN_sala_audiencia() {
        return n_sala_audiencia;
    }

    public void setN_sala_audiencia(int n_sala_audiencia) {
        this.n_sala_audiencia = n_sala_audiencia;
    }

    public int getN_tipo_audiencia() {
        return n_tipo_audiencia;
    }

    public void setN_tipo_audiencia(int n_tipo_audiencia) {
        this.n_tipo_audiencia = n_tipo_audiencia;
    }

    @Override
    public String toString() {
        return "Agenda{" + "x_titulo=" + x_titulo + ", x_descripcion=" + x_descripcion + ", f_inicio=" + f_inicio + ", f_fin=" + f_fin + ", h_in=" + h_in + ", h_fin=" + h_fin + ", invitados=" + invitados + '}';
    }

}
