$(document).ready(function(){
    //------------------------------------------------------------------------------------------------//
    //variables que guardan ids
    let idABorrar;//id del empleado que se va a borrar
    let idARecuperar;//id del empleado que se va a recuperar
    let idActualizar;//id del empleado que se va a actualizar
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
    //acá llamo a la tabla de empleados para que cargue al abrir la página
    cargarTablaEmpleados();
    //acá creo la tabla de empleados
    //esta funcion rellena la tabla de atributos
    function cargarTablaEmpleados(){
        //acá pido los empleados al controlador
        $.ajax({
            url: BASE + 'empleados/api',
            method: 'GET',
            dataType: 'json',
            //si sale bien armo la tabla
            success: function(response) {
                //acá se juntan las filas de la tabla
                let filasEmpleados = '';
                //acá recorro los empleados y armo las filas
                response.empleados.forEach(empleado => {
                    // una fila por cada empleado
                    filasEmpleados += `
                                    <tr>
                                        <td>${empleado.denominacion}</td>
                                        <td>${empleado.correo}</td>
                                        <td>${empleado.area}</td>
                                        <td class="text-end">
                                            <!-- botón ojito, lleva los datos del empleado -->
                                            <button type="button" class="btn btn-sm btn-outline-primary" id="verEmpleado_${empleado.id}" data-id="${empleado.id}" data-denominacion="${empleado.denominacion}" data-correo="${empleado.correo}" data-area="${empleado.area}">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                });
                //acá meto las filas en el tbody de la tabla
                $('#cuerpoTablaEmp').html(filasEmpleados);
                // ACÁ va el bloque de layout
                //acá se activa el DataTable (paginado, info, orden y botones)
                $('#tablaDatosEmp').DataTable({
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
                                        window.location.href = BASE + 'empleados/papelera';
                                    }
                                }]//https://datatables.net/examples/buttons/html5/simple.html url de referencias
                        }
                    },
                    //acá se ordena por la primera columna
                    order: [[0, 'desc']]
                });

                //acá está el buscador de la tabla de empleados
                $("#buscadorEmp").on('keyup', function(){
                    $('#tablaDatosEmp').DataTable().search(this.value).draw();
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
    cargarTablaPapeleraEmp();
    //acá creo la tabla de la papelera
    //esta funcion rellena la tabla de la papelera
    function cargarTablaPapeleraEmp(){
        //pedimos el listado de empleados borrados
        $.ajax({
            url: BASE + 'empleados/api2',
            method: 'GET',
            dataType: 'json',
            //si sale bien armo la tabla
            success: function(response) {
                //armamos las filas de los empleados borrados
                let filasPapelera = '';
                //acá recorro los empleados borrados y armo las filas
                response.empleados.forEach(empleado => {
                    // una fila por cada empleado borrado
                    filasPapelera += `
                                    <tr>
                                        <td>${empleado.denominacion}</td>
                                        <td>${empleado.correo}</td>
                                        <td>${empleado.area}</td>
                                        <td class="text-end">
                                            <!-- boton recuperar -->
                                            <button type="button" class="btn btn-sm btn-info" id="btnRecuperarEMP" data-id="${empleado.id}">
                                                <i class="fas fa-recycle"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                });
                //metemos las filas en el tbody de la papelera
                $('#cuerpoTablaPap').html(filasPapelera);
                // ACÁ va el bloque de layout
                //DataTable de la papelera, misma config que la otra pero sin boton de papelera
                $('#tablaDatosPap').DataTable({
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
                $("#buscadorPap").on('keyup', function(){
                    $('#tablaDatosPap').DataTable().search(this.value).draw();
                });
            },
            //si falla la petición avisa
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    };
    //------------------------------------------------------------------------------------------------//
    //acá está el modal de cargar un empleado
    //el boton cancelar limpia el formulario y cierra el modal de cargar
    $('#botonCancelarEmp').on('click', function(){
        $('#formEmpleado')[0].reset();
    });

    //acá se guarda un empleado nuevo
    //los datos seran enviado una ves obtengamos la accion desde el boton del modal
    $('#formEmpleado').on('submit', function(e){
        e.preventDefault();//detiene el envio normal del formulario
        //acá junto los datos del formulario
        const dato = {//creamos un objeto con todos nuestros datos
            denominacion: $('#denominacion').val(),
            correo: $('#correo').val(),
            area: $('#area').val()
        }   
        //acá mando los datos al controlador
        $.ajax({
            url: BASE + 'empleados/insertar',
            method: 'POST',
            data: dato,
            dataType: 'json',
            //acá veo qué respondió el controlador
            success: function(response){
                //se guardó: aviso, limpio el form, cierro el modal y recargo la tabla
                if (response.exito){
                    mensajes(response.mensaje,'success');
                    $('#formEmpleado')[0].reset();
                    $('#modalEmpleado').modal('hide');//ocultamos el modal de guardar
                    $('#tablaDatosEmp').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
                    cargarTablaEmpleados();
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
    //acá está el modal de ver el empleado (ojito)
    //el ojito abre el modal con los datos del empleado (los toma del boton, que vienen de la base)
    $('#cuerpoTablaEmp').on('click', 'button[id^="verEmpleado_"]', function(){
        const boton = $(this);//el botón ojito que se tocó
        $('#idEmpleadoVer').val(boton.data('id'));//id del empleado, queda guardado en el modal
        $('#botonEliminarEmp').data('id', boton.data('id'));//el tachito lleva el id para el borrado
        $('#formEditarEmp').data('id', boton.data('id'));//el formulario de editar lleva el id para el actualizado
        //vista de solo lectura
        $('#verDenominacion').text(boton.attr('data-denominacion'));
        $('#verCorreo').text(boton.attr('data-correo'));
        $('#verArea').text(boton.attr('data-area'));
        //formulario de edicion con los mismos datos
        $('#editDenominacion').val(boton.attr('data-denominacion'));
        $('#editCorreo').val(boton.attr('data-correo'));
        $('#editArea').val(boton.attr('data-area'));
        //siempre abre en la vista de solo lectura
        $('#formEditarEmp').addClass('d-none');
        $('#vistaDatosEmp').removeClass('d-none');
        $('#modalVerEmpleado').modal('show');//acá se abre el modal
    });

    //acá está el lapiz de editar
    //el lapiz convierte los datos en formulario
    $('#botonEditarEmp').on('click', function(){
        $('#vistaDatosEmp').addClass('d-none');//escondo la vista de solo lectura
        $('#formEditarEmp').removeClass('d-none');//muestro el formulario de editar
    });

    //acá está el cancelar de la edición
    //cancelar vuelve a la vista y deja los campos como estaban
    $('#botonCancelarEdicion').on('click', function(){
        //acá dejo los campos como estaban
        $('#editDenominacion').val($('#verDenominacion').text());
        $('#editCorreo').val($('#verCorreo').text());
        $('#editArea').val($('#verArea').text());
        //acá vuelvo a la vista de solo lectura
        $('#formEditarEmp').addClass('d-none');
        $('#vistaDatosEmp').removeClass('d-none');
    });
    //------------------------------------------------------------------------------------------------//
    //acá está la impresora del modal
    //la impresora abre una ventana con los datos de este empleado y manda a imprimir
    $('#botonImprimirEmp').on('click', function(){
        //los datos los tomamos de la vista de solo lectura, pasados por .text() para que no se rompa el html si traen simbolos raros
        const denominacion = $('<div>').text($('#verDenominacion').text()).html();
        const correo = $('<div>').text($('#verCorreo').text()).html();
        const area = $('<div>').text($('#verArea').text()).html();
        const ventana = window.open('', '_blank');//ventana nueva para imprimir
        //acá armo la hoja que se imprime
        ventana.document.write(`
            <html>
                <head>
                    <title>Datos del empleado</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 30px; }
                        h2 { margin-bottom: 20px; }
                        p { font-size: 16px; margin: 8px 0; }
                    </style>
                </head>
                <body>
                    <h2>Datos del empleado</h2>
                    <p><strong>Nombre y apellido:</strong> ${denominacion}</p>
                    <p><strong>Correo:</strong> ${correo}</p>
                    <p><strong>Área:</strong> ${area}</p>
                </body>
            </html>`);
        ventana.document.close();
        ventana.focus();
        ventana.print();//manda a imprimir
        ventana.close();//cierra la ventana
    });
    //------------------------------------------------------------------------------------------------//
    //acá se actualiza un empleado
    //formulario de editar: al enviarlo mandamos los datos nuevos al controlador
    $('#formEditarEmp').on('submit', function(e){
        e.preventDefault();//detiene el envio normal del formulario
        let idActualizar = $(this).data('id');//el id viaja en la url, lo dejamos guardado al abrir el ojito
        //acá junto los datos nuevos
        const dato = {//objeto con los datos nuevos
            denominacion: $('#editDenominacion').val(),
            correo: $('#editCorreo').val(),
            area: $('#editArea').val()
        }
        //acá mando los datos al controlador
        $.ajax({
            url: BASE + 'empleados/actualizar/' + idActualizar,
            method: 'POST',
            data: dato,
            dataType: 'json',
            //acá veo qué respondió el controlador
            success: function(response){
                //se actualizo: cerramos modal, avisamos y recargamos la tabla
                if (response.exito){
                    $('#modalVerEmpleado').modal('hide');
                    mensajes( response.mensaje, 'success');
                    $('#tablaDatosEmp').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
                    cargarTablaEmpleados();
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
    //acá se borra un empleado
    //funcion que borra los empleados
    //al tocar el tachito guardamos el id, cerramos el modal de ver y abrimos el modal de confirmacion
    $(document).on('click', '#botonEliminarEmp', function(){
        idABorrar = $(this).data('id');//guardo el id del empleado a borrar
        //esperamos a que se cierre el de ver para abrir el otro, si no se pisan los modales
        $('#modalVerEmpleado').one('hidden.bs.modal', function(){
            $('#modalBorradoEMP').modal('show');
        });
        $('#modalVerEmpleado').modal('hide');
    });

    //acá está el botón de confirmar el borrado
    //al confirmar en el modal mandamos el borrado al controlador
    $('#btnBorradoEMP').click(function(){
        $.ajax({
            url: BASE + 'empleados/borrar/' + idABorrar,
            method: 'POST',
            dataType: 'json',
            //acá veo qué respondió el controlador
            success: function(response){
                //se borro: cerramos modal, avisamos y recargamos la tabla
                if (response.exito){
                    $('#modalBorradoEMP').modal('hide');
                    mensajes(response.mensaje, 'success');
                    $('#tablaDatosEmp').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
                    cargarTablaEmpleados();
                //no se pudo borrar: cerramos modal y mostramos el error
                }else{
                    $('#modalBorradoEMP').modal('hide');
                    mensajes(response.mensaje, 'error');
                }
            },
            //fallo la peticion en si
            error: function() {
                $('#modalBorradoEMP').modal('hide');
                mensajes('Error en el servidor', 'error'); 
            }
        });
    });
    //------------------------------------------------------------------------------------------------//
    //acá se recupera un empleado de la papelera
    //boton recuperar de la papelera: guardamos el id y mandamos la recuperacion
    $(document).on('click', '#btnRecuperarEMP', function(){
        idARecuperar = $(this).data('id');//guardo el id del empleado a recuperar
        //acá mando el pedido de recuperar al controlador
        $.ajax({
            url: BASE + 'empleados/recuperacion/' + idARecuperar,
            method: 'POST',
            dataType: 'json',
            //acá veo qué respondió el controlador
            success: function(response) {
                //se recupero: avisamos y recargamos la tabla de la papelera
                if(response.exito){
                    mensajes(response.mensaje, 'success');
                    $('#tablaDatosPap').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
                    cargarTablaPapeleraEmp();

                //no es el dueño: avisamos y recargamos igual
                }else{
                    mensajes('Aviso: ' + response.mensaje, 'warning');
                    $('#tablaDatosPap').DataTable().destroy();//se destruye la tabla vieja para armarla de nuevo
                    cargarTablaPapeleraEmp();
                }
            },
            //si falla la petición avisa
            error: function() {
                mensajes('Error en el servidor','error'); 
            }
        });
    });
});