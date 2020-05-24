// Client ID and API key from the Developer Console
//$(document).ready(function () {




var CLIENT_ID = '646797906244-3mk9qh6gjop3bc23j2lv40vele4v3kop.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBhglUzy8opk0uA85VQjMJQ6Di00fx6sx8';
var profile;
var StringDatos; //almacena los email para registrar
var listInvitados;//Almacena los npersons
var data_read_updte; //almacena los email para update

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/calendar';
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var buttonRegister = document.getElementById('saveEvent_button');
var buttonEditar = document.getElementById('editEvent_button');
var buttonBorrar = document.getElementById('borrarEvent_button');
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {


    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        //ESTE PARTE ESPARA MOSTRAR ERROR PARA INGRESAR AL GOOGLE CALENDA
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        ListEventFullCalendar(); //this event for fullcalendar
        $("#signout_button").show();
        $("#msjGmai2").show();
        $("#msjGmail").hide();
        $("#txtUserGmail").text(profile.getEmail());
        alertify.success('Conexion a Calendar correcta!');

    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        $("#msjGmail").show();
        $("#msjGmai2").hide();
    }
}

/**
 *  Sign in the user upon button click. -- loguearse
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click. -- cerrar session
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/*Recibe el mensaje si paso algun error al ingresar a la pagina
 si no esta autorizada saldra un error*/
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

//funcion para listar los eventos en el fullCalendar
function ListEventFullCalendar() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'googleCalendar'],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: ' listYear'
        },
        timeZone: 'UTC-5',
        locale: 'es',
        displayEventTime: true, // don't show the time column in list view
        dateClick: function (arg) {

            var date = arg.date.getUTCDate() + "/" + (arg.date.getMonth() + 1) + "/" + arg.date.getUTCFullYear();

            var dateBD = arg.date.getUTCFullYear() + "/" + (arg.date.getMonth() + 1) + "/" + arg.date.getUTCDate();



            $("#txtdscTab").empty();
            $("#txtdscTab").append("Eventos del " + date);

            setListnerListaAgendas(dateBD);
//            console.log(dateBD);
        },
        // THIS KEY WON'T WORK IN PRODUCTION!!!
        // To make your own Google API key, follow the directions here:
        googleCalendarApiKey: API_KEY,
        // email del user logueado
        events: profile.getEmail(),
        eventClick: function (arg) {
            // opens events in a popup window
            arg.jsEvent.preventDefault() // don't navigate in main tab
            limpiarCampos();
            $('#Modaldetalle').modal('show');
            EventReadDetalleCalendarApi(arg.event.id);
        }

    });
    calendar.render();
    $("#txtUserGmail").text(profile.getEmail());
}


var errors = 0;
function f_checkInputsDB(imputId) {
    if ($(imputId).val == null || $(imputId).val.length == 0 || /^\s+$/.test($(imputId).val)) {
        $(imputId).addClass('is-invalid');
        errors++;
    }
}
function f_checkSelectsDB(imputSelectId) {
    if ($(imputSelectId).val() == null || $(imputSelectId).val() == 0) {
        $(imputSelectId).addClass('is-invalid');
        errors++;
    }
}


