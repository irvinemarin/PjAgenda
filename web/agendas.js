$(document).ready(function () {


    getListaAgendas();
    function getListaAgendas() {


        var action = "ags?action=op01";
        var params = {};
        $.ajax({
            url: action,
            method: 'POST',
            data: params,
            success: function (response) {


                var htmlItem = "";
                $("#divContentAgendas").empty();
                var rd = response;
//                console.table(response);
                var count = 1;
                for (var i in rd) {
                    htmlItem += ' <div class="col-sm-12 col-lg-4">';
                    htmlItem += '   <div class=" card border-secondary mb-3" >';
                    htmlItem += '       <div class="card-header">' + count + ' ' + rd[i].x_titulo + '</div>';
                    htmlItem += '      <div class="card-body ">';
                    htmlItem += '          <h5 class="card-title text-primary"> ' + rd[i].x_descripcion + '</h5>';
                    htmlItem += '          <span class="card-text ">' + rd[i].f_inicio + '</span>';
                    htmlItem += '          <span class="card-text ">' + rd[i].f_fin + '</span>';
                    //htmlItem += '          <a href="#" class="btn btn-warning">No Asistire</a>';
                    //htmlItem += '           <div class="custom-control custom-switch">';
                    //htmlItem += '               <input type="checkbox" class="custom-control-input swichRechazar" id="customSwitch_' + i + '" \n\
                    //                                data-nagenda="' + rd[i].n_agenda + '"\n\
                    //                                 data-nano="' + rd[i].n_ano + '"\n\
                    //                            >';
                    // htmlItem += '               <label class="custom-control-label " id="label_customSwitch_' + i + '" for="customSwitch_' + i + '"  data-objagenda="' + rd[i] + '">RECHAZAR</label>';
                    // htmlItem += '           </div>';
                    //htmlItem += '   <a href="#" class="btn btn-success disabled">Asistire</a>';
                    htmlItem += '      </div>';
                    htmlItem += '  </div>';
                    htmlItem += '</div>';
                    count++;
                }




                $("#divContentAgendas").append(htmlItem);
                $(".swichRechazar").on("click", function (e) {
                    n_agenda = $(this).data("nagenda");
                    n_ano = $(this).data("nano");
                    console.log(n_agenda);
                    console.log(n_ano);
                    idElementRechazo = $(this).attr('id');
                    alertify.success("idElementRechazo " + idElementRechazo);
                    if ($(this).is(":checked") === true)
                    {
                        $("#label_" + idElementRechazo).addClass("text-rechazed");
//                        $("label").find("[for='" + idElementRechazo + "']").addClass("text-danger");
                        $("#modalRechazar").modal('show');
                    } else {
                        $("#label_" + idElementRechazo).addClass("text-rechazed");
                    }


                });
            },
            error: function (jqXHR, exception) {
                alertify.warning('error f_getListInvitados !');
            }
        });
    }

    var n_agenda = 0;
    var n_ano = 0;
    var idElementRechazo = 0;


    function f_updateAgenda() {

        var action = "ags?action=rech";
        var params = {
            n_agenda: n_agenda,
            n_ano: n_ano,
            n_persona: 1,
            n_rechazo: $(".swichRechazar").val() ? 1 : 0
        };
        $.ajax({
            url: action,
            method: 'POST',
            data: {asis: params},
            success: function (response) {
                $("#btnRecharzar").removeClass("disbled");
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
            f_updateAgenda();
        } else {
            $("#txtDescripcionRechazo").addClass('is-invalid');
        }


    });
    $("#btnCancelRecharzar").on("click", function () {

        $("#" + idElementRechazo).prop('checked', false);
        $("#label_" + idElementRechazo).removeClass("text-rechazed");
    });


});