/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Materialize */

$(document).ready(function () {
    $('.modal').modal();
    $('.modal').modal({
        dismissible: false // Modal can be dismissed by clicking outside of the modal
    });
    $("#div_sistemasList").empty();
    $("#btnClear").on('click', function (e) {
        f_showToastMsj("Limpiando Datos");
        createCaptcha();
    });
    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            f_showToastMsj("Verificando Datos");
        }
    });
    var code;
    var errors = 0;
    $("#btnSingIn").on("click", function () {

        validateCaptcha();
    });
    createCaptcha();
    function createCaptcha() {
        //clear the contents of captcha div first 
        document.getElementById('captcha').innerHTML = "";
        var charsArray =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lengthOtp = 6;
        var captcha = [];
        for (var i = 0; i < lengthOtp; i++) {
            //below code will not allow Repetition of Characters
            var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
            if (captcha.indexOf(charsArray[index]) == -1)
                captcha.push(charsArray[index]);
            else
                i--;
        }
        var canv = document.createElement("canvas");
        canv.id = "captcha";
        canv.width = 100;
        canv.height = 50;
        var ctx = canv.getContext("2d");
        ctx.font = "25px Georgia";
        ctx.strokeStyle = "green";
        ctx.strokeText(captcha.join(""), 0, 30);
        //storing captcha so that can validate you can save it somewhere else according to your specific requirements
        code = captcha.join("");
        document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
    }
    function validateCaptcha() {
        event.preventDefault();
        if (document.getElementById("txtCaptcha").value == code) {
            f_singIng();
        } else {
            f_showToastMsj("Error Codigo Captcha. Intenente Otra vez");
            createCaptcha();
        }
    }

    function f_singIng() {
        errors = 0;
        f_validateInput("#txtUsername", 1);
        f_validateInput("#txtClave", 2);
        if (errors == 0) {
//            f_showToastMsj("Datos Correctos");
            var url = "http://" + UrlGlobal + "/" + NameServerRest + "/webresources/security.login/validate/" + $("#txtUsername").val() + "_" + $("#txtClave").val();
            var params = {

            };
            $.ajax({
                url: url,
                type: "POST",
                contentType: 'application/json',
                dataType: "json",
                headers: {
                    "authorization": keyApi
                },
                data: JSON.stringify(params),
                processData: false,
                success: function (response) {

                    if (response == "-2") {
                        f_showToastMsj("Usuario o clave Incorrectos");
                        f_clearInputs();
                    } else {
                        $("#modal1").modal('open');
                        f_showToastMsj("response " + response);
                        var rd = response;
                        var html = "";
                        $("#div_sistemasList").empty();
                        for (var i in rd) {

                            html += '<li class="collection-item avatar"' +
                                    'data-url_sistema= "' + rd[i].referencia + '"  ' +
                                    'data-nombre_perfil= "' + rd[i].nombrePerfil + '"  ' +
                                    'data-nombre_sistema="' + rd[i].nombre + '" > ' +
                                    '<i class="material-icons circle green">assessment</i>' +
                                    '<span class="title">' + rd[i].nombre + '</span>' +
                                    '<p>' + rd[i].descripcion + '<br> </p>' +
                                    '<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>' +
                                    '</li>';
                        }
                        $("#div_sistemasList").append(html);
                        sessionStorage.setItem('username', $("#txtUsername").val());
                        console.log("username storage : " + sessionStorage.getItem("username"))
                        debugger;
                        $("#div_sistemasList li").on("click", function () {
                            var url = $(this).data('url_sistema');
                            var nombreSistema = $(this).data('nombre_sistema');
                            var nombrePerfil = $(this).data('nombre_perfil');
                            sessionStorage.setItem('nombreSistema', nombreSistema);
                            sessionStorage.setItem('nombrePerfil', nombrePerfil);
                            window.location.href = "main.html";
                        });
                        f_clearInputs();
                    }

                },
                error: function (data) {

                    f_showToastMsj('Error de Conexión!');
                }
            });
        }
    }

    $('#txtUsername').keyup(function () {
        this.value = this.value.toLocaleUpperCase();
    });

    function  f_clearInputs() {
        $("#txtUsername").val("");
        $("#txtClave").val("");
        $("#txtCaptcha").val("");
        createCaptcha();
    }

    function f_validateInput(idInput, txtOrder) {
        if ($(idInput).val() == "") {
            errors++;
            switch (txtOrder) {
                case 1:
                    f_showToastMsj("Ingrese El Usuario");
                    break;
                case 2:
                    f_showToastMsj("Ingrese La Clave");
                    break;
                default:

                    break;
            }
        }

    }
    function f_showToastMsj(msj) {
        Materialize.toast(msj, 6000);
    }
});

