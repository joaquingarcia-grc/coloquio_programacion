$(document).ready(function(){
    //------------------------------------------------------------------------------------------------//
    //variables que guardan ids
    let idABorrar;//id de la liquidacion que se va a borrar
    let idARecuperar;//id de la liquidacion que se va a recuperar
    let idActualizar;//id de la liquidacion que se va a actualizar
    //------------------------------------------------------------------------------------------------//
    //acá están los mensajes de aviso
    //mensaje simple de aviso, tipo: 'success', 'warning' o 'error'
    function mensajes(texto, tipo){
        $('#mensaje').removeClass('d-none alert-success alert-warning alert-danger');//saca lo anterior
        //acá elijo el color según el tipo
        if (tipo === 'success'){
            $('#mensaje').addClass('alert-success');
        }else if (tipo === 'warning'){
            $('#mensaje').addClass('alert-warning');
        }else{
            $('#mensaje').addClass('alert-danger');
        }
        $('#mensaje').text(texto);//acá pongo el texto del aviso
        setTimeout(function(){
            $('#mensaje').addClass('d-none');//lo oculta a los 2 segundos
        }, 2000);
    }
    //------------------------------------------------------------------------------------------------//
    //acá está el buscador de empleados (lista que aparece al tipear)
    //rellenamos la lista del buscador de empleados recorriendo VEMP (viene del index), las coincidencias aparecen al tipear
    let opcionesEmpleados = '';
    VEMP.forEach(emp => {
        opcionesEmpleados += `<option value="${emp.denominacion}"></option>`;
    });
    $('#listaEmpleadosLiq').html(opcionesEmpleados);
    //acá busco el id del empleado que se tipeó
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
    //acá guardo el id en el hidden del formulario de cargar
    //al tipear el empleado guardamos su id en el hidden (formulario de cargar)
    $('#empleadoLiq').on('input', function(){
        $('#idEmpleadoLiq').val(buscarIdEmpleado($(this).val()));
    });
    //acá guardo el id en el hidden del formulario de editar
    //lo mismo para el formulario de editar
    $('#editEmpleadoLiq').on('input', function(){
        $('#editIdEmpleadoLiq').val(buscarIdEmpleado($(this).val()));
    });
    //------------------------------------------------------------------------------------------------//
    //acá llamo a la tabla de liquidaciones para que cargue al abrir la página
    cargarTablaLiquidaciones();
    //acá creo la tabla de liquidaciones
    //esta funcion rellena la tabla de liquidaciones
    function cargarTablaLiquidaciones(){
        //acá pido las liquidaciones al controlador
        $.ajax({
            url: BASE + 'liquidaciones/api',
            method: 'GET',
            dataType: 'json',
            //si sale bien armo la tabla
            success: function(response) {
                //acá se juntan las filas de la tabla
                let filasLiquidaciones = '';
                //acá recorro las liquidaciones y armo las filas
                response.liquidaciones.forEach(liquidacion => {
                    // una fila por cada liquidacion
                    filasLiquidaciones += `
                                    <tr>
                                        <td>${liquidacion.empleado}</td>
                                        <td>${liquidacion.fecha_vencimiento}</td>
                                        <td>${liquidacion.monto}</td>
                                        <td>${liquidacion.fecha_alta}</td>
                                        <td class="text-end">
                                            <!-- botón ojito, lleva los datos de la liquidación -->
                                            <button type="button" class="btn btn-sm btn-outline-primary" id="verLiquidacion_${liquidacion.id}" data-id="${liquidacion.id}" data-empleado="${liquidacion.empleado}" data-id-empleado="${liquidacion.id_empleado}" data-vencimiento="${liquidacion.fecha_vencimiento}" data-monto="${liquidacion.monto}" data-emitido="${liquidacion.fecha_alta}">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                });
                //acá meto las filas en el tbody de la tabla
                $('#cuerpoTablaLiq').html(filasLiquidaciones);
                // ACÁ va el bloque de layout
                //acá se activa el DataTable (paginado, info, orden y botones)
                $('#tablaDatosLiq').DataTable({
                    //acá va el idioma en español
                    language: {
                        url: 'https://cdn.datatables.net/plug-ins/2.1.7/i18n/es-ES.json'
                    },
                    //acá se acomodan las cosas de la tabla (arriba nada, abajo info, paginado y botones)
                    layout: {
                        topStart: null,//arriba izquierda: nada
                        topEnd: null,//arriba derecha: nada (el buscador es el mío)
                        bottomStart: 'info',//abajo izquierda: info de la tabla
                        bottomEnd: 'paging',//abajo derecha: paginado
                        //acá van los botones de exportar y la papelera
                        bottom1Start: {
                            buttons: [ 
                                //botón excel
                                { 
                                    extend: 'excelHtml5',
                                    text:'excel',
                                    titleAttr:'formato exel'
                                },
                                //botón pdf
                                { 
                                    extend: 'pdfHtml5',
                                    text:'pdf',
                                    titleAttr:'formato pdf'
                                },
                                //botón copiar
                                {
                                    extend: 'copyHtml5',
                                    text:'copiar',
                                    titleAttr:'formato texto plano'
                                },
                                //botón imprimir
                                {
                                    extend: 'print',
                                    text: 'imprimir <i class="bi bi-printer-fill"></i>',
                                    titleAttr: 'imprimir tabla'
                                },
                                //botón papelera, te lleva a la página de la papelera
                                {   
                                    text: '<i class="fas fa-trash"></i>',
                                    titleAttr: 'Papelera',
                                    action: function () {
                                        window.location.href = BASE + 'liquidaciones/papelera';
                                    }
                                }]//https://datatables.net/examples/buttons/html5/simple.html url de referencias
                        }
                    },
                    //acá se ordena por la primera columna
                    order: [[0, 'desc']]
                });
                //acá está el buscador de la tabla de liquidaciones
                $("#buscadorLiq").on('keyup', function(){
                    $('#tablaDatosLiq').DataTable().search(this.value).draw();
                });
            },
            //si falla la petición avisa
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    };
    //------------------------------------------------------------------------------------------------//
    //acá llamo a la tabla de la papelera para que cargue al abrir la página
    cargarTablaPapeleraLiq();
    //acá creo la tabla de la papelera
    //esta funcion rellena la tabla de la papelera
    function cargarTablaPapeleraLiq(){
        //pedimos el listado de liquidaciones borradas
        $.ajax({
            url: BASE + 'liquidaciones/api2',
            method: 'GET',
            dataType: 'json',
            //si sale bien armo la tabla
            success: function(response) {
                //armamos las filas de las liquidaciones borradas
                let filasPapelera = '';
                //acá recorro las liquidaciones borradas y armo las filas
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
                    //acá va el idioma en español
                    language: {
                        url: 'https://cdn.datatables.net/plug-ins/2.1.7/i18n/es-ES.json'
                    },
                    //acá se acomodan las cosas de la tabla (arriba nada, abajo info, paginado y botones)
                    layout: {
                        topStart: null,//arriba izquierda: nada
                        topEnd: null,//arriba derecha: nada (el buscador es el mío)
                        bottomStart: 'info',//abajo izquierda: info de la tabla
                        bottomEnd: 'paging',//abajo derecha: paginado
                        //acá van los botones de exportar
                        bottom1Start: {
                            buttons: [ 
                                //botón excel
                                { 
                                    extend: 'excelHtml5',
                                    text:'excel',
                                    titleAttr:'formato exel'
                                },
                                //botón pdf
                                { 
                                    extend: 'pdfHtml5',
                                    text:'pdf',
                                    titleAttr:'formato pdf'
                                },
                                //botón copiar
                                {
                                    extend: 'copyHtml5',
                                    text:'copiar',
                                    titleAttr:'formato texto plano'
                                },
                                //botón csv
                                {
                                    extend: 'csvHtml5',
                                    text:'csv',
                                    titleAttr:'formato planilla'
                                },
                                //botón imprimir
                                {
                                    extend: 'print',
                                    text: 'imprimir <i class="bi bi-printer-fill"></i>',
                                    titleAttr: 'imprimir tabla'
                                }]
                        }
                    },
                    //acá se ordena por la primera columna
                    order: [[0, 'desc']]
                });
                //buscador de la papelera
                $("#buscadorPapLiq").on('keyup', function(){
                    $('#tablaDatosPapLiq').DataTable().search(this.value).draw();
                });
            },
            //si falla la petición avisa
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    };
    //------------------------------------------------------------------------------------------------//
    //acá está el modal de cargar una liquidación
    //el boton cancelar limpia el formulario y cierra el modal de cargar
    $('#botonCancelarLiq').on('click', function(){
        $('#formLiquidacion')[0].reset();
        $('#idEmpleadoLiq').val('');//el reset no limpia el hidden  
    });
    //acá se guarda una liquidación nueva
    //los datos seran enviado una ves obtengamos la accion desde el boton del modal
    $('#formLiquidacion').on('submit', function(e){
        e.preventDefault();//detiene el envio normal del formulario
        //acá junto los datos del formulario
        const dato = {//creamos un objeto con todos nuestros datos
            id_empleado: $('#idEmpleadoLiq').val(),
            fecha_vencimiento: $('#fechaVencimiento').val(),
            monto: $('#monto').val()
        }   
        //acá mando los datos al controlador
        $.ajax({
            url: BASE + 'liquidaciones/insertar',
            method: 'POST',
            data: dato,
            dataType: 'json',
            //acá veo qué respondió el controlador
            success: function(response){
                //se guardó: aviso, limpio el form, cierro el modal y recargo la tabla
                if (response.exito){
                    mensajes(response.mensaje,'success');
                    $('#formLiquidacion')[0].reset();
                    $('#idEmpleadoLiq').val('');//el reset no limpia el hidden
                    $('#tablaDatosLiq').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
                    cargarTablaLiquidaciones();
                //ya existe y está en la papelera
                }else if (response.papelera){
                    mensajes('Aviso: ' + response.mensaje, 'warning');
                //otro error
                }else{
                    mensajes('Error: ' + response.mensaje, 'error');
                }
            },
            //si falla la petición avisa
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    });
    //------------------------------------------------------------------------------------------------//
    //acá está el modal de ver la liquidación (ojito)
    //el ojito abre el modal con los datos de la liquidacion (los toma del boton, que vienen de la base)
    $('#cuerpoTablaLiq').on('click', 'button[id^="verLiquidacion_"]', function(){
        const boton = $(this);//el botón ojito que se tocó
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
        $('#modalVerLiquidacion').modal('show');//acá se abre el modal
    });
    //acá está el lapiz de editar
    //el lapiz convierte los datos en formulario
    $('#botonEditarLiq').on('click', function(){
        $('#vistaDatosLiq').addClass('d-none');//escondo la vista de solo lectura
        $('#formEditarLiq').removeClass('d-none');//muestro el formulario de editar
    });
    //acá está el cancelar de la edición
    //cancelar vuelve a la vista y deja los campos como estaban
    $('#botonCancelarEdicionLiq').on('click', function(){
        //acá dejo los campos como estaban
        $('#editEmpleadoLiq').val($('#verEmpleadoLiq').text());
        $('#editIdEmpleadoLiq').val(buscarIdEmpleado($('#verEmpleadoLiq').text()));
        $('#editFechaVencimiento').val($('#verVencimiento').text());
        $('#editMonto').val($('#verMonto').text());
        //acá vuelvo a la vista de solo lectura
        $('#formEditarLiq').addClass('d-none');
        $('#vistaDatosLiq').removeClass('d-none');
    });
    //------------------------------------------------------------------------------------------------//
    //acá está la impresora del modal
    //la impresora abre una ventana con los datos de esta liquidacion y manda a imprimir
    $('#botonImprimirLiq').on('click', function(){
        //los datos los tomamos de la vista de solo lectura, pasados por .text() para que no se rompa el html si traen simbolos raros
        const empleado = $('<div>').text($('#verEmpleadoLiq').text()).html();
        const vencimiento = $('<div>').text($('#verVencimiento').text()).html();
        const monto = $('<div>').text($('#verMonto').text()).html();
        const emitido = $('<div>').text($('#verEmitido').text()).html();
        const ventana = window.open('', '_blank');//ventana nueva para imprimir
        //acá armo la hoja que se imprime
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
        ventana.print();//manda a imprimir
        ventana.close();//cierra la ventana
    });
    //------------------------------------------------------------------------------------------------//
    //acá se actualiza una liquidación
    //formulario de editar: al enviarlo mandamos los datos nuevos al controlador
    $('#formEditarLiq').on('submit', function(e){
        e.preventDefault();//detiene el envio normal del formulario
        let idActualizar = $(this).data('id');//el id viaja en la url, lo dejamos guardado al abrir el ojito
        //acá junto los datos nuevos
        const dato = {//objeto con los datos nuevos
            id_empleado: $('#editIdEmpleadoLiq').val(),
            fecha_vencimiento: $('#editFechaVencimiento').val(),
            monto: $('#editMonto').val()
        }
        //acá mando los datos al controlador
        $.ajax({
            url: BASE + 'liquidaciones/actualizar/' + idActualizar,
            method: 'POST',
            data: dato,
            dataType: 'json',
            //acá veo qué respondió el controlador
            success: function(response){
                //se actualizo: cerramos modal, avisamos y recargamos la tabla
                if (response.exito){
                    $('#modalVerLiquidacion').modal('hide');
                    mensajes(response.mensaje, 'success');
                    $('#tablaDatosLiq').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
                    cargarTablaLiquidaciones();
                //repetido en la papelera
                }else if (response.papelera){
                    mensajes('Aviso: ' + response.mensaje, 'warning');
                //otro error
                }else{
                    mensajes('Error: ' + response.mensaje, 'error');
                }
            },
            //si falla la petición avisa
            error: function() {
                mensajes('Error en el servidor', 'error');
            }
        });
    });
    //------------------------------------------------------------------------------------------------//
    //acá se borra una liquidación
    //funcion que borra las liquidaciones
    //al tocar el tachito guardamos el id, cerramos el modal de ver y abrimos el modal de confirmacion
    $(document).on('click', '#botonEliminarLiq', function(){
        idABorrar = $(this).data('id');//guardo el id de la liquidación a borrar
        //esperamos a que se cierre el de ver para abrir el otro, si no se pisan los modales
        $('#modalVerLiquidacion').one('hidden.bs.modal', function(){
            $('#modalBorradoLIQ').modal('show');
        });
        $('#modalVerLiquidacion').modal('hide');
    });
    //acá está el botón de confirmar el borrado
    //al confirmar en el modal mandamos el borrado al controlador
    $('#btnBorradoLIQ').click(function(){
        $.ajax({
            url: BASE + 'liquidaciones/borrar/' + idABorrar,
            method: 'POST',
            dataType: 'json',
            //acá veo qué respondió el controlador
            success: function(response){
                //se borro: cerramos modal, avisamos y recargamos la tabla
                if (response.exito){
                    $('#modalBorradoLIQ').modal('hide');
                    mensajes(response.mensaje, 'success');
                    $('#tablaDatosLiq').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
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
    //acá se recupera una liquidación de la papelera
    //boton recuperar de la papelera: guardamos el id y mandamos la recuperacion
    $(document).on('click', '#btnRecuperarLIQ', function(){
        idARecuperar = $(this).data('id');//guardo el id de la liquidación a recuperar
        //acá mando el pedido de recuperar al controlador
        $.ajax({
            url: BASE + 'liquidaciones/recuperacion/' + idARecuperar,
            method: 'POST',
            dataType: 'json',
            //acá veo qué respondió el controlador
            success: function(response) {
                //se recupero: avisamos y recargamos la tabla de la papelera
                if(response.exito){
                    mensajes(response.mensaje, 'success');
                    $('#tablaDatosPapLiq').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
                    cargarTablaPapeleraLiq();
                //no es el dueño: avisamos y recargamos igual
                }else{
                    mensajes('Aviso: ' + response.mensaje, 'warning');
                    $('#tablaDatosPapLiq').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
                    cargarTablaPapeleraLiq();
                }
            },
            //si falla la petición avisa
            error: function() {
                mensajes('Error en el servidor','error'); 
            }
        });
    });
});