$(document).ready(function(){

    // guarda cuantas liquidaciones se dieron de baja para mostrarlo en el reporte (si no, se perderia el aviso en el login)
    var bajasAvisadas = 0;
    
    $('#crgEmpleado').on('click', function () {
        // si ya esta abierto no hago nada (el form ya esta en su columna, solo lo muestro)
        if ($('#colEmpleado').hasClass('d-none')) {
            $('#colEmpleado').removeClass('d-none');
        }
    });

    $('#formuLogueo').on('click',function(){
        var plantillaLogin = `
            <section class="tarjeta-formulario tarjeta-login">
                <button type="button" class="boton-cerrar" id="botonCerrar">
                    <i class="fas fa-xmark"></i>
                </button>
                <div class="tarjeta-encabezado">
                    <h2><i class="fas fa-right-to-bracket"></i> Iniciar sesión</h2>
                    <p>Ingresá tus datos para continuar</p>
                </div>
                <form id="formLogin" class="row g-3" method="post" action="">
                    <div class="col-12">
                        <label for="denominacion" class="form-label">Usuario</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                            <input type="text" class="form-control" id="denominacion" name="denominacion" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="pswd" class="form-label">Contraseña</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                            <input type="password" class="form-control" id="pswd" name="pswd" required>
                        </div>
                    </div>
                    <div class="col-12 acciones-formulario">
                        <button type="button" class="boton-secundario" id="botonCancelar">Cancelar</button>
                        <button type="submit" class="boton-principal">
                            <i class="fas fa-right-to-bracket"></i> Ingresar
                        </button>
                    </div>
                </form>
            </section>`;
        // login y registro van en su propio contenedor, en el medio
        $('#ctnLogin').html(plantillaLogin);
    });

    $('#btnRegistro').on('click', function(){
        var plantillaRegistro = `
                <section class="tarjeta-formulario tarjeta-login">
                    <button type="button" class="boton-cerrar" id="botonCerrar">
                        <i class="fas fa-xmark"></i>
                    </button>
                    <div class="tarjeta-encabezado">
                        <h2><i class="fas fa-user-plus"></i> Crear usuario</h2>
                        <p>Completá los datos para registrarte</p>
                    </div>
                    <form id="formRegistro" class="row g-3" method="post" action="">
                        <div class="col-12">
                            <label for="denominacion" class="form-label">Usuario</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input type="text" class="form-control" id="denominacion" name="denominacion" required>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="correo" class="form-label">Correo</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                <input type="email" class="form-control" id="correo" name="correo" required>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="pswd" class="form-label">Contraseña</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                <input type="password" class="form-control" id="pswd" name="pswd" required>
                            </div>
                        </div>
                        <div class="col-12 acciones-formulario">
                            <button type="button" class="boton-secundario" id="botonCancelar">Cancelar</button>
                            <button type="submit" class="boton-principal">
                                <i class="fas fa-user-plus"></i> Registrarme
                            </button>
                        </div>
                    </form>
                </section>
            `;
        $('#ctnLogin').html(plantillaRegistro);
    
    });

    // la cruz cierra el formulario de empleado (lo oculto y lo dejo limpio)
    $('#ctnFormularios').on('click', '#botonCerrarEmp', function () {
        $('#formEmpleado')[0].reset();
        $('#colEmpleado').addClass('d-none');
    });
    // el cancelar solo limpia el formulario de empleado, no lo cierra
    $('#ctnFormularios').on('click', '#botonCancelarEmp', function () {
        $('#formEmpleado')[0].reset();
    });
    // la cruz y el cancelar cierran el login o el registro
    $('#ctnLogin').on('click', '#botonCerrar, #botonCancelar', function () {
        $('#ctnLogin').empty();
    });

    // la cruz cierra la tabla que corresponda (el sufijo Emp o Liq sale del id del boton)
    $('#ctnFormularios').on('click', '#botonCerrarTablaEmp, #botonCerrarTablaLiq', function () {
        var sufijo = this.id.replace('botonCerrarTabla', '');
        $('#buscadorTabla' + sufijo).val('');
        $('#seccionTabla' + sufijo).addClass('d-none');
    });
    // filtra las filas a medida que se va tipeando (solo las de su propia tabla)
    $('#ctnFormularios').on('input', '#buscadorTablaEmp, #buscadorTablaLiq', function () {
        var sufijo = this.id.replace('buscadorTabla', '');
        var texto = $(this).val().toLowerCase();
        $('#cuerpoTabla' + sufijo + ' tr').each(function () {
            var fila = $(this).text().toLowerCase();
            if (fila.indexOf(texto) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    // imprime la tabla que corresponda (solo las filas que se ven, sin la columna Ver)
    $('#ctnFormularios').on('click', '#botonImprimirEmp, #botonImprimirLiq', function () {
        var sufijo = this.id.replace('botonImprimir', '');
        var titulo = $('#tituloTabla' + sufijo).text().trim();
        var tabla = $('#tablaDatos' + sufijo).clone();
        // saco las filas que oculto el buscador
        tabla.find('tbody tr').each(function () {
            if (this.style.display === 'none') {
                $(this).remove();
            }
        });
        // saco la columna Ver (ultima)
        tabla.find('tr').each(function () {
            $(this).children().last().remove();
        });
        var ventana = window.open('', '_blank');
        // copio el head de la pagina asi usa los mismos css que ya estan cargados
        ventana.document.write('<html><head>' + document.head.innerHTML + '</head><body class="p-4"><h4 class="mb-3">' + titulo + '</h4>' + tabla[0].outerHTML + '</body></html>');
        ventana.document.close();
        ventana.document.title = titulo;
        ventana.addEventListener('load', function () {
            ventana.focus();
            ventana.print();
        });
    });
    // guarda el usuario nuevo (delegado porque el form se crea con js)
    $('#ctnLogin').on('submit', '#formRegistro', function (e) {
        e.preventDefault(); // frena el envio normal del form
        var dato = {
            denominacion: $('#denominacion').val(),
            pswd: $('#pswd').val(),
            correo: $('#correo').val()
        };
        $.ajax({
            url: BASE + 'usuarios/insertar',
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function (response) {
                if (response.exito) {
                    mensajes(response.mensaje); // mensaje que manda el servidor
                    $('#formRegistro')[0].reset(); // limpia solo si se guardo bien
                } else {
                    mensajes('Error: ' + response.mensaje, 'error');
                }
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    });
    // guarda el empleado nuevo (delegado porque el form esta dentro de #ctnFormularios)
    $('#ctnFormularios').on('submit', '#formEmpleado', function (e) {
        e.preventDefault(); // frena el envio normal del form
        var dato = {
            denominacion: $('#denominacion').val(),
            correo: $('#correo').val(),
            area: $('#area').val()
        };
        $.ajax({
            url: BASE + 'empleados/insertar',
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function (response) {
                if (response.exito) {
                    mensajes(response.mensaje); // mensaje que manda el servidor
                    $('#formEmpleado')[0].reset(); // limpia solo si se guardo bien
                    // vuelvo a armar la tabla para que aparezca el empleado nuevo
                    cargarTablaEmpleados();
                } else {
                    mensajes('Error: ' + response.mensaje, 'error');
                }
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    });
    // login (delegado porque el form se crea con js)
    $('#ctnLogin').on('submit', '#formLogin', function (e) {
        e.preventDefault();
        var dato = {
            denominacion: $('#denominacion').val(),
            pswd: $('#pswd').val()
        };
        $.ajax({
            url: BASE + 'usuarios/validacion',
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function (response) {
                if (response.exito) {
                    mensajes(response.mensaje);
                    $('#formLogin')[0].reset();
                    // aca es el evento: login ok, le pregunto a la sesion y muestro todo
                    consultarSesion();
                } else {
                    mensajes('Error: ' + response.mensaje, 'error');
                }
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    });

    // login (para salir)
    $('#btnSalir').on('click', function () {
        $.ajax({
            url: BASE + 'usuarios/salir',
            method: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.logueado === false) {
                    // vuelve todo al estado de no logueado
                    $('#opcionesSesion').addClass('d-none');
                    $('#btnReporte').addClass('d-none');
                    $('#cantAvisos').addClass('d-none').text('0');
                    $('#colEmpleado').addClass('d-none');
                    $('#seccionTablaEmp').addClass('d-none');
                    $('#colLiquidacion').addClass('d-none');
                    $('#seccionTablaLiq').addClass('d-none');
                    $('#nombreUsuario').text('Usuario');
                } else {
                    mensajes('No se pudo cerrar la sesión', 'error');
                }
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    });
    // toast de mensajes: mensajes('texto') es verde, mensajes('texto', 'error') es rojo
    function mensajes(texto, tipo) {
        var clase = '';
        var icono = '';

        if (tipo === 'error') {
            clase = 'text-bg-danger';
            icono = 'fa-circle-xmark';
        } else {
            clase = 'text-bg-success';
            icono = 'fa-circle-check';
        }
        // crea el contenedor una sola vez
        if ($('#contenedorToast').length === 0) {
            $('body').append('<div class="toast-container position-fixed end-0 p-3" id="contenedorToast" style="top: 60px;"></div>');
        }
        var toast = $(`
            <div class="toast align-items-center border-0 ${clase}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas ${icono} me-2"></i><span></span>
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `);
        // .text() para que no se cuele html si el servidor manda algo raro
        toast.find('span').text(texto);
        $('#contenedorToast').append(toast);
        // cuando se cierra lo saco del html
        toast.on('hidden.bs.toast', function () {
            toast.remove();
        });
        var instancia = new bootstrap.Toast(toast[0], { delay: 4000 });
        instancia.show();
    }
    // la dejo global para que liquidaciones.js tambien pueda usar mensajes()
    window.mensajes = mensajes;

    // pide los empleados a la api, llena el tbody de la tabla (que ya esta en el index) y la muestra
    function cargarTablaEmpleados() {
        $.ajax({
            url: BASE + 'empleados/api',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
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
                // limpio el buscador asi no queda un texto viejo con las filas nuevas sin filtrar
                $('#buscadorTablaEmp').val('');
                $('#seccionTablaEmp').removeClass('d-none');
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    }

    // cuando aprieto el boton de lista de empleados, la actualiza y la muestra
    $('#verListaEmpleados').on('click', function () {
        cargarTablaEmpleados();
    });
    // ojito de empleado: abre el modal con los datos del empleado
    $('#ctnFormularios').on('click', '[id^="verEmpleado_"]', function () {
        var id = this.id.replace('verEmpleado_', '');
        $('#modalDetalleTitulo').html('<i class="fas fa-user"></i> Datos del empleado');
        $('#modalDetalleCuerpo').html(`
            <dl class="row mb-0">
                <dt class="col-sm-4">Nombre</dt>
                <dd class="col-sm-8">${$(this).data('denominacion')}</dd>
                <dt class="col-sm-4">Correo</dt>
                <dd class="col-sm-8">${$(this).data('correo')}</dd>
                <dt class="col-sm-4">Área</dt>
                <dd class="col-sm-8">${$(this).data('area')}</dd>
                <dt class="col-sm-4">Cargado por</dt>
                <dd class="col-sm-8">${$(this).data('cargado')}</dd>
            </dl>`);
        $('#modalDetallePie').html(`
            <button type="button" class="btn btn-outline-primary" id="editarEmpleado" data-id="${id}">
                <i class="fas fa-pen"></i> Editar
            </button>
            <button type="button" class="btn btn-outline-danger" id="borrarEmpleado" data-id="${id}">
                <i class="fas fa-trash"></i> Borrar
            </button>`);
        bootstrap.Modal.getOrCreateInstance($('#modalDetalle')[0]).show();
    });
    // pide los avisos al servidor y llena la barra del reporte
    // si abrir es true ademas abre la barra, si es false solo actualiza el numerito del boton
    function cargarAvisos(abrir) {
        $.ajax({
            url: BASE + 'liquidaciones/avisos',
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (response) {
                var cantidad = response.por_vencer.length;
                bajasAvisadas = bajasAvisadas + response.dadas_de_baja;
                // si el servidor dio de baja alguna vencida, la tabla de liquidaciones quedo desactualizada
                // aviso con un evento y liquidaciones.js la vuelve a armar (misma idea que sesionIniciada)
                if (response.dadas_de_baja > 0) {
                    $(document).trigger('liquidacionesDadasDeBaja');
                }
                $('#ctnAvisos').empty();
                if (cantidad > 0) {
                    // la lista lleva id para poder imprimir solo ella (sin el cartel de bajas)
                    var lista = $('<div class="list-group mb-3" id="listaAvisos"></div>');
                    // el usuario logueado viene en cada item, con el primero alcanza
                    var item0 = $('<div class="list-group-item bg-light"></div>');
                    item0.append(
                        $('<small class="text-secondary d-block"></small>').text('Responsable')
                    );
                    item0.append(
                        $('<div class="fw-semibold"></div>').text(response.por_vencer[0].usuario)
                    );
                    lista.append(item0);
                    response.por_vencer.forEach(function (liq) {
                        var cuando = '';
                        if (liq.dias_restantes == 0) {
                            cuando = 'Vence hoy';
                        } else {
                            cuando = 'Vence mañana';
                        }
                        var item = $('<div class="list-group-item"></div>');
                        // nombre del empleado
                        item.append(
                            $('<div class="fw-semibold"></div>').text(liq.empleado)
                        );
                        // monto y aviso de vencimiento
                        item.append(
                            $('<small class="text-secondary d-block"></small>')
                                .text('$ ' + liq.monto + ' - ' + cuando)
                        );
                        // fecha exacta de vencimiento
                        item.append(
                            $('<small class="text-secondary d-block"></small>')
                                .text('Fecha de vencimiento: ' + liq.fecha_vencimiento)
                        );
                        lista.append(item);
                    });
                    $('#ctnAvisos').append(lista);
                    $('#cantAvisos').text(cantidad).removeClass('d-none');
                    // hay avisos, muestro el pie con el boton de imprimir
                    $('#pieAvisos').removeClass('d-none');
                } else {
                    $('#ctnAvisos').append('<p class="text-secondary">No hay liquidaciones por vencer</p>');
                    $('#cantAvisos').addClass('d-none');
                    // no hay nada para imprimir, escondo el pie
                    $('#pieAvisos').addClass('d-none');
                }
                if (bajasAvisadas > 0) {
                    var info = $('<div class="alert alert-secondary mb-0"></div>');
                    info.text('Se dieron de baja ' + bajasAvisadas + ' liquidacion(es) vencida(s)');
                    $('#ctnAvisos').append(info);
                }
                if (abrir) {
                    bootstrap.Offcanvas.getOrCreateInstance($('#panelReporte')[0]).show();
                }
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    }

    // boton ver reporte: actualiza los avisos y abre la barra de la derecha
    $('#btnReporte').on('click', function () {
        cargarAvisos(true);
    });

    // imprime las liquidaciones por vencer (solo la lista, sin el cartel de bajas)
    $('#botonImprimirAvisos').on('click', function () {
        var titulo = 'Liquidaciones por vencer';
        var lista = $('#listaAvisos').clone();
        var ventana = window.open('', '_blank');
        // copio el head de la pagina asi usa los mismos css que ya estan cargados
        ventana.document.write('<html><head>' + document.head.innerHTML + '</head><body class="p-4"><h4 class="mb-3">' + titulo + '</h4>' + lista[0].outerHTML + '</body></html>');
        ventana.document.close();
        ventana.document.title = titulo;
        ventana.addEventListener('load', function () {
            ventana.focus();
            ventana.print();
        });
    });

    function mostrarSesion(usuario) {
        $('#opcionesSesion').removeClass('d-none');
        $('#btnReporte').removeClass('d-none');
        $('#nombreUsuario').text(usuario);
        // aviso a todos los js que hay sesion, cada uno abre lo suyo (liquidaciones.js escucha este mismo evento)
        $(document).trigger('sesionIniciada');
    }

    // evento de login: abro el form y la tabla de empleados
    $(document).on('sesionIniciada', function () {
        $('#colEmpleado').removeClass('d-none');
        cargarTablaEmpleados();
        // trae los avisos para el numerito del boton, sin abrir la barra
        cargarAvisos(false);
    });

    // le pregunta al servidor si hay sesion y si hay, muestra todo (sirve para el login y para cuando recarga)
    function consultarSesion() {
        $.ajax({
            url: BASE + 'usuarios/sesion',
            method: 'GET',
            dataType: 'json',
            cache: false, // para que el navegador no me devuelva la respuesta vieja
            success: function (response) {
                if (response.logueado) {
                    mostrarSesion(response.denominacion);
                }
            }
        });
    }
    // al cargar la pagina pregunto si ya hay sesion (por si recargó)
    consultarSesion();
});