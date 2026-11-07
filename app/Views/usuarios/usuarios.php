    <main class="contenido">
        <div class="row g-3">
            <!-- tabla de usuarios (el js le llena el tbody) -->
            <div class="col-lg-8">
                <section class="tarjeta-formulario" id="seccionTablaUsu">
                    <div class="tarjeta-encabezado">
                        <h2>Lista de usuarios</h2>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" id="buscadorTablaUsu" placeholder="Buscar...">
                    </div>
                    <!-- alto fijo, cuando se llena aparece la barra de scroll -->
                    <div class="table-responsive" style="height: 320px; overflow-y: auto;">
                        <table class="table table-hover align-middle" id="tablaDatosUsu">
                            <thead class="sticky-top" style="background-color: var(--bs-body-bg);">
                                <tr>
                                    <th>Denominación</th>
                                    <th>Correo</th>
                                    <th>Fecha de alta</th>
                                    <th class="text-end">Ver</th>
                                </tr>
                            </thead>
                            <tbody id="cuerpoTablaUsu"></tbody>
                        </table>
                    </div>
                </section>
            </div>
            <!-- form de cargar usuario -->
            <div class="col-lg-4">
                <section class="tarjeta-formulario">
                    <div class="tarjeta-encabezado">
                        <h2><i class="fas fa-user-plus"></i> Cargar usuario</h2>
                        <p>Completá los datos del nuevo usuario</p>
                    </div>
                    <form id="formUsuario" class="row g-3" method="post" action="">
                        <div class="col-12">
                            <label for="denominacion" class="form-label">Denominación</label>
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
                            <button type="button" class="boton-secundario" id="botonCancelarUsu">Cancelar</button>
                            <button type="submit" class="boton-principal">
                                <i class="fas fa-save"></i> Guardar
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </main>