    <main class="contenido">
        <!-- mensaje simple, el js lo muestra y lo oculta solo -->
        <div id="mensaje" class="alert d-none"></div>
        <div class="row g-3">
            <!-- tabla de empleados (el js le llena el tbody) -->
            <div class="col-12">
                <section class="tarjeta-formulario" id="seccionTablaEmp">
                    <div class="tarjeta-encabezado d-flex justify-content-between align-items-center">
                        <h2>Lista de empleados</h2>
                        <button type="button" class="boton-principal" id="botonNuevoEmp" data-bs-toggle="modal" data-bs-target="#modalEmpleado">
                            <i class="fas fa-user-plus"></i> Nuevo empleado
                        </button>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" id="buscadorEmp" placeholder="Buscar...">
                    </div>
                    <table class="table table-hover align-middle" id="tablaDatosEmp">
                        <thead>
                            <tr>
                                <th>Denominación</th>
                                <th>Correo</th>
                                <th>Área</th>
                                <th class="text-end">Ver</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaEmp"></tbody>
                    </table>
                </section>
            </div>
        </div>
        <!-- modal con el form de cargar empleado -->
        <div class="modal fade" id="modalEmpleado" tabindex="-1" aria-labelledby="tituloModalEmpleado" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="tituloModalEmpleado"><i class="fas fa-user-plus"></i> Cargar empleado</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <p>Completá los datos del nuevo empleado</p>
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
                    </div>
                </div>
            </div>
        </div>
        <!-- modal para ver los datos del empleado, el lapiz lo convierte en formulario -->
        <div class="modal fade" id="modalVerEmpleado" tabindex="-1" aria-labelledby="tituloModalVerEmpleado" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="tituloModalVerEmpleado"><i class="fas fa-user"></i> Datos del empleado</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="idEmpleadoVer">
                        <!-- vista de solo lectura -->
                        <div id="vistaDatosEmp">
                            <p class="mb-2"><strong>Nombre y apellido:</strong> <span id="verDenominacion"></span></p>
                            <p class="mb-2"><strong>Correo:</strong> <span id="verCorreo"></span></p>
                            <p class="mb-3"><strong>Área:</strong> <span id="verArea"></span></p>
                            <div class="acciones-formulario">
                                <button type="button" class="boton-secundario" id="botonEditarEmp" title="Editar">
                                    <i class="fas fa-pen"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger" id="botonEliminarEmp" title="Eliminar">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <!-- formulario de edicion, arranca oculto -->
                        <form id="formEditarEmp" class="row g-3 d-none">
                            <div class="col-12">
                                <label for="editDenominacion" class="form-label">Nombre y apellido</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    <input type="text" class="form-control" id="editDenominacion" name="denominacion">
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="editCorreo" class="form-label">Correo</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                    <input type="email" class="form-control" id="editCorreo" name="correo">
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="editArea" class="form-label">Área</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-briefcase"></i></span>
                                    <input type="text" class="form-control" id="editArea" name="area">
                                </div>
                            </div>
                            <div class="col-12 acciones-formulario">
                                <button type="button" class="boton-secundario" id="botonCancelarEdicion">Cancelar</button>
                                <button type="button" class="boton-principal" id="botonGuardarEdicion">
                                    <i class="fas fa-save"></i> Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>