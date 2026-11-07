    <main class="contenido">
        <div class="row g-3">
            <!-- tabla de liquidaciones (el js le llena el tbody) -->
            <div class="col-lg-8">
                <section class="tarjeta-formulario" id="seccionTablaLiq">
                    <div class="tarjeta-encabezado">
                        <h2>Lista de liquidaciones</h2>
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
                </section>
            </div>
            <!-- form de generar liquidacion -->
            <div class="col-lg-4">
                <section class="tarjeta-formulario">
                    <div class="tarjeta-encabezado">
                        <h2><i class="fas fa-file-invoice-dollar"></i> Generar liquidación</h2>
                        <p>Elegí el empleado y completá los datos de la liquidación</p>
                    </div>
                    <form id="formLiquidacion" class="row g-3" method="post" action="">
                        <div class="col-12 position-relative">
                            <label for="buscadorEmpleado" class="form-label">Empleado</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                                <input type="text" class="form-control" id="buscadorEmpleado" placeholder="Escribí el nombre del empleado..." autocomplete="off">
                            </div>
                            <input type="hidden" id="id_empleado" name="id_empleado">
                            <!-- flota debajo del input, aparece solo cuando se tipea -->
                            <div class="list-group position-absolute shadow d-none" id="listaEmpleados" style="max-height: 200px; overflow-y: auto; z-index: 5; left: 12px; right: 12px;"></div>
                        </div>
                        <div class="col-12">
                            <label for="fecha_liquidacion" class="form-label">Fecha de liquidación</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-calendar-days"></i></span>
                                <input type="date" class="form-control" id="fecha_liquidacion" name="fecha_liquidacion" required>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="fecha_vencimiento" class="form-label">Fecha de vencimiento</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-hourglass-end"></i></span>
                                <input type="date" class="form-control" id="fecha_vencimiento" name="fecha_vencimiento" required>
                            </div>
                        </div>
                        <div class="col-12">
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
        </div>
    </main>