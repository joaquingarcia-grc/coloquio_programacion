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
    cargarTablaActividad();
    //esta funcion rellena la tabla de actividad
    function cargarTablaActividad(){
        $.ajax({
            url: BASE + 'actividades/api',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                let filasActividad = '';
                response.actividades.forEach(actividad => {
                    //color del badge segun la accion
                    let colorAccion;
                    if (actividad.accion == 'alta'){
                        colorAccion = 'bg-success';
                    }else if (actividad.accion == 'modificacion'){
                        colorAccion = 'bg-warning text-dark';
                    }else if (actividad.accion == 'baja'){
                        colorAccion = 'bg-danger';
                    }else{
                        colorAccion = 'bg-secondary';
                    }
                    // una fila por cada actividad
                    filasActividad += `
                                    <tr>
                                        <td>${actividad.tabla}</td>
                                        <td>${actividad.empleado}</td>
                                        <td><span class="badge ${colorAccion}">${actividad.accion}</span></td>
                                        <td>${actividad.fecha_alta}</td>
                                    </tr>`;
                });
                $('#cuerpoTablaAct').html(filasActividad);
                $('#tablaDatosAct').DataTable({
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
                                }]
                        }
                    },
                    //ordenada por la fecha, de la mas nueva a la mas vieja
                    order: [[3, 'desc']]
                });

                $("#buscadorAct").on('keyup', function(){
                    $('#tablaDatosAct').DataTable().search(this.value).draw();
                });
            },
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    };
});