//funcion para registrar evento a google calendar Api
function EventSaveCalendarApi() {
    errors = 0;
    var vr_titulo = $('#text-Titulo').val();
    var vr_fechaI = $('#text-fechaI').val();
    var vr_horaI = $('#text-horaI').val();
    var vr_horaF = $('#text-horaF').val();
    var vr_descripcion = $('#text-descripcion').val();
//    var vr_fechaIR = $('#text-fechaIR').val();
//    var vr_fechaFR = $('#text-fechaFR').val();
//    var vr_horaIR = $('#text-horaIR').val();
//    var vr_horaFR = $('#text-horaFR').val();
    var vr_selt_tipoAgenda = $('#selt_tipoAgenda').val();
//    var vr_estadoAgenda = $('#selt_estadoAgenda').val();
    var vr_selt_salaAdudiencia = $('#selt_salaAdudiencia').val();
    var vr_tipoAudiencia = $('#selt_tipoAudiencia').val();
    var vr_selt_agendaParent = $('#selt_agendaParent').val();
    var vr_cbox_allday = 0;

    if ($('#cbox_allday').is(":checked")) {
        vr_cbox_allday = 1;
    }



//    f_checkInputsDB('#text-fechaIR');
//    f_checkInputsDB('#text-fechaFR');
//    f_checkInputsDB('#text-horaIR');
//    f_checkInputsDB('#text-horaFR');
    f_checkSelectsDB("#selt_tipoAgenda");
//    f_checkSelectsDB("#selt_estadoAgenda");
    f_checkSelectsDB("#selt_salaAdudiencia");
    f_checkSelectsDB("#selt_tipoAudiencia");
    //f_checkSelectsDB("#selt_agendaParent");


    if (validarCampos(1) && errors == 0) {

        var AgendaItem = {

            x_titulo: vr_titulo,
            x_descripcion: vr_descripcion,
            f_inicio: vr_fechaI,
            h_in: vr_horaI,
            h_fin: vr_horaF,
//          fechaIR: vr_fechaIR,
//          fechaFR: vr_fechaFR,
//          horaIR: vr_horaIR,
//          horaFR: vr_horaFR,
            n_tipo_agenda: vr_selt_tipoAgenda,
//          estadoAgenda: vr_estadoAgenda,
            n_sala_audiencia: vr_selt_salaAdudiencia,
            n_tipo_audiencia: vr_tipoAudiencia,
            n_agenda_pad: vr_selt_agendaParent,
            n_tododia: vr_cbox_allday,
            invitados: arrSelected
        };
        f_onSaveItemAgenda(AgendaItem);

    }
}
var arrSelected = [];

$('#text-invitados').on('change', function () {
    var selected = $(this).find("option:selected");

    var i = 0;
    selected.each(function () {
        arrSelected[i] = {n_persona: $(this).data("n_person")};
        i++;
    });
});

$('#text-invitados2').on('change', function () {
    var selected = $(this).find("option:selected");

    var i = 0;
    selected.each(function () {
        arrSelected[i] = {n_persona: $(this).data("n_person")};
        i++;
    });
});

//function para listar datos de un evento
function EventReadCalendarApi(idcalendar) {
    var eventToUpdate = gapi.client.calendar.events.get({
        "calendarId": 'primary',
        "eventId": idcalendar
    });
    eventToUpdate.execute(function (event) {
        //this function read modal
        $('#text-eventid').val(event.id);
        $('#text-Titulo2').val(event.summary);
        $('#text-descripcion2').val(event.description);
        $('#text-fechaI2').val(moment(event.start.dateTime).format('DD/MM/YYYY'));
        $('#text-horaI2').val(moment(event.start.dateTime).format('HH:mm'));
        $('#text-horaF2').val(moment(event.end.dateTime).format('HH:mm'));
        //recorrer el array  invitados
        var email_read_Update = [];
        for (var i = 0; i < event.attendees.length; i++) {
            email_read_Update.push(event.attendees[i].email);
        }
        displaySelect.set(email_read_Update);
    });
}

//function para mostrar detalles de los eventos
function EventReadDetalleCalendarApi(idcalendar) {
    var eventToUpdate = gapi.client.calendar.events.get({
        "calendarId": 'primary',
        "eventId": idcalendar
    });
    eventToUpdate.execute(function (event) {
        //this function read-Detalle modal
        $('.btnEditEventoCalendarApi').attr("data-id", event.id);
        $('.btnDeleteEventoCalendarApi').attr("data-id", event.id);
        $('#title_event').text(event.summary);
        $('#description_event').text(event.description);
        var fecha = moment(event.start.dateTime).format('DD/MM/YYYY');
        var horI = moment(event.start.dateTime).format('HH:mm');
        var horF = moment(event.end.dateTime).format('HH:mm');
        var url = "https://meet.google.com/".concat(event.conferenceData.conferenceId, "?authuser=0&amp;hs=122");
        $('#date_time_descripton').text(converDateFormatDetalleEvent(fecha, horI, horF));
        $('#btn_url-meet').attr("href", url);
        $('#utl_meet').text("meet.google.com/" + event.conferenceData.conferenceId);
        //recorrer el array  invitados
        var html = '';
        for (var i = 0; i < event.attendees.length; i++) {
            html += '<div class="container-icon"></div>';
            html += '<div class="container-SubtextDescription">';
            html += '<div class="icono-invitados">';
            html += '<img src="lib/img/User-Icon-Grey.png" alt="usuario invitado" height="25" width="25">';
            html += '</div>';
            html += '<div class="email-invitados">';
            html += '<span>' + event.attendees[i].email + '</span>';
            html += '</div>';
            html += '</div>';
        }
        $("#div_email_coustomer").empty();
        $("#div_email_coustomer").html(html);
    });
}

