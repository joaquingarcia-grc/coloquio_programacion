$(document).ready(function(){
    
    $('#crgEmpleado').on('click', function () {
        var plantillaFormulario = `
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
        `;
        $('#ctnEmpleado').html(plantillaFormulario);
    });

    $('#crgLiquidacion').on('click', function () {
        var plantillaLiquidacion = `
            <section class="tarjeta-formulario">
                <button type="button" class="boton-cerrar" id="botonCerrar">
                    <i class="fas fa-xmark"></i>
                </button>
                <div class="tarjeta-encabezado">
                    <h2><i class="fas fa-file-invoice-dollar"></i> Generar liquidación</h2>
                    <p>Elegí el empleado y completá los datos de la liquidación</p>
                </div>
                <form id="formLiquidacion" class="row g-3" method="post" action="">
                    <div class="col-12">
                        <label for="id_empleado" class="form-label">Empleado</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                            <select class="form-select" id="id_empleado" name="id_empleado" required>
                                <option value="">Seleccioná un empleado</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="fecha_liquidacion" class="form-label">Fecha de liquidación</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-calendar-days"></i></span>
                            <input type="date" class="form-control" id="fecha_liquidacion" name="fecha_liquidacion" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="monto" class="form-label">Monto a liquidar</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                            <input type="number" class="form-control" id="monto" name="monto" min="0" step="0.01" required>
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
        `;
        $('#ctnEmpleado').html(plantillaLiquidacion);

        // aca cargas los empleados en el select #id_empleado
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
        $('#ctnEmpleado').html(plantillaLogin);
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
        $('#ctnEmpleado').html(plantillaRegistro);
    
    });

    // la cruz y el cancelar cierran el formulario (delegado porque se crea con js)
    $('#ctnEmpleado').on('click', '#botonCerrar, #botonCancelar', function () {
        $('#ctnEmpleado').empty();
    });
    // guarda el usuario nuevo (delegado porque el form se crea con js)
    $('#ctnEmpleado').on('submit', '#formRegistro', function (e) {
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
    $('#ctnEmpleado').on('submit', '#formLogin', function (e) {
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
                    // aca es el evento: login ok, muestro todo
                    mostrarSesion(response.denominacion);
                } else {
                    mensajes('Error: ' + response.mensaje, 'error');
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

    // pide los empleados a la api y los dibuja en la pagina
    function cargarDatos() {
        $.ajax({
            url: BASE + 'empleados/api',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                let contEmpleados = '<div class="row g-3">';
                response.empleados.forEach(empelado=>{   
                    contEmpleados+= `
                            <!-- una columna por cada empleado -->
                            <div class="col-12 col-md-6 col-lg-4">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            <i class="fas fa-user"></i>${empelado.denominacion}
                                        </h5>
                                        <p class="card-text mb-1">
                                            <i class="fas fa-envelope"></i>${empelado.correo}
                                        </p>
                                        <p class="card-text mb-1">
                                            <i class="fas fa-briefcase"></i>${empelado.area}
                                        </p>
                                        <p class="card-text text-muted">
                                            <small><i class="fas fa-user-check"></i> Cargado por:${empelado.cargado_por}</small>
                                        </p>
                                    </div>
                                    <div class="card-footer text-end">
                                        <button type="button" class="btn btn-sm btn-outline-primary me-1 btn-editar" data-id="${empelado.id}">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-danger btn-borrar" data-id="${empelado.id}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>`;
                });
                contEmpleados+= '</div>';
                $('#ctnEmpleado').html(contEmpleados);
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    }

    // muestra los botones de carga y trae los datos del usuario
    function mostrarSesion(usuario) {
        $('#opcionesSesion').removeClass('d-none');
        $('#nombreUsuario').text(usuario);
        cargarDatos();
    }

    // al cargar la pagina pregunto si ya hay sesion (por si recargó)
    $.ajax({
        url: BASE + 'usuarios/sesion',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.logueado) {
                mostrarSesion(response.denominacion);
            }
        }
    });

});