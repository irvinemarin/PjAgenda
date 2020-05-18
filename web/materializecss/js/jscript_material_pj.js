/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {


//    $('select').formSelect();
    $('select').material_select();
    $('.tooltipped').tooltip();
    $('.tabs').tabs();
//    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
//    $('.datepicker').pickadate();

    $('.datepicker').pickadate({
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        selectMonths: true,
        selectYears: 15, // Puedes cambiarlo para mostrar más o menos años
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Ok',
        firstDay: true,
        format: 'yyyy-mm-dd',
        labelMonthNext: 'Siguiente mes',
        labelMonthPrev: 'Mes anterior',
        labelMonthSelect: 'Selecciona un mes',
        labelYearSelect: 'Selecciona un año',

    });

    $('.datepicker').on('mousedown', function (event) {
        event.preventDefault();
    });


    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: false, // Choose whether you can drag to open on touch screens,
        onOpen: function (el) { /* Do Stuff */
        }, // A function to be called when sideNav is opened
        onClose: function (el) { /* Do Stuff */
        } // A function to be called when sideNav is closed
    });

    $('.modal').modal();


    $('.carousel').carousel();

    $('.carousel.carousel-slider').carousel({fullWidth: true});

    $('.slider').slider({full_width: true});//slider init
    
    
    
});
      