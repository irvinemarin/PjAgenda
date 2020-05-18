//function para validar campos del modal from
function validarCampos(option) {

    var camp1 = $('#text-Titulo').val();
    var camp2 = $('#text-fechaI').val();
    var camp3 = $('#text-horaI').val();
    var camp4 = $('#text-horaF').val();
    var camp5 = $('#text-invitados').val();
    var camp6 = $('#text-descripcion').val();

    var camp11 = $('#text-Titulo2').val();
    var camp22 = $('#text-fechaI2').val();
    var camp33 = $('#text-horaI2').val();
    var camp44 = $('#text-horaF2').val();
    var camp55 = $('#text-invitados2').val();
    var camp66 = $('#text-descripcion2').val();

    var x = true;
    if (option == 1) {//option validate for save-event
        if (camp1 == null || camp1.length == 0 || /^\s+$/.test(camp1)) {
            $('#text-Titulo').addClass('is-invalid');
            return false;
        } else if (camp2 == null || camp2.length == 0 || /^\s+$/.test(camp2)) {
            $('#text-Titulo').removeClass('is-invalid');
            $('#text-fechaI').addClass('is-invalid');
            return false;
        } else if (camp3 == null || camp3.length == 0 || /^\s+$/.test(camp3)) {
            $('#text-Titulo').removeClass('is-invalid');
            $('#text-fechaI').removeClass('is-invalid');
            $('#text-horaI').addClass('is-invalid');
            return false;
        } else if (camp4 == null || camp4.length == 0 || /^\s+$/.test(camp4)) {
            $('#text-Titulo').removeClass('is-invalid');
            $('#text-fechaI').removeClass('is-invalid');
            $('#text-horaI').removeClass('is-invalid');
            $('#text-horaF').addClass('is-invalid');
            return false;
        } else if (camp5 == null || camp5.length == 0 || /^\s+$/.test(camp5)) {
            $('#text-Titulo').removeClass('is-invalid');
            $('#text-fechaI').removeClass('is-invalid');
            $('#text-horaI').removeClass('is-invalid');
            $('#text-horaF').removeClass('is-invalid');
            $('#text-invitados').addClass('is-invalid');
            return false;
        } else if (camp6 == null || camp6.length == 0 || /^\s+$/.test(camp6)) {
            $('#text-Titulo').removeClass('is-invalid');
            $('#text-fechaI').removeClass('is-invalid');
            $('#text-horaI').removeClass('is-invalid');
            $('#text-horaF').removeClass('is-invalid');
            $('#text-invitados').removeClass('is-invalid');
            $('#text-descripcion').addClass('is-invalid');
            return false;
        }
    } else {//option validate for update-event
        if (camp11 == null || camp11.length == 0 || /^\s+$/.test(camp11)) {
            $('#text-Titulo2').addClass('is-invalid');
            return false;
        } else if (camp22 == null || camp22.length == 0 || /^\s+$/.test(camp22)) {
            $('#text-Titulo2').removeClass('is-invalid');
            $('#text-fechaI2').addClass('is-invalid');
            return false;
        } else if (camp33 == null || camp33.length == 0 || /^\s+$/.test(camp33)) {
            $('#text-Titulo2').removeClass('is-invalid');
            $('#text-fechaI2').removeClass('is-invalid');
            $('#text-horaI2').addClass('is-invalid');
            return false;
        } else if (camp44 == null || camp44.length == 0 || /^\s+$/.test(camp44)) {
            $('#text-Titulo2').removeClass('is-invalid');
            $('#text-fechaI2').removeClass('is-invalid');
            $('#text-horaI2').removeClass('is-invalid');
            $('#text-horaF2').addClass('is-invalid');
            return false;
        } else if (camp55 == null || camp55.length == 0 || /^\s+$/.test(camp55)) {
            $('#text-Titulo2').removeClass('is-invalid');
            $('#text-fechaI2').removeClass('is-invalid');
            $('#text-horaI2').removeClass('is-invalid');
            $('#text-horaF2').removeClass('is-invalid');
            $('#text-invitados2').addClass('is-invalid');
            return false;
        } else if (camp66 == null || camp66.length == 0 || /^\s+$/.test(camp66)) {
            $('#text-Titulo2').removeClass('is-invalid');
            $('#text-fechaI2').removeClass('is-invalid');
            $('#text-horaI2').removeClass('is-invalid');
            $('#text-horaF2').removeClass('is-invalid');
            $('#text-invitados2').removeClass('is-invalid');
            $('#text-descripcion2').addClass('is-invalid');
            return false;
        }
    }
    return x;
}

///function para datepicker y time-picker
$('.datepicker').datepicker({
    orientation: "auto",
    todayHighlight: true
}).datepicker("setDate", new Date());

//Timepicker
$('.timepicker').timepicker({
    useCurrent: false,
    format: 'HH:mm:ss',
    minuteStep: 1,
    showMeridian: false,
    disableFocus: true,
    icons: {
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down'
    }
});
$.fn.timepicker.Constructor.prototype.getTime = function () {
    if (this.hour === '') {
        return '';
    }
    return (this.hour.toString().length === 1 ? '0' + this.hour : this.hour) + ':' + (this.minute.toString().length === 1 ? '0' + this.minute : this.minute) + (this.showSeconds ? ':' + (this.second.toString().length === 1 ? '0' + this.second : this.second) : '') + (this.showMeridian ? ' ' + this.meridian : '');
};

//funtion the select-multiple para el modal-registrar
new SlimSelect({
    select: '#text-invitados'
});