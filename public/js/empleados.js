$(document).ready(function(){
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
    cargarTablaEmpleados();
    //esta funcion rellena la tabla de atributos
    function cargarTablaEmpleados(){
        $.ajax({
            url: BASE + 'empleados/api',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                // si ya estaba armada la destruyo para que tome la config nueva
                if ($.fn.DataTable.isDataTable('#tablaDatosEmp')) {
                    $('#tablaDatosEmp').DataTable().destroy();
                }
                let filasEmpleados = '';
                response.empleados.forEach(empleado => {
                    // una fila por cada empleado
                    filasEmpleados += `
                                    <tr>
                                        <td>${empleado.denominacion}</td>
                                        <td>${empleado.correo}</td>
                                        <td>${empleado.area}</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-sm btn-outline-primary" id="verEmpleado_${empleado.id}" data-denominacion="${empleado.denominacion}" data-correo="${empleado.correo}" data-area="${empleado.area}">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                });
                $('#cuerpoTablaEmp').html(filasEmpleados);
                // ACÁ va el bloque de layout
                $('#tablaDatosEmp').DataTable({
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
                                        window.location.href = BASE + 'etiquetas/papelera';
                                    }
                                }]
                        }
                    },
                    order: [[0, 'desc']]
                });

                $("#buscadorEmp").on('keyup', function(){
                    $('#tablaDatosEmp').DataTable().search(this.value).draw();
                });
            },
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    };

    //los datos seran enviado una ves obtengamos la accion desde el boton del modal
    $('#formEmpleado').on('submit', function(e){
        e.preventDefault();//detiene el envio normal del formulario
        const dato = {//creamos un objeto con todos nuestros datos
            denominacion: $('#denominacion').val(),
            correo: $('#correo').val(),
            area: $('#area').val()
        }   
        $.ajax({
            url: BASE + 'empleados/insertar',
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function(response){
                if (response.exito){
                    mensajes(response.mensaje,'success');
                    $('#formEmpleado')[0].reset();
                    $('#modalEmpleado').modal('hide');//ocultamos el modal de guardar
                    $('#tablaDatosEmp').DataTable().destroy();
                    cargarTablaEmpleados();
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
    //el ojito abre el modal con los datos del empleado (los toma del boton, que vienen de la base)
    $('#cuerpoTablaEmp').on('click', 'button[id^="verEmpleado_"]', function(){
        const boton = $(this);
        $('#idEmpleadoVer').val(this.id.split('_')[1]);//id del empleado, queda guardado para cuando armemos editar y borrar
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
        $('#modalVerEmpleado').modal('show');
    });

    //el lapiz convierte los datos en formulario
    $('#botonEditarEmp').on('click', function(){
        $('#vistaDatosEmp').addClass('d-none');
        $('#formEditarEmp').removeClass('d-none');
    });

    //cancelar vuelve a la vista y deja los campos como estaban
    $('#botonCancelarEdicion').on('click', function(){
        $('#editDenominacion').val($('#verDenominacion').text());
        $('#editCorreo').val($('#verCorreo').text());
        $('#editArea').val($('#verArea').text());
        $('#formEditarEmp').addClass('d-none');
        $('#vistaDatosEmp').removeClass('d-none');
    });
});