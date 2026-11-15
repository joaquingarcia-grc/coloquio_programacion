    <main class="contenido">
        <div class="mx-auto mb-3" id="ctnLogin" style="max-width: 540px;"></div>
        <!-- calendario -->
        <div class="card mb-3" id="ctnCalendario">
            <!-- cabecera con las flechas y el mes que se esta viendo -->
            <div class="card-header d-flex justify-content-between align-items-center">
                <button type="button" class="btn btn-sm btn-outline-secondary" id="mesAnterior">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <h5 class="mb-0" id="tituloMes"></h5>
                <button type="button" class="btn btn-sm btn-outline-secondary" id="mesSiguiente">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="card-body">
                <table class="table table-bordered text-center mb-0" id="tablaCalendario">
                    <thead>
                        <tr>
                            <th>Lun</th>
                            <th>Mar</th>
                            <th>Mié</th>
                            <th>Jue</th>
                            <th>Vie</th>
                            <th>Sáb</th>
                            <th>Dom</th>
                        </tr>
                    </thead>
                    <!-- los dias se arman desde el js -->
                    <tbody id="cuerpoCalendario"></tbody>
                </table>
            </div>
        </div>
        <div id="ctnFormularios"></div>
    </main>

    <!-- modal con las liquidaciones del dia elegido con el ojito -->
    <div class="modal fade" id="modalListaDia" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tituloDia"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <!-- lo que se imprime -->
                <div class="modal-body" id="contenidoListaDia">
                    <ul class="list-group list-group-flush" id="listaDia"></ul>
                </div>
                <!-- boton de imprimir a la izquierda -->
                <div class="modal-footer justify-content-start">
                    <button type="button" class="btn btn-sm btn-secondary" id="btnImprimirDia">
                        <i class="fas fa-print"></i> Imprimir
                    </button>
                </div>
            </div>
        </div>
    </div>