//function para actualizar evento
function EventUpateCalendarApi() {
    var eventId = $('#text-eventid').val();
    var vr_titulo = $('#text-Titulo2').val();
    var vr_fechaI = $('#text-fechaI2').val();
    var vr_horaI = $('#text-horaI2').val();
    var vr_horaF = $('#text-horaF2').val();
    var vr_descripcion = $('#text-descripcion2').val();
    if (validarCampos(2)) {
        //array que almacena el formato object-google-calendarApi
        const copyItems = [];
        //cambio de formato a la fechas
        var fechaInicio = convertDateFormat(vr_fechaI, 1);
        //agraga datos a un array-object
        data_read_updte.forEach(function (item) {
            copyItems.push({'email': item});
        });

        //Formato de objecto para actualizar
        var eventToUpdate = {
            'summary': vr_titulo,
            'description': vr_descripcion,
            'start': {
                'dateTime': fechaInicio + 'T' + vr_horaI + ':00',
                'timeZone': 'America/Lima'
            },
            'end': {
                'dateTime': fechaInicio + 'T' + vr_horaF + ':00',
                'timeZone': 'America/Lima'
            },
            'attendees': copyItems,
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };
        //funcion para actualizar
        var request = gapi.client.calendar.events.patch({
            'calendarId': 'primary',
            'eventId': eventId,
            'resource': eventToUpdate
        });
        //retorna el evento actualizado
        request.execute(function (event) {
            $('#calendar').empty();
            ListEventFullCalendar();
            $('#ModalUpdate').modal('hide');
        });
    }

}

//function para eliminar evento
function EventDeleteCalendarApi(eventId) {
    if (eventId) {
        var request = gapi.client.calendar.events.delete({
            'calendarId': 'primary',
            'eventId': eventId
        });
        request.execute(function (event) {
            $('#calendar').empty();
            ListEventFullCalendar();
        });
    }
}

//funcion que optiene los datos read de un evento para luego actualizar
$("#text-invitados2").on('change', function () {
    var val = $(this).val();
    data_read_updte = val;
});

//funcion que optiene los datos para registar
$("#text-invitados").on('change', function () {
    var val = $(this).val();


    StringDatos = val;
});
//funcion para cambiar formato de fechas a YYYY-MM-DD
function convertDateFormat(string, option) {
    if (option == 1) {
        var info = string.split('/'); //YYYY-MM-DD
        return info[2] + '-' + info[1] + '-' + info[0];
    } else {
        var info = string.split('-'); //DD/MM/YYYY
        return info[0] + '/' + info[1] + '/' + info[2];
    }
}

//funcion para convertir fecha formato mostrar detalle
function converDateFormatDetalleEvent(date, horI, horf) {
    var info = date.split('/');
    var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var dt = new Date(info[1] + ' ' + info[0] + ', ' + info[2]);
    var text = dias[dt.getUTCDay()] + ", " + info[0] + " de " + meses[dt.getMonth()] + " ⋅ " + horI + " - " + horf;
    return text;
}

//evento para el select multiple de correo for UPDATE   
const displaySelect = new SlimSelect({
    select: '#text-invitados2'
});
/*Simula los datos que vengan desde el SERVIDOR-JAVA en formato json
 EL SERVIDOR DEBE DEVOLVER EN FORMATO JSON PARA LUEGO OPTENER AQUI
 y recorrerlo en un for para luego agregarlo a un array[]*/
const copyItems = [];

//recorremos el array para agregar a otro array objet para luego agregar al select multiple
const data = [];
copyItems.forEach(function (item) {
    data.push({'value': item.email, 'text': item.email});
});
displaySelect.setData(data);
//btn para editar event
$(".btnEditEventoCalendarApi").on("click", function () {
    var mstr_Id = $(this).data("id");
    $('#Modaldetalle').modal('hide');
    $('#ModalUpdate').modal('show');
    f_getListGrupoPersona("2");
    EventReadCalendarApi(mstr_Id);
});







