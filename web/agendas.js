$(document).ready(function () {


    getDatosUser();



    getListaAgendas("today");

    function getDatosUser() {
        var action = "ags?action=op00";
        var params = {};
        $.ajax({
            url: action,
            method: 'POST',
            data: params,
            success: function (response) {
                $("#txtUsername").text(response)
            },
            error: function (jqXHR, exception) {
                alertify.warning('Iniciar Sesion Primero !');
            }
        });
    }

    function getListaAgendas(dateSelected) {


        var action = "ags?action=op01";
        var params = {
            dateSelected: dateSelected
        };
        $.ajax({
            url: action,
            method: 'POST',
            data: params,
            success: function (response) {


                if (response != -2 || response != "-2") {
                    var htmlItem = "";
                    $("#divContentAgendas").empty();
                    var rd = response;
//                console.table(response);
                    var count = 1;
                    for (var i in rd) {


                        if (rd[i].n_rechazo) {

                        }

                        htmlItem += ' <div class="col-md-6 col-lg-4 ">';
                        htmlItem += ' <div class="panel panel-headline">';

                        htmlItem += ' <div class="panel-heading">';
                        htmlItem += '    <h3 class="panel-title">' + count + ' -  ' + rd[i].x_titulo + '</h3>';

                        htmlItem += '     <p class="panel-subtitle">' + rd[i].x_descripcion + '</p>';
                        htmlItem += ' </div>';

                        htmlItem += '   <div class="border-secondary mb-3" id="div_customSwitch_' + i + '" >';
                        htmlItem += '       <div class="panel-title"></div>';
                        htmlItem += '      <div class="panel-body ">';

                        console.log("n_rechazo " + rd[i].n_rechazo)
                        if (rd[i].n_rechazo != 1 || rd[i].n_rechazo != "1") {
                            htmlItem += '           <div class="custom-control custom-switch">';
                            htmlItem += '               <input type="checkbox" class="custom-control-input swichRechazar" id="customSwitch_' + i + '" \n\
                                                    data-nagenda="' + rd[i].n_agenda + '"\n\
                                                     data-nano="' + rd[i].n_ano + '">';
                            htmlItem += '               <label class="custom-control-label " id="label_customSwitch_' + i + '" for="customSwitch_' + i + '"  data-objagenda="' + rd[i] + '">RECHAZAR</label>';
                            htmlItem += '           </div>';
                        }

                        htmlItem += '          <span class="panel-text ">' + rd[i].f_inicio + '</span> - ';
                        htmlItem += '          <span class="panel-text ">' + rd[i].f_fin + '</span><br><br>';

                        var rdItem = rd[i].invitadosList;
                        for (var k in rdItem) {
                            htmlItem += '      <span style=" font-size: 12px !important;" class="panel-text" > ' + rdItem[k].x_correo + ' </span><br>';
                        }



                        var urlCalendarMeet = "https://meet.google.com/".concat(rd[i].x_meet_url, "?authuser=0&amp;hs=122");


                        htmlItem += '          <a target="_blank" rel="noreferrer noopener" href="' + urlCalendarMeet + '" id="btn_customSwitch_' + i + '" class="col-md-12 btn btn-primary">\n\
                                                    <svg class="bi bi-camera-video-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">"\n\
                                                        <path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"/>"\n\
                                                        <path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"/>"\n\
                                                    </svg> \n\
                                                    Unirse a Videollamada</a>';
                        htmlItem += '      </div>';
                        htmlItem += '  </div>';
                        htmlItem += '</div>';
                        htmlItem += '</div>';
                        count++;
                    }




                    $("#divContentAgendas").append(htmlItem);
                    $(".swichRechazar").on("change", function (e) {
                        n_agenda = $(this).data("nagenda");
                        n_ano = $(this).data("nano");
                        idElementRechazo = $(this).attr('id');
                        alertify.success("idElementRechazo " + idElementRechazo);
                        if ($(this).is(":checked") === true)
                        {
                            $("#label_" + idElementRechazo).addClass("text-rechazed");
                            $("#btn_" + idElementRechazo).hide();

                            $("#modalRechazar").modal('show');
                        } else {


                            $("#label_" + idElementRechazo).addClass("text-rechazed");
                        }
                    });
                } else {
                    window.location.replace("login.html");
                }


            },
            error: function (jqXHR, exception) {
                alertify.warning('error f_getListInvitados !');
            }
        });
    }

    var n_agenda = 0;
    var n_ano = 0;
    var idElementRechazo = 0;


    function f_updateRechazarAgenda() {

        var action = "ags?action=rech";
        var params = {
            n_agenda: n_agenda,
            n_ano: n_ano,
            //n_persona: 1,
            n_rechazo: $(".swichRechazar").val() ? 1 : 0,
            x_rechazo: $("#txtDescripcionRechazo").val()
        };
        $.ajax({
            url: action,
            method: 'POST',
            data: params,
            success: function (response) {

                if (response == 1 || response == "1") {
                    alertify.warning('Rechazar Registrado');

                    getListaAgendas("today")

                } else {
                    alertify.warning('Ucurrop un error y no se pudo Resitrar su Rechazo');
                }
                $("#btnRecharzar").removeClass("disbled");
                $("#modalRechazar").modal('hide');
                x_rechazo: $("#txtDescripcionRechazo").val("");

            },
            error: function (jqXHR, exception) {
                alertify.warning('Error de Conexión');
                $("#btnRecharzar").removeClass("disbled");
            }
        });
    }

    $("#btnRecharzar").on("click", function () {
        $("#btnRecharzar").addClass("disbled");


        if ($("#txtDescripcionRechazo").val() != "") {
            f_updateRechazarAgenda();
        } else {
            $("#txtDescripcionRechazo").addClass('is-invalid');
        }


    });
    $("#btnCancelRecharzar").on("click", function () {

        $("#" + idElementRechazo).prop('checked', false);
        $("#label_" + idElementRechazo).removeClass("text-rechazed");
        $("#div_" + idElementRechazo).removeClass("border-danger");
        $("#div_" + idElementRechazo).addClass("border-secondary");
        $("#btn_" + idElementRechazo).show();
    });



    $("#swc_verCelndario").prop('checked', true);

    $("#swc_verCelndario").on("change", function () {

        if ($('#swc_verCelndario').is(":checked")) {
            $('#calendar').show();
        } else {
            $('#calendar').hide();
        }


    });



    $(".nav-item").on("click", function () {


        $(".nav-item").removeClass("active");
        $(this).addClass("active")

        var idTab = $(this).prop("id")

        console.log("idTab " + idTab);
        switch (idTab) {
            case "nav_tab01":
                getListaAgendas("today");

                var f = new Date();

                $("#txtdscTab").empty();
                $("#txtdscTab").append("Eventos del " + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
                $("#saveEvent_button").show();
                break;
            case "nav_tab02":
                $("#txtdscTab").empty();
                $("#txtdscTab").text("Eventos a los que fue Invitado");
                $("#saveEvent_button").hide();
                f_getListAgenda(2);
                break;
            case "nav_tab03":
                $("#txtdscTab").empty();
                $("#txtdscTab").text("Eventos que ha rechazado");
                $("#saveEvent_button").hide();
                f_getListAgenda(3);
                break;

            default:

                break;
        }

    });

    function f_getListAgenda(tabNumber) {
        var action = "ags?action=op01-2";
        var params = {
            tabNumber: tabNumber
        };
        $.ajax({
            url: action,
            method: 'POST',
            data: params,
            success: function (response) {


                if (response != -2 || response != "-2") {
                    var htmlItem = "";
                    $("#divContentAgendas").empty();
                    var rd = response;
//                console.table(response);
                    var count = 1;
                    for (var i in rd) {
                        var borderColor = "secondary";
                        if (tabNumber == 3) {
                            borderColor = "warning";
                        }

                        htmlItem += ' <div class="col-md-6 col-lg-4 ">';
                        htmlItem += ' <div class="panel panel-headline">';

                        htmlItem += ' <div class="panel-heading">';
                        htmlItem += '    <h3 class="panel-title">' + count + ' -  ' + rd[i].x_titulo + '</h3>';
                        htmlItem += '     <p class="panel-subtitle">' + rd[i].x_descripcion + '</p>';
                        htmlItem += ' </div>';

                        htmlItem += '   <div class="border-secondary mb-3" id="div_customSwitch_' + i + '" >';
                        htmlItem += '       <div class="panel-title"></div>';
                        htmlItem += '      <div class="panel-body ">';
                        htmlItem += '          <span class="panel-text float-right">' + rd[i].f_inicio_real + '</span>';
                        console.log("n_rechazo " + rd[i].n_rechazo)
                        if (rd[i].n_rechazo != 1 || rd[i].n_rechazo != "1") {
                            htmlItem += '           <div class="custom-control custom-switch">';
                            htmlItem += '               <input type="checkbox" class="custom-control-input swichRechazar" id="customSwitch_' + i + '" \n\
                                                    data-nagenda="' + rd[i].n_agenda + '"\n\
                                                     data-nano="' + rd[i].n_ano + '">';
                            htmlItem += '               <label class="custom-control-label " id="label_customSwitch_' + i + '" for="customSwitch_' + i + '"  data-objagenda="' + rd[i] + '">RECHAZAR</label>';
                            htmlItem += '           </div>';
                        }

                        htmlItem += '          <span class="panel-text ">' + rd[i].f_inicio + '</span> - ';
                        htmlItem += '          <span class="panel-text ">' + rd[i].f_fin + '</span><br><br>';


                        var rdItem = rd[i].invitadosList;
                        for (var k in rdItem) {
                            htmlItem += '      <span style=" font-size: 12px !important;" class="panel-text" > ' + rdItem[k].x_correo + ' </span><br>';
                        }

                        var urlCalendarMeet = "https://meet.google.com/".concat(rd[i].x_meet_url, "?authuser=0&amp;hs=122");
                        if (tabNumber != 3) {
                            htmlItem += '          <a target="_blank" rel="noreferrer noopener"  href="' + urlCalendarMeet + '" id="btn_customSwitch_' + i + '" class="col-md-12 btn btn-primary">\n\
                                                    <svg class="bi bi-camera-video-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">"\n\
                                                        <path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"/>"\n\
                                                        <path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"/>"\n\
                                                    </svg> \n\
                                                    Unirse a Videollamada</a>';
                        }
                        htmlItem += '      </div>';
                        htmlItem += '  </div>';
                        htmlItem += '</div>';
                        htmlItem += '</div>';
                        count++;
                    }




                    $("#divContentAgendas").append(htmlItem);
                    $(".swichRechazar").on("change", function (e) {
                        n_agenda = $(this).data("nagenda");
                        n_ano = $(this).data("nano");
                        idElementRechazo = $(this).attr('id');
                        alertify.success("idElementRechazo " + idElementRechazo);
                        if ($(this).is(":checked") === true)
                        {
                            $("#label_" + idElementRechazo).addClass("text-rechazed");
                            $("#btn_" + idElementRechazo).hide();
                            console.log("danger");
//                        $("label").find("[for='" + idElementRechazo + "']").addClass("text-danger");
                            $("#modalRechazar").modal('show');
                        } else {
                            console.log("Secondary");

                            $("#label_" + idElementRechazo).addClass("text-rechazed");
                        }
                    });
                } else {
                    window.location.replace("login.html");
                }


            },
            error: function (jqXHR, exception) {
                alertify.warning('error f_getListInvitados !');
            }
        });
    }


});