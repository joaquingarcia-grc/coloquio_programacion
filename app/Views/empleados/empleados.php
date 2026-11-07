    <main class="contenido">
        <div class="row g-3">
            <!-- tabla de empleados (el js le llena el tbody) -->
            <div class="col-lg-8">
                <section class="tarjeta-formulario" id="seccionTablaEmp">
                    <div class="tarjeta-encabezado">
                        <h2>Lista de empleados</h2>
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
                </section>
            </div>
            <!-- form de cargar empleado -->
            <div class="col-lg-4">
                <section class="tarjeta-formulario">
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
                        <div class="col-12">
                            <label for="correo" class="form-label">Correo</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                <input type="email" class="form-control" id="correo" name="correo" required>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="area" class="form-label">Área</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-briefcase"></i></span>
                                <input type="text" class="form-control" id="area" name="area" required>
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
        </div>
    </main>