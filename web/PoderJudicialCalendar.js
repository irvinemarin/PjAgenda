// Client ID and API key from the Developer Console
//$(document).ready(function () {




var CLIENT_ID = '646797906244-3mk9qh6gjop3bc23j2lv40vele4v3kop.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBhglUzy8opk0uA85VQjMJQ6Di00fx6sx8';
var profile;
var StringDatos; //almacena los email para registrar
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
        plugins: ['interaction', 'dayGrid', 'List', 'googleCalendar'],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth, listYear'
        },
        displayEventTime: true, // don't show the time column in list view

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
    var vr_cbox_allday = $('#cbox_allday').is(":checked");
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


        const copyItems = [];
        //cambio de formato a la fechas
        var fechaInicio = convertDateFormat(vr_fechaI, 1);
        //agraga datos a un array-object
        StringDatos.forEach(function (item) {
            copyItems.push({'email': item});
        });
        //this object formato para registrar 
        var event = {
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
        //this event save 
        gapi.client.load('calendar', 'v3', function () {
            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                "resource": event
            });
            // handle the response from our api call
            request.execute(function (resp) {
                if (resp.status == 'confirmed') {
                    //cuando se registro correctamente


                    var AgendaItem = {

                        x_titulo: vr_titulo,
                        x_descripcion: vr_descripcion,
                        f_inicio: vr_fechaI,
                        f_fin: vr_horaI,
                        horaF: vr_horaF,
//                        fechaIR: vr_fechaIR,
//                        fechaFR: vr_fechaFR,
//                        horaIR: vr_horaIR,
//                        horaFR: vr_horaFR,
                        n_tipo_agenda: vr_selt_tipoAgenda,
//                        estadoAgenda: vr_estadoAgenda,
                        n_sala_audiencia: vr_selt_salaAdudiencia,
                        n_tipo_audiencia: vr_tipoAudiencia,
                        n_agenda_pad: vr_selt_agendaParent,
                        n_tododia: vr_cbox_allday
                    };
                    f_onSaveItemAgenda(AgendaItem);
                    $('#calendar').empty();
                    ListEventFullCalendar();
                    $('#exampleModalCenter').modal('hide');
                } else {
                    //cuando ocurrio un problema al registrar
                    document.getElementById('content').innerHTML = "There was a problem. Reload page and try again.";
                }
            });
        });
    }
}

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
copyItems.push({'email': 'lpage@example.com'});
copyItems.push({'email': 'sbrin@example.com'});
copyItems.push({'email': 'prueba@example.com'});
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
    f_getListAgendaPadre();
    f_getListInvitados();
    f_getListEstadoAgenda();

});
//$('#exampleModalCenter').on('shown.bs.modal', function () {
////   
//})


function f_onSaveItemAgenda(AgendaItem) {
    console.table(AgendaItem);
//    $.post("ags?action=op01", $.param({AgendaItem: JSON.stringify(AgendaItem)}), function (response) {
//
////        $("#divContentSeguimiento").append(getHtmlItemAgenda(response));
//
//    });
}


function f_getListTipoAgenda() {
    $.post("ags?action=op06", $.param({}), function (response) {
        var htmlItem = "";

        $("#selt_tipoAgenda").empty();
        var rd = response;
        htmlItem += '<option value="-1">--Seleccionar--</option>';
        for (var i in rd) {
            htmlItem += '<option value="' + rd[i].n_tipo_agenda + '">' + rd[i].x_descripcion + '</option>';
        }
        $("#selt_tipoAgenda").append(htmlItem);
    });

}
function f_getListEstadoAgenda() {


//    $.post("ags?action=op04", $.param({}), function (response) {
//        var htmlItem = "";
//        $("#selt_estadoAgenda").empty();
//        var rd = response;
//        htmlItem += '<option value="-1">--Seleccionar--</option>';
//        for (var i in rd) {
//            htmlItem += '<option value="' + rd[i].n_estado_agenda + '">' + rd[i].l_activo + '</option>';
//        }
//        $("#selt_estadoAgenda").append(htmlItem);
//    });
}
function f_getListSalaAud() {
    $.post("ags?action=op07", $.param({}), function (response) {
        var htmlItem = "";
        $("#selt_salaAdudiencia").empty();
        var rd = response;
        htmlItem += '<option value="-1">--Seleccionar--</option>';

        for (var i in rd) {
            htmlItem += '<option value="' + rd[i].n_sala_audiencia + '">' + rd[i].x_descripcion + '</option>';
        }
        $("#selt_salaAdudiencia").append(htmlItem);

    });
}
function f_getListTipoAud() {
    $.post("ags?action=op08", $.param({}), function (response) {
        var htmlItem = "";
        $("#selt_tipoAudiencia").empty();
        var rd = response;
        htmlItem += '<option value="-1">--Seleccionar--</option>';
        for (var i in rd) {
            htmlItem += '<option value="' + rd[i].n_tipo_audiencia + '">' + rd[i].x_descripcion + '</option>';
        }
        $("#selt_tipoAudiencia").append(htmlItem);
    });
}
function f_getListAgendaPadre() {
//    $.post("ags?action=op01", $.param({}), function (response) {
//        var htmlItem = "";
//
//
//        $("#selt_salaAdudiencia").empty();
//        var rd = response;
//        htmlItem += '<option value="-1">--Seleccionar--</option>';
//        for (var i in rd) {
//            htmlItem += '<option value="' + rd[i].n_persona + '">' + rd[i].x_correo + '</option>';
//        }
//        $("#selt_salaAdudiencia").append(htmlItem);
//    });
}
function f_getListInvitados() {

//    $.post("ags?action=op02", $.param({}), function (response) {
//
////        $("#divContentSeguimiento").append(getHtmlItemAgenda(response));
//
//    });
}

// });

