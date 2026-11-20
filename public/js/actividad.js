$(document).ready(function(){
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
    //acá llamo a la tabla de actividad para que cargue al abrir la página
    cargarTablaActividad();
    //acá creo la tabla de actividad
    //esta funcion rellena la tabla de actividad
    function cargarTablaActividad(){
        //acá pido las actividades al controlador
        $.ajax({
            url: BASE + 'actividades/api',
            method: 'GET',
            dataType: 'json',
            //si sale bien armo la tabla
            success: function(response) {
                //acá se juntan las filas de la tabla
                let filasActividad = '';
                //acá recorro las actividades y armo las filas
                response.actividades.forEach(actividad => {
                    //acá va la fila de la actividad
                    // una fila por cada actividad (la acción va en texto simple, sin color)
                    filasActividad += `
                                    <tr>
                                        <td>${actividad.tabla}</td>
                                        <td>${actividad.empleado}</td>
                                        <td>${actividad.accion}</td>
                                        <td>${actividad.fecha_alta}</td>
                                    </tr>`;
                });
                //acá meto las filas en el tbody de la tabla
                $('#cuerpoTablaAct').html(filasActividad);
                //acá se activa el DataTable (paginado, info, orden y botones)
                $('#tablaDatosAct').DataTable({
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
                                //botón imprimir
                                {
                                    extend: 'print',
                                    text: 'imprimir <i class="bi bi-printer-fill"></i>',
                                    titleAttr: 'imprimir tabla',
                                    //acá va el título que sale arriba al imprimir, con el usuario logueado (viene de USR)
                                    title: 'Actividad de ' + USR
                                }]
                        }//https://datatables.net/examples/buttons/html5/simple.html url de referencias
                    },
                    //acá se ordena por la fecha
                    //ordenada por la fecha, de la mas nueva a la mas vieja
                    order: [[3, 'desc']]
                });
                //acá está el buscador de la tabla de actividad
                $("#buscadorAct").on('keyup', function(){
                    $('#tablaDatosAct').DataTable().search(this.value).draw();
                });
            },
            //si falla la petición avisa
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    };
});