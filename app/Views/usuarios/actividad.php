    <main class="contenido">
        <!-- mensaje simple, el js lo muestra y lo oculta solo -->
        <div id="mensaje" class="alert d-none"></div>
        <div class="row g-3">
            <!-- tabla de actividad (el js le llena el tbody) -->
            <div class="col-12">
                <section class="tarjeta-formulario" id="seccionTablaAct">
                    <div class="tarjeta-encabezado d-flex justify-content-between align-items-center">
                        <h2>Actividad</h2>
                    </div>
                    <!-- aviso fijo: la actividad es solo la del usuario logueado -->
                    <div class="alert alert-info" role="alert">
                        <i class="fas fa-circle-info"></i> Solo se muestra la actividad de tu usuario.
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" id="buscadorAct" placeholder="Buscar...">
                    </div>
                    <table class="table table-hover align-middle" id="tablaDatosAct">
                        <thead>
                            <tr>
                                <th>Tabla</th>
                                <th>Empleado</th>
                                <th>Acción</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaAct"></tbody>
                    </table>
                </section>
            </div>
        </div>
    </main>