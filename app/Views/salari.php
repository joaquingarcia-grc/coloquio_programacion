<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $titulo?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href='<?php echo base_url()?>css/estilos.css' rel="stylesheet">
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- Barra superior -->
    <header class="barra-superior">
        <a class="marca" href='<?php echo base_url()?>'>Panel Administrativo</a>
        <button class="boton-menu" id="botonMenu" type="button">
            <i class="fas fa-bars"></i>
        </button>
        <!-- boton del reporte de avisos, aparece recien cuando se loguea -->
        <button type="button" class="btn btn-sm btn-light border-0 text-secondary position-relative ms-auto me-2 d-none" id="btnReporte" title="Ver reporte">
            <i class="fas fa-bell"></i> Ver reporte
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none" id="cantAvisos">0</span>
        </button>
        <div class="dropdown usuario">
            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-user"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item" id='formuLogueo'>Loguearse</button></li>
                <li><button class="dropdown-item"  id="btnRegistro">Registrarse</button></li>
                <li><button class="dropdown-item" id='btnSalir'>Cerrar sesión</button></li>
            </ul>
        </div>
    </header>
    <!-- un solo main, adentro van los formularios y las tablas -->
    <main class="contenido">
        <!-- login y registro van solos en el medio -->
        <div class="mx-auto mb-3" id="ctnLogin" style="max-width: 540px;"></div>
        <!-- todo en una sola columna a lo ancho, ya armado y oculto: form empleado, tabla empleados, form liquidacion, tabla liquidaciones -->
        <div id="ctnFormularios">
            <!-- form de cargar empleado -->
            <div class="mb-3 d-none" id="colEmpleado">
                <section class="tarjeta-formulario">
                    <button type="button" class="boton-cerrar" id="botonCerrarEmp">
                        <i class="fas fa-xmark"></i>
                    </button>
                    <div class="tarjeta-encabezado">
                        <h2><i class="fas fa-user-plus"></i> Cargar empleado</h2>
                        <p>Completá los datos del nuevo empleado</p>
                    </div>
                    <form id="formEmpleado" class="row g-3" method="post" action="">
                        <div class="col-md-4">
                            <label for="denominacionEmp" class="form-label">Nombre y apellido</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input type="text" class="form-control" id="denominacionEmp" name="denominacion" required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="correoEmp" class="form-label">Correo</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                <input type="email" class="form-control" id="correoEmp" name="correo" required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="areaEmp" class="form-label">Área</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-briefcase"></i></span>
                                <input type="text" class="form-control" id="areaEmp" name="area" required>
                            </div>
                        </div>
                        <div class="col-12 acciones-formulario">
                            <button type="button" class="boton-secundario" id="botonCancelarEmp">Cancelar</button>
                            <button type="submit" class="boton-principal">
                                <i class="fas fa-save"></i> Guardar
                            </button>
                        </div>
                    </form>
                </section>
            </div>
            <!-- tabla de empleados (el js le llena el tbody) -->
            <section class="tarjeta-formulario mb-3 d-none" id="seccionTablaEmp">
                <button type="button" class="boton-cerrar" id="botonCerrarTablaEmp">
                    <i class="fas fa-xmark"></i>
                </button>
                <div class="tarjeta-encabezado">
                    <h2 id="tituloTablaEmp">Lista de empleados</h2>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                    <input type="text" class="form-control" id="buscadorTablaEmp" placeholder="Buscar...">
                </div>
                <!-- alto fijo, cuando se llena aparece la barra de scroll -->
                <div class="table-responsive" style="height: 320px; overflow-y: auto;">
                    <table class="table table-hover align-middle" id="tablaDatosEmp">
                        <thead class="sticky-top" style="background-color: var(--bs-body-bg);">
                            <tr>
                                <th>Denominación</th>
                                <th>Correo</th>
                                <th>Área</th>
                                <th>Cargado por</th>
                                <th class="text-end">Ver</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaEmp"></tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-end gap-1 mt-3">
                    <button type="button" class="btn btn-sm btn-light border-0 text-secondary" id="botonImprimirEmp" title="Imprimir">
                        <i class="fas fa-print"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-light border-0 text-secondary" id="botonPapeleraEmp" title="Papelera">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </section>
            <!-- form de generar liquidacion -->
            <div class="mb-3 d-none" id="colLiquidacion">
                <section class="tarjeta-formulario">
                    <button type="button" class="boton-cerrar" id="botonCerrarLiq">
                        <i class="fas fa-xmark"></i>
                    </button>
                    <div class="tarjeta-encabezado">
                        <h2><i class="fas fa-file-invoice-dollar"></i> Generar liquidación</h2>
                        <p>Elegí el empleado y completá los datos de la liquidación</p>
                    </div>
                    <form id="formLiquidacion" class="row g-3" method="post" action="">
                        <div class="col-md-3 position-relative">
                            <label for="buscadorEmpleado" class="form-label">Empleado</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                                <input type="text" class="form-control" id="buscadorEmpleado" placeholder="Escribí el nombre del empleado..." autocomplete="off">
                            </div>
                            <input type="hidden" id="id_empleado" name="id_empleado">
                            <!-- flota debajo del input, aparece solo cuando se tipea -->
                            <div class="list-group position-absolute shadow d-none" id="listaEmpleados" style="max-height: 200px; overflow-y: auto; z-index: 5; left: 12px; right: 12px;"></div>
                        </div>
                        <div class="col-md-3">
                            <label for="fecha_liquidacion" class="form-label">Fecha de liquidación</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-calendar-days"></i></span>
                                <input type="date" class="form-control" id="fecha_liquidacion" name="fecha_liquidacion" required>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label for="fecha_vencimiento" class="form-label">Fecha de vencimiento</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-hourglass-end"></i></span>
                                <input type="date" class="form-control" id="fecha_vencimiento" name="fecha_vencimiento" required>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label for="monto" class="form-label">Monto a liquidar</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                <input type="number" class="form-control" id="monto" name="monto" min="0" step="0.01" required>
                            </div>
                        </div>
                        <div class="col-12 acciones-formulario">
                            <button type="button" class="boton-secundario" id="botonCancelarLiq">Cancelar</button>
                            <button type="submit" class="boton-principal">
                                <i class="fas fa-save"></i> Guardar
                            </button>
                        </div>
                    </form>
                </section>
            </div>
            <!-- tabla de liquidaciones (el js le llena el tbody) -->
            <section class="tarjeta-formulario mb-3 d-none" id="seccionTablaLiq">
                <button type="button" class="boton-cerrar" id="botonCerrarTablaLiq">
                    <i class="fas fa-xmark"></i>
                </button>
                <div class="tarjeta-encabezado">
                    <h2 id="tituloTablaLiq">Lista de liquidaciones</h2>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                    <input type="text" class="form-control" id="buscadorTablaLiq" placeholder="Buscar...">
                </div>
                <!-- alto fijo, cuando se llena aparece la barra de scroll -->
                <div class="table-responsive" style="height: 320px; overflow-y: auto;">
                    <table class="table table-hover align-middle" id="tablaDatosLiq">
                        <thead class="sticky-top" style="background-color: var(--bs-body-bg);">
                            <tr>
                                <th>Cargado por</th>
                                <th>Empleado</th>
                                <th>Fecha de liquidación</th>
                                <th>Fecha de vencimiento</th>
                                <th>Monto</th>
                                <th>Fecha emitido</th>
                                <th class="text-end">Ver</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaLiq"></tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-end gap-1 mt-3">
                    <button type="button" class="btn btn-sm btn-light border-0 text-secondary" id="botonImprimirLiq" title="Imprimir">
                        <i class="fas fa-print"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-light border-0 text-secondary" id="botonPapeleraLiq" title="Papelera">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </section>
        </div>
    </main>
    <!-- Barra lateral -->
    <aside class="barra-lateral" id="menuLateral">
        <nav class="menu" id="menuAcordeon">
            <div id="opcionesSesion" class="d-none">
                <div class="menu-titulo">Empleado</div>
                <button type="button" class="menu-link" id="crgEmpleado">
                    <i class="fas fa-user-plus"></i> Cargar empleado
                </button>
                <button type="button" class="menu-link" id="crgLiquidacion">
                    <i class="fas fa-file-invoice-dollar"></i> Generar liquidación
                </button>

                <div class="menu-titulo">Listas</div>
                <button type="button" class="menu-link" id="verListaEmpleados">
                    <i class="fas fa-users"></i> Lista de empleados
                </button>
                <button type="button" class="menu-link" id="verListaLiquidaciones">
                    <i class="fas fa-list"></i> Lista de liquidaciones
                </button>
            </div>
        </nav>
        <div class="pie-lateral">
            <small>Sesión iniciada como:</small>
            <div id="nombreUsuario">Usuario</div>
        </div>
    </aside>
    <!-- modal para ver el detalle de empleado o liquidacion -->
    <div class="modal fade" id="modalDetalle" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDetalleTitulo"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="modalDetalleCuerpo"></div>
                <div class="modal-footer" id="modalDetallePie"></div>
            </div>
        </div>
    </div>
    <!-- barra que se desliza desde la derecha con el reporte de avisos (el js llena #ctnAvisos) -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="panelReporte">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title"><i class="fas fa-bell"></i> Reporte de liquidaciones</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body" id="ctnAvisos"></div>
        <!-- pie con el boton de imprimir, aparece solo cuando hay avisos -->
        <div class="d-none d-flex justify-content-end p-3 border-top" id="pieAvisos">
            <button type="button" class="btn btn-sm btn-light border-0 text-secondary" id="botonImprimirAvisos" title="Imprimir">
                <i class="fas fa-print"></i>
            </button>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script>
        const BASE = "<?php echo base_url();?>";
        const VEMP = <?php echo json_encode($empleados, JSON_HEX_TAG); ?>;
    </script>
    <script src='<?php echo base_url();?>js/liquidaciones.js'></script> 
    <script src='<?php echo base_url();?>js/empleados.js'></script>
    <script src='<?php echo base_url();?>js/script.js'></script>
</body>
</html>