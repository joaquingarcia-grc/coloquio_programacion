$(document).ready(function(){
    let idABorrar;//id de la liquidacion que se va a borrar
    let idARecuperar;//id de la liquidacion que se va a recuperar
    let idActualizar;
    //------------------------------------------------------------------------------------------------//
    //mensaje simple de aviso, tipo: 'success', 'warning' o 'error'
    function mensajes(texto, tipo){
        $('#mensaje').removeClass('d-none alert-success alert-warning alert-danger');//saca lo anterior
        if (tipo === 'success'){
            $('#mensaje').addClass('alert-success');
        }else if (tipo === 'warning'){
            $('#mensaje').addClass('alert-warning');
        }else{
            $('#mensaje').addClass('alert-danger');
        }
        $('#mensaje').text(texto);
        setTimeout(function(){
            $('#mensaje').addClass('d-none');//lo oculta a los 2 segundos
        }, 2000);
    }
    //------------------------------------------------------------------------------------------------//
    //rellenamos la lista del buscador de empleados recorriendo VEMP (viene del index), las coincidencias aparecen al tipear
    let opcionesEmpleados = '';
    VEMP.forEach(emp => {
        opcionesEmpleados += `<option value="${emp.denominacion}"></option>`;
    });
    $('#listaEmpleadosLiq').html(opcionesEmpleados);

    //busca en VEMP el id del empleado que se tipeo, si no coincide con ninguno devuelve vacio
    function buscarIdEmpleado(nombre){
        let idEncontrado = '';
        VEMP.forEach(emp => {
            if (emp.denominacion === nombre){
                idEncontrado = emp.id;
            }
        });
        return idEncontrado;
    }

    //al tipear el empleado guardamos su id en el hidden (formulario de cargar)
    $('#empleadoLiq').on('input', function(){
        $('#idEmpleadoLiq').val(buscarIdEmpleado($(this).val()));
    });
    //lo mismo para el formulario de editar
    $('#editEmpleadoLiq').on('input', function(){
        $('#editIdEmpleadoLiq').val(buscarIdEmpleado($(this).val()));
    });
    //------------------------------------------------------------------------------------------------//
    cargarTablaLiquidaciones();
    //esta funcion rellena la tabla de liquidaciones
    function cargarTablaLiquidaciones(){
        $.ajax({
            url: BASE + 'liquidaciones/api',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                // si ya estaba armada la destruyo para que tome la config nueva
                if ($.fn.DataTable.isDataTable('#tablaDatosLiq')) {
                    $('#tablaDatosLiq').DataTable().destroy();
                }
                let filasLiquidaciones = '';
                response.liquidaciones.forEach(liquidacion => {
                    // una fila por cada liquidacion
                    filasLiquidaciones += `
                                    <tr>
                                        <td>${liquidacion.empleado}</td>
                                        <td>${liquidacion.fecha_vencimiento}</td>
                                        <td>${liquidacion.monto}</td>
                                        <td>${liquidacion.fecha_alta}</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-sm btn-outline-primary" id="verLiquidacion_${liquidacion.id}" data-id="${liquidacion.id}" data-empleado="${liquidacion.empleado}" data-id-empleado="${liquidacion.id_empleado}" data-vencimiento="${liquidacion.fecha_vencimiento}" data-monto="${liquidacion.monto}" data-emitido="${liquidacion.fecha_alta}">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                });
                $('#cuerpoTablaLiq').html(filasLiquidaciones);
                // ACÁ va el bloque de layout
                $('#tablaDatosLiq').DataTable({
                    language: {
                        url: 'https://cdn.datatables.net/plug-ins/2.1.7/i18n/es-ES.json'
                    },
                    layout: {
                        topStart: null,
                        topEnd: null,
                        bottomStart: 'info',
                        bottomEnd: 'paging',
                        bottom1Start: {
                            buttons: [ 
                                { 
                                    extend: 'excelHtml5',
                                    text:'excel',
                                    titleAttr:'formato exel'
                                },{ 
                                    extend: 'pdfHtml5',
                                    text:'pdf',
                                    titleAttr:'formato pdf'
                                },{
                                    extend: 'copyHtml5',
                                    text:'copiar',
                                    titleAttr:'formato texto plano'
                                },{
                                    extend: 'print',
                                    text: 'imprimir <i class="bi bi-printer-fill"></i>',
                                    titleAttr: 'imprimir tabla'
                                },{   
                                    text: '<i class="fas fa-trash"></i>',
                                    titleAttr: 'Papelera',
                                    action: function () {
                                        window.location.href = BASE + 'liquidaciones/papelera';
                                    }
                                }]
                        }
                    },
                    order: [[0, 'desc']]
                });

                $("#buscadorLiq").on('keyup', function(){
                    $('#tablaDatosLiq').DataTable().search(this.value).draw();
                });
            },
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    };
    //------------------------------------------------------------------------------------------------//
    cargarTablaPapeleraLiq();
    //esta funcion rellena la tabla de la papelera
    function cargarTablaPapeleraLiq(){
        //pedimos el listado de liquidaciones borradas
        $.ajax({
            url: BASE + 'liquidaciones/api2',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                // si ya estaba armada la destruyo para que tome la config nueva
                if ($.fn.DataTable.isDataTable('#tablaDatosPapLiq')) {
                    $('#tablaDatosPapLiq').DataTable().destroy();
                }
                //armamos las filas de las liquidaciones borradas
                let filasPapelera = '';
                response.liquidaciones.forEach(liquidacion => {
                    // una fila por cada liquidacion borrada
                    filasPapelera += `
                                    <tr>
                                        <td>${liquidacion.empleado}</td>
                                        <td>${liquidacion.fecha_vencimiento}</td>
                                        <td>${liquidacion.monto}</td>
                                        <td>${liquidacion.fecha_alta}</td>
                                        <td class="text-end">
                                            <!-- boton recuperar -->
                                            <button type="button" class="btn btn-sm btn-info" id="btnRecuperarLIQ" data-id="${liquidacion.id}">
                                                <i class="fas fa-recycle"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                });
                //metemos las filas en el tbody de la papelera
                $('#cuerpoTablaPapLiq').html(filasPapelera);
                // ACÁ va el bloque de layout
                //DataTable de la papelera, misma config que la otra pero sin boton de papelera
                $('#tablaDatosPapLiq').DataTable({
                    language: {
                        url: 'https://cdn.datatables.net/plug-ins/2.1.7/i18n/es-ES.json'
                    },
                    layout: {
                        topStart: null,
                        topEnd: null,
                        bottomStart: 'info',
                        bottomEnd: 'paging',
                        bottom1Start: {
                            buttons: [ 
                                { 
                                    extend: 'excelHtml5',
                                    text:'excel',
                                    titleAttr:'formato exel'
                                },{ 
                                    extend: 'pdfHtml5',
                                    text:'pdf',
                                    titleAttr:'formato pdf'
                                },{
                                    extend: 'copyHtml5',
                                    text:'copiar',
                                    titleAttr:'formato texto plano'
                                },{
                                    extend: 'csvHtml5',
                                    text:'csv',
                                    titleAttr:'formato planilla'
                                },{
                                    extend: 'print',
                                    text: 'imprimir <i class="bi bi-printer-fill"></i>',
                                    titleAttr: 'imprimir tabla'
                                }]
                        }
                    },
                    order: [[0, 'desc']]
                });

                //buscador de la papelera
                $("#buscadorPapLiq").on('keyup', function(){
                    $('#tablaDatosPapLiq').DataTable().search(this.value).draw();
                });
            },
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    };

    //los datos seran enviado una ves obtengamos la accion desde el boton del modal
    $('#formLiquidacion').on('submit', function(e){
        e.preventDefault();//detiene el envio normal del formulario
        const dato = {//creamos un objeto con todos nuestros datos
            id_empleado: $('#idEmpleadoLiq').val(),
            fecha_vencimiento: $('#fechaVencimiento').val(),
            monto: $('#monto').val()
        }   
        $.ajax({
            url: BASE + 'liquidaciones/insertar',
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function(response){
                if (response.exito){
                    mensajes(response.mensaje,'success');
                    $('#formLiquidacion')[0].reset();
                    $('#idEmpleadoLiq').val('');//el reset no limpia el hidden
                    $('#modalLiquidacion').modal('hide');//ocultamos el modal de guardar
                    $('#tablaDatosLiq').DataTable().destroy();
                    cargarTablaLiquidaciones();
                }else if (response.papelera){
                    mensajes('Aviso: ' + response.mensaje, 'warning');
                }else{
                    mensajes('Error: ' + response.mensaje, 'error');
                }
            },
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    });
    //------------------------------------------------------------------------------------------------//
    //el ojito abre el modal con los datos de la liquidacion (los toma del boton, que vienen de la base)
    $('#cuerpoTablaLiq').on('click', 'button[id^="verLiquidacion_"]', function(){
        const boton = $(this);
        $('#idLiquidacionVer').val(boton.data('id'));//id de la liquidacion, queda guardado en el modal
        $('#botonEliminarLiq').data('id', boton.data('id'));//el tachito lleva el id para el borrado
        $('#formEditarLiq').data('id', boton.data('id'));//el formulario de editar lleva el id para el actualizado
        //vista de solo lectura
        $('#verEmpleadoLiq').text(boton.attr('data-empleado'));
        $('#verVencimiento').text(boton.attr('data-vencimiento'));
        $('#verMonto').text(boton.attr('data-monto'));
        $('#verEmitido').text(boton.attr('data-emitido'));
        //formulario de edicion con los mismos datos
        $('#editEmpleadoLiq').val(boton.attr('data-empleado'));
        $('#editIdEmpleadoLiq').val(boton.attr('data-id-empleado'));
        $('#editFechaVencimiento').val(boton.attr('data-vencimiento'));
        $('#editMonto').val(boton.attr('data-monto'));
        //siempre abre en la vista de solo lectura
        $('#formEditarLiq').addClass('d-none');
        $('#vistaDatosLiq').removeClass('d-none');
        $('#modalVerLiquidacion').modal('show');
    });

    //el lapiz convierte los datos en formulario
    $('#botonEditarLiq').on('click', function(){
        $('#vistaDatosLiq').addClass('d-none');
        $('#formEditarLiq').removeClass('d-none');
    });

    //cancelar vuelve a la vista y deja los campos como estaban
    $('#botonCancelarEdicionLiq').on('click', function(){
        $('#editEmpleadoLiq').val($('#verEmpleadoLiq').text());
        $('#editIdEmpleadoLiq').val(buscarIdEmpleado($('#verEmpleadoLiq').text()));
        $('#editFechaVencimiento').val($('#verVencimiento').text());
        $('#editMonto').val($('#verMonto').text());
        $('#formEditarLiq').addClass('d-none');
        $('#vistaDatosLiq').removeClass('d-none');
    });
    //------------------------------------------------------------------------------------------------//
    //la impresora abre una ventana con los datos de esta liquidacion y manda a imprimir
    $('#botonImprimirLiq').on('click', function(){
        //los datos los tomamos de la vista de solo lectura, pasados por .text() para que no se rompa el html si traen simbolos raros
        const empleado = $('<div>').text($('#verEmpleadoLiq').text()).html();
        const vencimiento = $('<div>').text($('#verVencimiento').text()).html();
        const monto = $('<div>').text($('#verMonto').text()).html();
        const emitido = $('<div>').text($('#verEmitido').text()).html();
        const ventana = window.open('', '_blank');
        ventana.document.write(`
            <html>
                <head>
                    <title>Datos de la liquidación</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 30px; }
                        h2 { margin-bottom: 20px; }
                        p { font-size: 16px; margin: 8px 0; }
                    </style>
                </head>
                <body>
                    <h2>Datos de la liquidación</h2>
                    <p><strong>Empleado:</strong> ${empleado}</p>
                    <p><strong>Fecha de vencimiento:</strong> ${vencimiento}</p>
                    <p><strong>Monto:</strong> ${monto}</p>
                    <p><strong>Fecha emitido:</strong> ${emitido}</p>
                </body>
            </html>`);
        ventana.document.close();
        ventana.focus();
        ventana.print();
        ventana.close();
    });
    //------------------------------------------------------------------------------------------------//
    //formulario de editar: al enviarlo mandamos los datos nuevos al controlador
    $('#formEditarLiq').on('submit', function(e){
        e.preventDefault();//detiene el envio normal del formulario
        let idActualizar = $(this).data('id');//el id viaja en la url, lo dejamos guardado al abrir el ojito
        const dato = {//objeto con los datos nuevos
            id_empleado: $('#editIdEmpleadoLiq').val(),
            fecha_vencimiento: $('#editFechaVencimiento').val(),
            monto: $('#editMonto').val()
        }
        $.ajax({
            url: BASE + 'liquidaciones/actualizar/' + idActualizar,
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function(response){
                //se actualizo: cerramos modal, avisamos y recargamos la tabla
                if (response.exito){
                    $('#modalVerLiquidacion').modal('hide');
                    mensajes(response.mensaje, 'success');
                    $('#tablaDatosLiq').DataTable().destroy();
                    cargarTablaLiquidaciones();
                //repetido en la papelera
                }else if (response.papelera){
                    mensajes('Aviso: ' + response.mensaje, 'warning');
                //otro error
                }else{
                    mensajes('Error: ' + response.mensaje, 'error');
                }
            },
            error: function() {
                mensajes('Error en el servidor', 'error');
            }
        });
    });
    //------------------------------------------------------------------------------------------------//
    //funcion que borra las liquidaciones
    //al tocar el tachito guardamos el id, cerramos el modal de ver y abrimos el modal de confirmacion
    $(document).on('click', '#botonEliminarLiq', function(){
        idABorrar = $(this).data('id');
        //esperamos a que se cierre el de ver para abrir el otro, si no se pisan los modales
        $('#modalVerLiquidacion').one('hidden.bs.modal', function(){
            $('#modalBorradoLIQ').modal('show');
        });
        $('#modalVerLiquidacion').modal('hide');
    });

    //al confirmar en el modal mandamos el borrado al controlador
    $('#btnBorradoLIQ').click(function(){
        $.ajax({
            url: BASE + 'liquidaciones/borrar/' + idABorrar,
            method: 'POST',
            dataType: 'json',
            success: function(response){
                //se borro: cerramos modal, avisamos y recargamos la tabla
                if (response.exito){
                    $('#modalBorradoLIQ').modal('hide');
                    mensajes(response.mensaje, 'success');
                    $('#tablaDatosLiq').DataTable().destroy();
                    cargarTablaLiquidaciones();
                //no se pudo borrar: cerramos modal y mostramos el error
                }else{
                    $('#modalBorradoLIQ').modal('hide');
                    mensajes(response.mensaje, 'error');
                }
            },
            //fallo la peticion en si
            error: function() {
                $('#modalBorradoLIQ').modal('hide');
                mensajes('Error en el servidor', 'error'); 
            }
        });
    });
    //------------------------------------------------------------------------------------------------//
    //boton recuperar de la papelera: guardamos el id y mandamos la recuperacion
    $(document).on('click', '#btnRecuperarLIQ', function(){
        idARecuperar = $(this).data('id');
        $.ajax({
            url: BASE + 'liquidaciones/recuperacion/' + idARecuperar,
            method: 'POST',
            dataType: 'json',
            success: function(response) {
                //se recupero: avisamos y recargamos la tabla de la papelera
                if(response.exito){
                    mensajes(response.mensaje, 'success');
                    $('#tablaDatosPapLiq').DataTable().destroy();
                    cargarTablaPapeleraLiq();

                //no es el dueño: avisamos y recargamos igual
                }else{
                    mensajes('Aviso: ' + response.mensaje, 'warning');
                    $('#tablaDatosPapLiq').DataTable().destroy();
                    cargarTablaPapeleraLiq();
                }
            },
            error: function() {
                mensajes('Error en el servidor','error'); 
            }
        });
    });
});