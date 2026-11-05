$(document).ready(function(){

    $('#crgLiquidacion').on('click', function () {
        // si ya esta abierto no hago nada (el form ya esta en su columna, solo lo muestro)
        if ($('#colLiquidacion').toggleClass('d-none')) {
            $('#colLiquidacion').removeClass('d-none');
        }
    });

    // la cruz cierra el form de liquidacion (lo oculto y lo dejo limpio)
    $('#ctnFormularios').on('click', '#botonCerrarLiq', function () {
        $('#formLiquidacion')[0].reset();
        $('#id_empleado').val('');
        $('#listaEmpleados').addClass('d-none').empty();
        $('#colLiquidacion').addClass('d-none');
    });
    
    $('#ctnFormularios').on('click', '#botonCancelarLiq', function () {
        //limpia el formulario
        $('#formLiquidacion')[0].reset();
        // el id del empleado va en un campo oculto, y el reset no lo borra, hay que vaciarlo a mano
        // si no, quedaria guardado el empleado de antes con el buscador ya vacio
        $('#id_empleado').val('');
        // la lista de sugerencias no es un campo del form, es un div que armo yo con js, asi que tampoco la limpia el reset
        // la escondo y la vacio para que no quede una lista vieja flotando
        $('#listaEmpleados').addClass('d-none').empty();
    });

    // al tipear muestra solo los empleados que coinciden (si no hay texto no muestra nada)
    $('#ctnFormularios').on('input', '#buscadorEmpleado', function () {
        var texto = $(this).val().toLowerCase().trim();
        var coincidencias = '';
        // si cambia el texto, el empleado elegido ya no vale
        $('#id_empleado').val('');
        if (texto === '') {
            $('#listaEmpleados').addClass('d-none').empty();
            return;
        }
        //se construye el boton con los datos del emplado para poder ser integrado en el formulario
        VEMP.forEach(function (empleado) {
            if (empleado.denominacion.toLowerCase().indexOf(texto) > -1) {
                coincidencias += `<button type="button" class="list-group-item list-group-item-action" id="elegirEmpleado_${empleado.id}">${empleado.denominacion}</button>`;
            }
        });//si no existen coicidencias muestra sin resultados
        if (coincidencias === '') {
            coincidencias = '<div class="list-group-item text-secondary">Sin resultados</div>';
        }
        $('#listaEmpleados').html(coincidencias).removeClass('d-none');
    });
    
    // al tocar un empleado: el nombre va al buscador, el id al campo oculto y se esconde la lista
    $('#ctnFormularios').on('click', '[id^="elegirEmpleado_"]', function () {
        var id = this.id.replace('elegirEmpleado_', '');
        $('#id_empleado').val(id);
        $('#buscadorEmpleado').val($(this).text().trim());
        $('#listaEmpleados').addClass('d-none').empty();
    });

    // pide las liquidaciones a la api, llena el tbody de la tabla (que ya esta en el index) y la muestra
    function cargarTablaLiquidaciones() {
        $.ajax({
            url: BASE + 'liquidaciones/api',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                let filasLiquidaciones = '';
                response.liquidaciones.forEach(liquidacion => {
                    // una fila por cada liquidacion
                    filasLiquidaciones += `
                                    <tr>
                                        <td>${liquidacion.cargado_por}</td>
                                        <td>${liquidacion.empleado}</td>
                                        <td>${liquidacion.fecha_liquidacion}</td>
                                        <td>${liquidacion.fecha_vencimiento}</td>
                                        <td>$ ${liquidacion.monto}</td>
                                        <td>${liquidacion.fecha_alta}</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-sm btn-outline-primary" id="verLiquidacion_${liquidacion.id}" data-empleado="${liquidacion.empleado}" data-cargado="${liquidacion.cargado_por}" data-fecha="${liquidacion.fecha_liquidacion}" data-monto="${liquidacion.monto}" data-emitido="${liquidacion.fecha_alta}">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                });
                $('#cuerpoTablaLiq').html(filasLiquidaciones);
                // limpio el buscador asi no queda un texto viejo con las filas nuevas sin filtrar
                $('#buscadorTablaLiq').val('');
                $('#seccionTablaLiq').removeClass('d-none');
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    }

    // cuando aprieto el boton de lista de liquidaciones, la actualiza y la muestra
    $('#verListaLiquidaciones').on('click', function () {
        cargarTablaLiquidaciones();
    });

    // ojito de liquidacion: abre el modal con los datos de la liquidacion
    $('#ctnFormularios').on('click', '[id^="verLiquidacion_"]', function () {
        var id = this.id.replace('verLiquidacion_', '');
        $('#modalDetalleTitulo').html('<i class="fas fa-file-invoice-dollar"></i> Datos de la liquidación');
        $('#modalDetalleCuerpo').html(`
            <dl class="row mb-0">
                <dt class="col-sm-5">Empleado</dt>
                <dd class="col-sm-7">${$(this).data('empleado')}</dd>
                <dt class="col-sm-5">Cargado por</dt>
                <dd class="col-sm-7">${$(this).data('cargado')}</dd>
                <dt class="col-sm-5">Fecha de liquidación</dt>
                <dd class="col-sm-7">${$(this).data('fecha')}</dd>
                <dt class="col-sm-5">Monto</dt>
                <dd class="col-sm-7">$ ${$(this).data('monto')}</dd>
                <dt class="col-sm-5">Fecha emitido</dt>
                <dd class="col-sm-7">${$(this).data('emitido')}</dd>
            </dl>`);
        $('#modalDetallePie').html(`
            <button type="button" class="btn btn-outline-primary" id="editarLiquidacion" data-id="${id}">
                <i class="fas fa-pen"></i> Editar
            </button>
            <button type="button" class="btn btn-outline-danger" id="borrarLiquidacion" data-id="${id}">
                <i class="fas fa-trash"></i> Borrar
            </button>`);
        bootstrap.Modal.getOrCreateInstance($('#modalDetalle')[0]).show();
    });

    // evento de login: empleados.js avisa que hay sesion y aca abro el form y la tabla de liquidaciones
    $(document).on('sesionIniciada', function () {
        $('#colLiquidacion').removeClass('d-none');
        cargarTablaLiquidaciones();
    });
});