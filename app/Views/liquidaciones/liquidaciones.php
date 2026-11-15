    <main class="contenido">
        <!-- mensaje simple, el js lo muestra y lo oculta solo -->
        <div id="mensaje" class="alert d-none"></div>
        <div class="row g-3">
            <!-- tabla de liquidaciones (el js le llena el tbody) -->
            <div class="col-12">
                <section class="tarjeta-formulario" id="seccionTablaLiq">
                    <div class="tarjeta-encabezado d-flex justify-content-between align-items-center">
                        <h2>Lista de liquidaciones</h2>
                        <button type="button" class="boton-principal" id="botonNuevaLiq" data-bs-toggle="modal" data-bs-target="#modalLiquidacion">
                            <i class="fas fa-file-invoice-dollar"></i> Nueva liquidación
                        </button>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" id="buscadorLiq" placeholder="Buscar...">
                    </div>
                    <table class="table table-hover align-middle" id="tablaDatosLiq">
                        <thead>
                            <tr>
                                <th>Empleado</th>
                                <th>Fecha de vencimiento</th>
                                <th>Monto</th>
                                <th>Fecha emitido</th>
                                <th class="text-end">Ver</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaLiq"></tbody>
                    </table>
                </section>
            </div>
        </div>
        <!-- modal con el form de cargar liquidacion -->
        <div class="modal fade" id="modalLiquidacion" tabindex="-1" aria-labelledby="tituloModalLiquidacion" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="tituloModalLiquidacion"><i class="fas fa-file-invoice-dollar"></i> Generar liquidación</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <p>Completá los datos de la nueva liquidación</p>
                        <form id="formLiquidacion" class="row g-3" method="post" action="">
                            <div class="col-12">
                                <label for="empleadoLiq" class="form-label">Empleado</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    <input type="text" class="form-control" id="empleadoLiq" name="empleado" list="listaEmpleadosLiq" autocomplete="off" required>
                                    <datalist id="listaEmpleadosLiq"></datalist>
                                </div>
                                <!-- id del empleado elegido, lo completa el js -->
                                <input type="hidden" id="idEmpleadoLiq" name="id_empleado">
                            </div>
                            <div class="col-12">
                                <label for="fechaVencimiento" class="form-label">Fecha de vencimiento</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-calendar-day"></i></span>
                                    <input type="date" class="form-control" id="fechaVencimiento" name="fecha_vencimiento" required>
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="monto" class="form-label">Monto</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                    <input type="number" class="form-control" id="monto" name="monto" step="0.01" min="0" required>
                                </div>
                            </div>
                            <div class="col-12 acciones-formulario">
                                <button type="button" class="boton-secundario" id="botonCancelarLiq">Cancelar</button>
                                <button type="submit" class="boton-principal">
                                    <i class="fas fa-save"></i> Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal para ver los datos de la liquidacion, el lapiz lo convierte en formulario -->
        <div class="modal fade" id="modalVerLiquidacion" tabindex="-1" aria-labelledby="tituloModalVerLiquidacion" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="tituloModalVerLiquidacion"><i class="fas fa-file-invoice-dollar"></i> Datos de la liquidación</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="idLiquidacionVer">
                        <!-- vista de solo lectura -->
                        <div id="vistaDatosLiq">
                            <p class="mb-2"><strong>Empleado:</strong> <span id="verEmpleadoLiq"></span></p>
                            <p class="mb-2"><strong>Fecha de vencimiento:</strong> <span id="verVencimiento"></span></p>
                            <p class="mb-2"><strong>Monto:</strong> <span id="verMonto"></span></p>
                            <p class="mb-3"><strong>Fecha emitido:</strong> <span id="verEmitido"></span></p>
                            <!-- imprimir a la izquierda, aparte; lapiz y tachito a la derecha -->
                            <div class="d-flex justify-content-between align-items-center">
                                <button type="button" class="btn btn-outline-secondary" id="botonImprimirLiq" title="Imprimir">
                                    <i class="fas fa-print"></i>
                                </button>
                                <div class="acciones-formulario">
                                    <button type="button" class="boton-secundario" id="botonEditarLiq" title="Editar">
                                        <i class="fas fa-pen"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-danger" id="botonEliminarLiq" title="Eliminar">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- formulario de edicion, arranca oculto -->
                        <form id="formEditarLiq" class="row g-3 d-none">
                            <div class="col-12">
                                <label for="editEmpleadoLiq" class="form-label">Empleado</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    <input type="text" class="form-control" id="editEmpleadoLiq" name="empleado" list="listaEmpleadosLiq" autocomplete="off">
                                </div>
                                <!-- id del empleado elegido, lo completa el js -->
                                <input type="hidden" id="editIdEmpleadoLiq" name="id_empleado">
                            </div>
                            <div class="col-12">
                                <label for="editFechaVencimiento" class="form-label">Fecha de vencimiento</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-calendar-day"></i></span>
                                    <input type="date" class="form-control" id="editFechaVencimiento" name="fecha_vencimiento">
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="editMonto" class="form-label">Monto</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                    <input type="number" class="form-control" id="editMonto" name="monto" step="0.01" min="0">
                                </div>
                            </div>
                            <div class="col-12 acciones-formulario">
                                <button type="button" class="boton-secundario" id="botonCancelarEdicionLiq">Cancelar</button>
                                <button type="submit" class="boton-principal" id="botonGuardarEdicionLiq">
                                    <i class="fas fa-save"></i> Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal de confirmacion para borrar liquidacion -->
        <div class="modal fade" id="modalBorradoLIQ" tabindex="-1" aria-labelledby="tituloModalBorradoLIQ" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="tituloModalBorradoLIQ"><i class="fas fa-trash"></i> Borrar liquidación</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <p>¿Seguro que querés borrar esta liquidación?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="boton-secundario" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="btnBorradoLIQ">Borrar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>