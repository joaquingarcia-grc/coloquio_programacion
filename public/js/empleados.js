$(document).ready(function(){
    
    $('#crgEmpleado').on('click', function () {
        // si ya esta abierto no lo duplico
        if ($('#colEmpleado').length === 0) {
            var plantillaFormulario = `
                <div class="col-lg-6" id="colEmpleado">
                    <section class="tarjeta-formulario">
                        <button type="button" class="boton-cerrar" id="botonCerrar">
                            <i class="fas fa-xmark"></i>
                        </button>
                        <div class="tarjeta-encabezado">
                            <h2><i class="fas fa-user-plus"></i> Cargar empleado</h2>
                            <p>Completá los datos del nuevo empleado</p>
                        </div>
                        <form id="formEmpleado" class="row g-3" method="post" action="">
                            <div class="col-12">
                                <label for="denominacion" class="form-label">Nombre y apellido</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    <input type="text" class="form-control" id="denominacion" name="denominacion" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="correo" class="form-label">Correo</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                    <input type="email" class="form-control" id="correo" name="correo" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="area" class="form-label">Área</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-briefcase"></i></span>
                                    <input type="text" class="form-control" id="area" name="area" required>
                                </div>
                            </div>
                            <div class="col-12 acciones-formulario">
                                <button type="button" class="boton-secundario" id="botonCancelar">Cancelar</button>
                                <button type="submit" class="boton-principal">
                                    <i class="fas fa-save"></i> Guardar
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            `;
            // append: se acomoda segun el orden en que se abre
            $('#ctnFormularios').append(plantillaFormulario);
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

    // la cruz y el cancelar cierran el formulario de empleado (lo saco del contenedor y el otro se corre)
    $('#ctnFormularios').on('click', '#botonCerrar, #botonCancelar', function () {
        $('#colEmpleado').remove();
    });
    // la cruz y el cancelar cierran el login o el registro
    $('#ctnLogin').on('click', '#botonCerrar, #botonCancelar', function () {
        $('#ctnLogin').empty();
    });

    // la cruz cierra la tabla (delegado porque se crea con js)
    $('#ctnEmpleado2').on('click', '#botonCerrarTabla', function () {
        $('#ctnEmpleado2').empty();
    });
    // filtra las filas a medida que se va tipeando
    $('#ctnEmpleado2').on('input', '#buscadorTabla', function () {
        var texto = $(this).val().toLowerCase();
        $('#cuerpoTabla tr').each(function () {
            var fila = $(this).text().toLowerCase();
            if (fila.indexOf(texto) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    // imprime la tabla (solo las filas que se ven, sin la columna Ver)
    $('#ctnEmpleado2').on('click', '#botonImprimir', function () {
        var titulo = $('#tituloTabla').text().trim();
        var tabla = $('#tablaDatos').clone();
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
    $('#ctnEmpleado').on('click', '#btnSalir', function () {
        $.ajax({
            url: BASE + 'usuarios/salir',
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function (response) {
                response.consultarSesion(exito);
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

    // cuando aprieto el boton de lista de empleados, pide los empleados a la api y los dibuja en una tabla
    $('#verListaEmpleados').on('click', function () {
        $.ajax({
            url: BASE + 'empleados/api',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                let contEmpleados = `
                    <section class="tarjeta-formulario">
                        <button type="button" class="boton-cerrar" id="botonCerrarTabla">
                            <i class="fas fa-xmark"></i>
                        </button>
                        <div class="tarjeta-encabezado">
                            <h2 id="tituloTabla">Lista de empleados</h2>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                            <input type="text" class="form-control" id="buscadorTabla" placeholder="Buscar...">
                        </div>
                        <!-- alto fijo, cuando se llena aparece la barra de scroll -->
                        <div class="table-responsive" style="height: 320px; overflow-y: auto;">
                            <table class="table table-hover align-middle" id="tablaDatos">
                                <thead class="sticky-top" style="background-color: var(--bs-body-bg);">
                                    <tr>
                                        <th>Denominación</th>
                                        <th>Correo</th>
                                        <th>Área</th>
                                        <th>Cargado por</th>
                                        <th class="text-end">Ver</th>
                                    </tr>
                                </thead>
                                <tbody id="cuerpoTabla">`;
                response.empleados.forEach(empleado => {
                    // una fila por cada empleado
                    contEmpleados += `
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
                contEmpleados += `
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-end gap-1 mt-3">
                            <button type="button" class="btn btn-sm btn-light border-0 text-secondary" id="botonImprimir" title="Imprimir">
                                <i class="fas fa-print"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-light border-0 text-secondary" id="botonPapelera" title="Papelera">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </section>`;
                $('#ctnEmpleado2').html(contEmpleados);
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    });
    // ojito de empleado: abre el modal con los datos del empleado
    $('#ctnEmpleado2').on('click', '[id^="verEmpleado_"]', function () {
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

    function mostrarSesion(usuario) {
        $('#opcionesSesion').removeClass('d-none');
        $('#nombreUsuario').text(usuario);
    }

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