$(document).ready(function(){
    //------------------------------------------------------------------------------------------------//
    //calculadora de sueldo: por hora o por dia
    //cambia los textos de los campos segun el tipo de calculo elegido
    function actualizarTextosCalc(){
        if ($('#tipoHora').is(':checked')){
            $('#textoValorCalc').text('Valor por hora');
            $('#textoCantidadCalc').text('Cantidad de horas');
        }else{
            $('#textoValorCalc').text('Valor por día');
            $('#textoCantidadCalc').text('Cantidad de días');
        }
    }
    //al cambiar de tipo actualizamos los textos y sacamos el resultado anterior
    $('#tipoHora').on('change', function(){
        actualizarTextosCalc();
        $('#resultadoCalc').addClass('d-none');
    });
    $('#tipoDia').on('change', function(){
        actualizarTextosCalc();
        $('#resultadoCalc').addClass('d-none');
    });
    //------------------------------------------------------------------------------------------------//
    //boton calcular: multiplica el valor por la cantidad y muestra el total
    $('#btnCalcularSueldo').on('click', function(){
        const valor = parseFloat($('#valorCalc').val());
        const cantidad = parseFloat($('#cantidadCalc').val());
        $('#resultadoCalc').removeClass('d-none alert-success alert-warning');//saca lo anterior
        //si falta algun dato o no es mayor a cero avisamos
        if (isNaN(valor) || isNaN(cantidad) || valor <= 0 || cantidad <= 0){
            $('#resultadoCalc').addClass('alert-warning');
            $('#resultadoCalc').text('Completá el valor y la cantidad con números mayores a cero');
        }else{
            const total = valor * cantidad;
            //formato argentino con dos decimales
            const totalTexto = total.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            $('#resultadoCalc').addClass('alert-success');
            $('#resultadoCalc').text('Sueldo total: $ ' + totalTexto);
        }
    });
    //------------------------------------------------------------------------------------------------//
    //al cerrar el modal dejamos todo limpio y en "por hora"
    $('#modalCalculo').on('hidden.bs.modal', function(){
        $('#tipoHora').prop('checked', true);
        $('#valorCalc').val('');
        $('#cantidadCalc').val('');
        $('#resultadoCalc').addClass('d-none');
        actualizarTextosCalc();
    });
});