//btn para eliminar event
$(".btnDeleteEventoCalendarApi").on("click", function () {
    var mstr_Id = $(this).data("id");
    Swal.fire({
        title: 'Eliminará este Evento?',
        text: "Recuerda que no hay marcha atras para recueperar este evento!",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            //si presiona OK
            EventDeleteCalendarApi(mstr_Id);
            $('#Modaldetalle').modal('hide');
        }
    }
    );
});
//funcion para limpiar campos y clases
function limpiarCampos() {
    $('#text-Titulo').val('');
    $('#text-invitados').val('');
    $('#text-descripcion').val('');
    $('#text-Titulo').removeClass('is-invalid');
    $('#text-fechaI').removeClass('is-invalid');
    $('#text-horaI').removeClass('is-invalid');
    $('#text-horaF').removeClass('is-invalid');
    $('#text-invitados').removeClass('is-invalid');
    $('#text-descripcion').removeClass('is-invalid');
    $('#text-Titulo2').removeClass('is-invalid');
    $('#text-fechaI2').removeClass('is-invalid');
    $('#text-horaI2').removeClass('is-invalid');
    $('#text-horaF2').removeClass('is-invalid');
    $('#text-invitados2').removeClass('is-invalid');
    $('#text-descripcion2').removeClass('is-invalid');
}


$("#saveEvent_button").on("click", function () {

    f_getListSalaAud();
    f_getListTipoAgenda();
    f_getListTipoAud();
//    f_getListAgendaPadre();
//    f_getListInvitados();
//    f_getListEstadoAgenda();
    f_getListGrupoPersona();

});


var SavedDB = false;
function f_onSaveItemAgenda(AgendaItem) {
    //    console.table(AgendaItem);


    //registrar en calendar
    const copyItems = [];
    //cambio de formato a la fechas
    var fechaInicio = convertDateFormat(AgendaItem.f_inicio, 1);
    //agraga datos a un array-object
    StringDatos.forEach(function (item) {
        copyItems.push({'email': item});
    });
    //this object formato para registrar 
    var event = {
        'summary': AgendaItem.x_titulo,
        'description': AgendaItem.x_descripcion,
        'start': {
            'dateTime': fechaInicio + 'T' + AgendaItem.h_in + ':00',
            'timeZone': 'America/Lima'
        },
        'end': {
            'dateTime': fechaInicio + 'T' + AgendaItem.h_fin + ':00',
            'timeZone': 'America/Lima'
        },
        'attendees': copyItems,
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
            ]
        }
    };
    //this event save 
    gapi.client.load('calendar', 'v3', function () {
        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            "resource": event
        });
        // handle the response from our api call
        request.execute(function (respCalendar) {
            if (respCalendar.status == 'confirmed') {
                //cuando se registro correctamente

//                console.table(JSON.stringify(resp));


                $('#calendar').empty();
                ListEventFullCalendar();
                $('#exampleModalCenter').modal('hide');

                var urlCalendarMeet = respCalendar.conferenceData.conferenceId;

                var params = {Agenda: JSON.stringify(AgendaItem),
                    urlCalendarMeet: urlCalendarMeet
                };
                var action = "ags?action=ins";
                //    var params = {};
                $.ajax({
                    url: action,
                    method: 'POST',
                    data: params,
                    success: function (response) {

                        if (response == 1 || response == "1") {
                            alertify.warning("Registrado Correctamente");
                            getListaAgendas2("today");

                        } else {
                            alertify.warning("No Se Logro Registrar");
                            EventDeleteCalendarApi(respCalendar.id);
                        }
                    },
                    error: function (jqXHR, exception) {
                        alertify.warning('error f_onSaveItemAgenda !');
                        EventDeleteCalendarApi(respCalendar.id);
                    }
                });





            } else {
                //cuando ocurrio un problema al registrar
                alertify.danger("Ha ocurrido un error, intentelo otra vez");
            }
        });
    });




}


