/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Materialize */

$(document).ready(function () {


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
    $("#btnReloadCodigo").on("click", function () {
        createCaptcha();
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
        canv.width = 110;
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
            var action = "ls?action=login";
            var params = {
                username: $("#txtUsername").val(),
                clave: $("#txtClave").val()
            };
            $.ajax({
                url: action,
                method: "POST",
                data: params,
                success: function (response) {

                    if (response == "0") {
                        f_showToastMsj("Usuario o clave Incorrectos");
                        f_clearInputs();
                    } else {

                        if (response == 1 || response == "1") {
                            window.location.replace("agenda.html");
                            f_clearInputs();
                        } else {
                            f_showToastMsj("Usuario o clave Incorrectos");
                            f_clearInputs();
                        }
                    }

                },
                error: function (data) {

                    f_showToastMsj('Error de Conexión!');
                    f_clearInputs();
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
        toastr.options = {
            "timeOut": "5000",
            "closeButton": true,
        }
        toastr['error'](msj, '', {positionClass: 'toast-bottom-center'});
    }
});

