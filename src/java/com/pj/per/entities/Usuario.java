/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pj.per.entities;

/**
 *
 * @author irvinmarin
 */
public class Usuario {

    int UserId;
    String username;
    String password;
    String estado;
    String nombre;

    public Usuario() {
    }

    public int getUserId() {
        return UserId;
    }

    public void setUserId(int UserId) {
        this.UserId = UserId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Usuario(int UserId, String username, String password, String estado, String nombre) {
        this.UserId = UserId;
        this.username = username;
        this.password = password;
        this.estado = estado;
        this.nombre = nombre;
    }

}