function f_getListTipoAgenda() {


    var action = "ags?action=op06";
    var params = {};
    $.ajax({
        url: action,
        method: 'POST',
        data: params,
        success: function (response) {
            var htmlItem = "";

            $("#selt_tipoAgenda").empty();
            var rd = response;
            htmlItem += '<option value="-1">--Seleccionar--</option>';
            for (var i in rd) {
                htmlItem += '<option value="' + rd[i].n_tipo_agenda + '">'
                        + rd[i].x_descripcion + '</option>';
            }
            $("#selt_tipoAgenda").append(htmlItem);
        },
        error: function (jqXHR, exception) {
            alertify.warning('error f_getListTipoAgenda !');
        }
    });



}
function f_getListEstadoAgenda() {



    var action = "ags?action=op04";
    var params = {};
    $.ajax({
        url: action,
        method: 'POST',
        data: params,
        success: function (response) {
            var htmlItem = "";
            $("#selt_estadoAgenda").empty();
            var rd = response;
            htmlItem += '<option value="-1">--Seleccionar--</option>';
            for (var i in rd) {
                htmlItem += '<option  value="' + rd[i].n_estado_agenda + '">' + rd[i].l_activo + '</option>';
            }
            listInvitados = new Array();
            $("#selt_estadoAgenda").append(htmlItem);
        },
        error: function (jqXHR, exception) {
            alertify.warning('error f_getListEstadoAgenda !');
        }
    });


}
function f_getListSalaAud() {

    var action = "ags?action=op07";
    var params = {};
    $.ajax({
        url: action,
        method: 'POST',
        data: params,
        success: function (response) {
            var htmlItem = "";
            $("#selt_salaAdudiencia").empty();
            var rd = response;
            htmlItem += '<option value="-1">--Seleccionar--</option>';

            for (var i in rd) {
                htmlItem += '<option value="' + rd[i].n_sala_audiencia + '">' + rd[i].x_descripcion + '</option>';
            }
            $("#selt_salaAdudiencia").append(htmlItem);
        },
        error: function (jqXHR, exception) {
            alertify.warning('error f_getListSalaAud !');
        }
    });


}
function f_getListTipoAud() {


    var action = "ags?action=op08";
    var params = {};
    $.ajax({
        url: action,
        method: 'POST',
        data: params,
        success: function (response) {
            var htmlItem = "";
            $("#selt_tipoAudiencia").empty();
            var rd = response;
            htmlItem += '<option value="-1">--Seleccionar--</option>';
            for (var i in rd) {
                htmlItem += '<option value="' + rd[i].n_tipo_audiencia + '">' + rd[i].x_descripcion + '</option>';
            }
            $("#selt_tipoAudiencia").append(htmlItem);
        },
        error: function (jqXHR, exception) {
            alertify.warning('error f_getListTipoAud !');
        }
    });

}
function f_getListAgendaPadre() {

    var action = "ags?action=op01";
    var params = {};
    $.ajax({
        url: action,
        method: 'POST',
        data: params,
        success: function (response) {
//            var htmlItem = "";
//            $("#selt_salaAdudiencia").empty();
//            var rd = response;
//            htmlItem += '<option value="-1">--Seleccionar--</option>';
//            for (var i in rd) {
//                htmlItem += '<option value="' + rd[i].n_persona + '">' + rd[i].x_correo + '</option>';
//            }
//            $("#selt_salaAdudiencia").append(htmlItem);
//        },
//        error: function (jqXHR, exception) {
//            alertify.warning('error f_getListAgendaPadre !');
        }
    });



}
function f_getListInvitados(n_grupo, invitados2) {


    var action = "ags?action=op03";
    var params = {n_grupo: n_grupo};
    $.ajax({
        url: action,
        method: 'POST',
        data: params,
        success: function (response) {
            var htmlItem = "";

            if (invitados2 == 2) {
                $("#text-invitados2").empty();
                var rd = response;
                for (var i in rd) {
                    htmlItem += '<option value="' + rd[i].x_correo + '"  data-n_person="' + rd[i].n_persona + '" >' + rd[i].x_correo + '</option>';
                }
                $("#text-invitados2").append(htmlItem);
            } else {
                $("#text-invitados").empty();
                var rd = response;

                for (var i in rd) {
                    htmlItem += '<option value="' + rd[i].x_correo + '"  data-n_person="' + rd[i].n_persona + '" >' + rd[i].x_correo + '</option>';
                }
                $("#text-invitados").append(htmlItem);
            }

        },
        error: function (jqXHR, exception) {
            alertify.warning('error f_getListInvitados !');
        }
    });


}


$(".reloadSelect").on("click", function () {

    var idReload = $(this).attr('id');
    console.log("idReload " + idReload);
    switch (idReload) {
        case "op06":
            f_getListTipoAgenda();
            break;
        case "op07":
            f_getListSalaAud();
            break;
        case "op08":
            f_getListTipoAud();
            break;
        case "op09":
            f_getListGrupoPersona();
            break;
        case "op09_2":
            f_getListGrupoPersona("2");
            break;

        default:

            break;
    }
//    $("#" + idElementRechazo2).prop('checked', false);
//    $("#label_" + idElementRechazo2).removeClass("text-rechazed");
});


