$(document).ready(function(){
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
                                        <td>${empleado.cargado_por}</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-sm btn-outline-primary" id="verEmpleado_${empleado.id}" data-denominacion="${empleado.denominacion}" data-correo="${empleado.correo}" data-area="${empleado.area}" data-cargado="${empleado.cargado_por}">
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
    $('#GuardadoET').on('click', function(){
        const dato = {//creamos un objeto con todos nuestros datos
            denominacion: $('#denominacion').val(),
        }   
        $.ajax({
            url: BASE + 'etiquetas/insertar',
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function(response){
                if (response.exito){
                    $('#modalGuardarET').modal('hide');//ocultamos el modal de guardar
                    mensajes("Etiqueta guardada con ID: " + response.id + response.mensaje,'success');
                    $('#formularioET')[0].reset();
                    setTimeout(function(){
                        window.location.href = BASE + 'etiquetas';
                    },  3010);
                }else if (response.papelera){
                    $('#modalGuardarET').modal('hide');//ocultamos el modal de guardar
                    mensajes('Aviso: ' + response.mensaje, 'warning');
                    $('#formularioET')[0].reset();
                    
                }else{
                    $('#modalGuardarET').modal('hide');//ocultamos el modal de guardar
                    mensajes('Error: ' + response.mensaje, 'error');
                    $('#formularioET')[0].reset();
                    
                }
            },
            error: function() {
                $('#modalGuardarET').modal('hide');//ocultamos el modal de guardar
                mensajes('Error en el servidor');
            },
            complete: function(){
                $('#modalGuardarET').modal('hide');//ocultamos el modal de guardar
                $('#formularioET')[0].reset();
            } 
        });
    });
});