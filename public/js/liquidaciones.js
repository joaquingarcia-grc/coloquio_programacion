$(document).ready(function(){

    $('#crgLiquidacion').on('click', function () {
        // si ya esta abierto no lo duplico
        if ($('#colLiquidacion').length === 0) {
            var plantillaLiquidacion = `
                <div class="col-lg-6" id="colLiquidacion">
                    <section class="tarjeta-formulario">
                        <button type="button" class="boton-cerrar" id="botonCerrarLiq">
                            <i class="fas fa-xmark"></i>
                        </button>
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
                            <div class="col-md-6">
                                <label for="fecha_liquidacion" class="form-label">Fecha de liquidación</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-calendar-days"></i></span>
                                    <input type="date" class="form-control" id="fecha_liquidacion" name="fecha_liquidacion" required>
                                </div>
                            </div>
                            <div class="col-md-6">
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
            `;
            // append: se acomoda segun el orden en que se abre
            $('#ctnFormularios').append(plantillaLiquidacion);
        }
    });

    // la cruz y el cancelar cierran el form de liquidacion
    $('#ctnFormularios').on('click', '#botonCerrarLiq, #botonCancelarLiq', function () {
        $('#colLiquidacion').remove();
    });

    // al tipear muestra solo los empleados que coinciden (si no hay texto no muestra nada)
    $('#ctnFormularios').on('input', '#buscadorEmpleado', function () {
        var texto = $(this).val().toLowerCase().trim();
        var coincidencias = '';
        // si cambia el texto, el empleado elegido ya no vale
        $('#id_empleado').val('');
        if (texto === '') {
            $('#listaEmpleados').addClass('d-none').empty();
            return;
        }
        VEMP.forEach(function (empleado) {
            if (empleado.denominacion.toLowerCase().indexOf(texto) > -1) {
                coincidencias += `<button type="button" class="list-group-item list-group-item-action" id="elegirEmpleado_${empleado.id}">${empleado.denominacion}</button>`;
            }
        });
        if (coincidencias === '') {
            coincidencias = '<div class="list-group-item text-secondary">Sin resultados</div>';
        }
        $('#listaEmpleados').html(coincidencias).removeClass('d-none');
    });

    // al tocar un empleado: el nombre va al buscador, el id al campo oculto y se esconde la lista
    $('#ctnFormularios').on('click', '[id^="elegirEmpleado_"]', function () {
        var id = this.id.replace('elegirEmpleado_', '');
        $('#id_empleado').val(id);
        $('#buscadorEmpleado').val($(this).text().trim());
        $('#listaEmpleados').addClass('d-none').empty();
    });

    // cuando aprieto el boton de lista de liquidaciones, pide las liquidaciones a la api y las dibuja en una tabla
    $('#verListaLiquidaciones').on('click', function () {
        $.ajax({
            url: BASE + 'liquidaciones/api',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                let contLiquidaciones = `
                    <section class="tarjeta-formulario">
                        <button type="button" class="boton-cerrar" id="botonCerrarTabla">
                            <i class="fas fa-xmark"></i>
                        </button>
                        <div class="tarjeta-encabezado">
                            <h2 id="tituloTabla">Lista de liquidaciones</h2>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fas fa-magnifying-glass"></i></span>
                            <input type="text" class="form-control" id="buscadorTabla" placeholder="Buscar...">
                        </div>
                        <!-- alto fijo, cuando se llena aparece la barra de scroll -->
                        <div class="table-responsive" style="height: 320px; overflow-y: auto;">
                            <table class="table table-hover align-middle" id="tablaDatos">
                                <thead class="sticky-top" style="background-color: var(--bs-body-bg);">
                                    <tr>
                                        <th>Cargado por</th>
                                        <th>Empleado</th>
                                        <th>Fecha de liquidación</th>
                                        <th>Monto</th>
                                        <th>Fecha emitido</th>
                                        <th class="text-end">Ver</th>
                                    </tr>
                                </thead>
                                <tbody id="cuerpoTabla">`;
                response.liquidaciones.forEach(liquidacion => {
                    // una fila por cada liquidacion
                    contLiquidaciones += `
                                    <tr>
                                        <td>${liquidacion.cargado_por}</td>
                                        <td>${liquidacion.empleado}</td>
                                        <td>${liquidacion.fecha_liquidacion}</td>
                                        <td>$ ${liquidacion.monto}</td>
                                        <td>${liquidacion.fecha_alta}</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-sm btn-outline-primary" id="verLiquidacion_${liquidacion.id}" data-empleado="${liquidacion.empleado}" data-cargado="${liquidacion.cargado_por}" data-fecha="${liquidacion.fecha_liquidacion}" data-monto="${liquidacion.monto}" data-emitido="${liquidacion.fecha_alta}">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                });
                contLiquidaciones += `
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-end gap-1 mt-3">
                            <button type="button" class="btn btn-sm btn-light border-0 text-secondary" id="botonImprimir" title="Imprimir">
                                <i class="fas fa-print"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-light border-0 text-secondary" id="botonPapelera" title="Papelera">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </section>`;
                $('#ctnEmpleado2').html(contLiquidaciones);
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    });

    // ojito de liquidacion: abre el modal con los datos de la liquidacion
    $('#ctnEmpleado2').on('click', '[id^="verLiquidacion_"]', function () {
        var id = this.id.replace('verLiquidacion_', '');
        $('#modalDetalleTitulo').html('<i class="fas fa-file-invoice-dollar"></i> Datos de la liquidación');
        $('#modalDetalleCuerpo').html(`
            <dl class="row mb-0">
                <dt class="col-sm-5">Empleado</dt>
                <dd class="col-sm-7">${$(this).data('empleado')}</dd>
                <dt class="col-sm-5">Cargado por</dt>
                <dd class="col-sm-7">${$(this).data('cargado')}</dd>
                <dt class="col-sm-5">Fecha de liquidación</dt>
                <dd class="col-sm-7">${$(this).data('fecha')}</dd>
                <dt class="col-sm-5">Monto</dt>
                <dd class="col-sm-7">$ ${$(this).data('monto')}</dd>
                <dt class="col-sm-5">Fecha emitido</dt>
                <dd class="col-sm-7">${$(this).data('emitido')}</dd>
            </dl>`);
        $('#modalDetallePie').html(`
            <button type="button" class="btn btn-outline-primary" id="editarLiquidacion" data-id="${id}">
                <i class="fas fa-pen"></i> Editar
            </button>
            <button type="button" class="btn btn-outline-danger" id="borrarLiquidacion" data-id="${id}">
                <i class="fas fa-trash"></i> Borrar
            </button>`);
        bootstrap.Modal.getOrCreateInstance($('#modalDetalle')[0]).show();
    });
});