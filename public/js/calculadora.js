$(document).ready(function(){
    //------------------------------------------------------------------------------------------------//
    //acá está la calculadora de sueldo: por hora o por dia
    //acá cambio los textos de los campos según el tipo de cálculo elegido
    //cambia los textos de los campos segun el tipo de calculo elegido
    function actualizarTextosCalc(){
        //si está elegido "por hora"
        if ($('#tipoHora').is(':checked')){
            $('#textoValorCalc').text('Valor por hora');
            $('#textoCantidadCalc').text('Cantidad de horas');
        //si está elegido "por día"
        }else{
            $('#textoValorCalc').text('Valor por día');
            $('#textoCantidadCalc').text('Cantidad de días');
        }
    }
    //acá están los botones de elegir el tipo de cálculo
    //al cambiar de tipo actualizamos los textos y sacamos el resultado anterior
    //opción por hora
    $('#tipoHora').on('change', function(){
        actualizarTextosCalc();
        $('#resultadoCalc').addClass('d-none');//escondo el resultado anterior
    });
    //opción por día
    $('#tipoDia').on('change', function(){
        actualizarTextosCalc();
        $('#resultadoCalc').addClass('d-none');//escondo el resultado anterior
    });
    //------------------------------------------------------------------------------------------------//
    //acá está el botón de calcular
    //boton calcular: multiplica el valor por la cantidad y muestra el total
    $('#btnCalcularSueldo').on('click', function(){
        //acá tomo los datos que cargó el usuario
        const valor = parseFloat($('#valorCalc').val());
        const cantidad = parseFloat($('#cantidadCalc').val());
        $('#resultadoCalc').removeClass('d-none alert-success alert-warning');//saca lo anterior
        //si falta algun dato o no es mayor a cero avisamos
        if (isNaN(valor) || isNaN(cantidad) || valor <= 0 || cantidad <= 0){
            $('#resultadoCalc').addClass('alert-warning');
            $('#resultadoCalc').text('Completá el valor y la cantidad con números mayores a cero');
        //si están bien los datos calculo el total
        }else{
            //acá se calcula el sueldo
            const total = valor * cantidad;
            //acá doy formato al total
            //formato argentino con dos decimales
            const totalTexto = total.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            //acá muestro el resultado
            $('#resultadoCalc').addClass('alert-success');
            $('#resultadoCalc').text('Sueldo total: $ ' + totalTexto);
        }
    });
    //------------------------------------------------------------------------------------------------//
    //acá se limpia el modal al cerrarlo
    //al cerrar el modal dejamos todo limpio y en "por hora"
    $('#modalCalculo').on('hidden.bs.modal', function(){
        $('#tipoHora').prop('checked', true);//vuelve a "por hora"
        $('#valorCalc').val('');//limpio el valor
        $('#cantidadCalc').val('');//limpio la cantidad
        $('#resultadoCalc').addClass('d-none');//escondo el resultado
        actualizarTextosCalc();//vuelvo a poner los textos de "por hora"
    });
});