function f_getListGrupoPersona(update) {


    var action = "ags?action=op09";
    var params = {};
    $.ajax({
        url: action,
        method: 'POST',
        data: params,
        success: function (response) {
            var htmlItem = "";
            if (update == "2") {
                $("#selt_grupoPersona2").empty();
                var rd = response;
                htmlItem += '<option value="-1">--Seleccionar--</option>';
                for (var i in rd) {
                    htmlItem += '<option value="' + rd[i].n_grupo_per + '"  >' + rd[i].x_descripcion + '</option>';
                }


                $("#selt_grupoPersona2").append(htmlItem);
                $("#selt_grupoPersona2").on("change", function () {



                    if ($("#selt_grupoPersona2").val() != -1) {
                        f_getListInvitados($("#selt_grupoPersona2").val(), 2);
                    } else {
                        $("#text-invitados2").empty();
                    }
                });

            } else {
                $("#selt_grupoPersona").empty();
                var rd = response;
                htmlItem += '<option value="-1">--Seleccionar--</option>';
                for (var i in rd) {
                    htmlItem += '<option value="' + rd[i].n_grupo_per + '"  >' + rd[i].x_descripcion + '</option>';
                }


                $("#selt_grupoPersona").append(htmlItem);
                $("#selt_grupoPersona").on("change", function () {



                    if ($("#selt_grupoPersona").val() != -1) {
                        f_getListInvitados($("#selt_grupoPersona").val());
                    } else {
                        $("#text-invitados").empty();
                    }
                });
            }





        },
        error: function (jqXHR, exception) {
            alertify.warning('error f_getListInvitados !');
        }
    });

}


function setListnerListaAgendas(parameters) {
    getListaAgendas2(parameters);
}


function getListaAgendas2(dateSelected) {


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

                    htmlItem += ' <div class="col-md-6 col-lg-4 ">';
                    htmlItem += ' <div class="panel panel-headline">';
                    htmlItem += ' <div class="panel-heading">';
                    htmlItem += '    <h3 class="panel-title">' + count + ' -  ' + rd[i].x_titulo + '</h3>';

                    htmlItem += '     <p class="panel-subtitle">' + rd[i].x_descripcion + '</p>';
                    htmlItem += ' </div>';
                    htmlItem += '   <div class="border-secondary mb-3" id="div_customSwitch_' + i + '" >';
                    htmlItem += '       <div class="panel-title"></div>';
                    htmlItem += '      <div class="panel-body ">';


                    console.log("rechazoPersonal " + rd[i].rechazoPersonal)

                    if (rd[i].rechazoPersonal != 1 || rd[i].rechazoPersonal != "1") {
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
                    htmlItem += '          <a href="' + urlCalendarMeet + '" target="_blank" rel="noreferrer noopener"  id="btn_customSwitch_' + i + '" class="col-md-12 btn btn-primary">\n\
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
                    idElementRechazo2 = $(this).attr('id');
                    alertify.success("idElementRechazo2 " + idElementRechazo2);
                    if ($(this).is(":checked") === true)
                    {
                        $("#label_" + idElementRechazo2).addClass("text-rechazed");
                        $("#div_" + idElementRechazo2).removeClass("border-secondary");
                        $("#div_" + idElementRechazo2).addClass("bg-warning");
                        $("#btn_" + idElementRechazo2).hide();
                        console.log("danger");
//                        $("label").find("[for='" + idElementRechazo2 + "']").addClass("text-danger");
                        $("#modalRechazar").modal('show');
                    } else {
                        console.log("Secondary");
                        $("#div_" + idElementRechazo2).removeClass("border-danger");
                        $("#div_" + idElementRechazo2).addClass("border-secondary");
                        $("#label_" + idElementRechazo2).addClass("text-rechazed");
                        $("#btn_" + idElementRechazo2).show();
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



var n_agenda2 = 0;
var n_ano2 = 0;
var idElementRechazo2 = 0;
//$("#btnRecharzar").on("click", function () {
//    $("#btnRecharzar").addClass("disbled");
//
//
//    if ($("#txtDescripcionRechazo").val() != "") {
//        f_updateRechazarAgenda();
//    } else {
//        $("#txtDescripcionRechazo").addClass('is-invalid');
//    }
//
//
//});
$("#btnCancelRecharzar").on("click", function () {

    $("#" + idElementRechazo2).prop('checked', false);
    $("#label_" + idElementRechazo2).removeClass("text-rechazed");
    $("#div_" + idElementRechazo2).removeClass("border-danger");
    $("#div_" + idElementRechazo2).addClass("border-secondary");
    $("#btn_" + idElementRechazo2).show();
});



