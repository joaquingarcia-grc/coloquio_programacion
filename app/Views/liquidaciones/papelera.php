    <main class="contenido">
        <!-- mensaje simple, el js lo muestra y lo oculta solo -->
        <div id="mensaje" class="alert d-none"></div>
        <div class="row g-3">
            <!-- tabla de la papelera de liquidaciones (el js le llena el tbody) -->
            <div class="col-12">
                <section class="tarjeta-formulario" id="seccionTablaPapLiq">
                    <div class="tarjeta-encabezado d-flex justify-content-between align-items-center">
                        <h2>Papelera de liquidaciones</h2>
                        <a href="<?= base_url('liquidaciones') ?>" class="boton-secundario text-decoration-none" id="botonVolverLiq">
                            <i class="fas fa-list"></i> Lista de liquidaciones
                        </a>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" id="buscadorPapLiq" placeholder="Buscar...">
                    </div>
                    <table class="table table-hover align-middle" id="tablaDatosPapLiq">
                        <thead>
                            <tr>
                                <th>Empleado</th>
                                <th>Fecha de vencimiento</th>
                                <th>Monto</th>
                                <th>Fecha emitido</th>
                                <th class="text-end">Recuperar</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaPapLiq"></tbody>
                    </table>
                </section>
            </div>
        </div>
    </main>