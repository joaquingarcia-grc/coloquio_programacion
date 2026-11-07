    <main class="contenido">
        <div class="row g-3">
            <!-- tabla de usuarios (el js le llena el tbody) -->
            <div class="col-12">
                <section class="tarjeta-formulario" id="seccionTablaUsu">
                    <div class="tarjeta-encabezado d-flex justify-content-between align-items-center">
                        <h2>Lista de usuarios</h2>
                        <button type="button" class="boton-principal" id="botonNuevoUsu" data-bs-toggle="modal" data-bs-target="#modalUsuario">
                            <i class="fas fa-user-plus"></i> Nuevo usuario
                        </button>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" id="buscadorTablaUsu" placeholder="Buscar...">
                    </div>
                    <table class="table table-hover align-middle" id="tablaDatosUsu">
                        <thead>
                            <tr>
                                <th>Denominación</th>
                                <th>Correo</th>
                                <th>Fecha de alta</th>
                                <th class="text-end">Ver</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaUsu"></tbody>
                    </table>
                </section>
            </div>
        </div>

        <!-- modal con el form de cargar usuario -->
        <div class="modal fade" id="modalUsuario" tabindex="-1" aria-labelledby="tituloModalUsuario" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="tituloModalUsuario"><i class="fas fa-user-plus"></i> Cargar usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <p>Completá los datos del nuevo usuario</p>
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
                    </div>
                </div>
            </div>
        </div>
    </main>