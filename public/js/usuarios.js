$(document).ready(function(){
    cargarTablaUsuarios();
    //esta funcion rellena la tabla de usuarios
    function cargarTablaUsuarios(){
        $.ajax({
            url: BASE + 'usuarios/api',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                // si ya estaba armada la destruyo para que tome la config nueva
                if ($.fn.DataTable.isDataTable('#tablaDatosUsu')) {
                    $('#tablaDatosUsu').DataTable().destroy();
                }
                let filasUsuarios = '';
                response.usuarios.forEach(usuario => {
                    // una fila por cada usuario
                    filasUsuarios += `
                                    <tr>
                                        <td>${usuario.denominacion}</td>
                                        <td>${usuario.correo}</td>
                                        <td>${usuario.fecha_alta}</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-sm btn-outline-primary" id="verUsuario_${usuario.id}" data-denominacion="${usuario.denominacion}" data-correo="${usuario.correo}" data-alta="${usuario.fecha_alta}">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                });
                $('#cuerpoTablaUsu').html(filasUsuarios);
                $('#tablaDatosUsu').DataTable({
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
                                        window.location.href = BASE + 'usuarios/papelera';
                                    }
                                }]
                        }
                    },
                    order: [[0, 'desc']]
                });

                $("#buscadorTablaUsu").on('keyup', function(){
                    $('#tablaDatosUsu').DataTable().search(this.value).draw();
                });
            },
            error: function() {
                mensajes('Error en el servidor','error');
            }
        });
    };
});