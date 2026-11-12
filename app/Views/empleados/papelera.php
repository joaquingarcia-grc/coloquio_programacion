    <main class="contenido">
        <!-- mensaje simple, el js lo muestra y lo oculta solo -->
        <div id="mensaje" class="alert d-none"></div>
        <div class="row g-3">
            <!-- tabla de la papelera de empleados (el js le llena el tbody) -->
            <div class="col-12">
                <section class="tarjeta-formulario" id="seccionTablaPap">
                    <div class="tarjeta-encabezado d-flex justify-content-between align-items-center">
                        <h2>Papelera de empleados</h2>
                        <a href="<?= base_url('empleados') ?>" class="boton-secundario text-decoration-none" id="botonVolverEmp">
                            <i class="fas fa-list"></i> Lista de empleados
                        </a>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" id="buscadorPap" placeholder="Buscar...">
                    </div>
                    <table class="table table-hover align-middle" id="tablaDatosPap">
                        <thead>
                            <tr>
                                <th>Denominación</th>
                                <th>Correo</th>
                                <th>Área</th>
                                <th class="text-end">Recuperar</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaPap"></tbody>
                    </table>
                </section>
            </div>
        </div>
    </main>