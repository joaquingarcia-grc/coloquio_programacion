$(document).ready(function(){

    var nombresMes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var hoy = new Date();
    var mes = hoy.getMonth();
    var anio = hoy.getFullYear();
    // las liquidaciones que trae el servidor y las marcas por fecha (asi no recorro todo por cada celda)
    var liquidaciones = [];
    var marcas = {};

    // arma el texto yyyy-mm-dd igual que viene de la base, sin pasar por Date (evita lios de zona horaria)
    function armarFecha(a, m, d) {
        var mm = '' + (m + 1);
        var dd = '' + d;
        if (mm.length < 2) {
            mm = '0' + mm;
        }
        if (dd.length < 2) {
            dd = '0' + dd;
        }
        return a + '-' + mm + '-' + dd;
    }

    // si la fecha todavia no tiene marcas la crea vacia
    function asegurarMarca(fecha) {
        if (marcas[fecha] === undefined) {
            marcas[fecha] = { vencida: false, pendiente: false, liquidar: false };
        }
    }

    // recorre las liquidaciones una sola vez y anota que colores le tocan a cada fecha
    function armarMarcas() {
        marcas = {};
        liquidaciones.forEach(function (liq) {
            // rojo o azul van en el dia de vencimiento
            asegurarMarca(liq.fecha_vencimiento);
            if (liq.estado === 'vencida') {
                marcas[liq.fecha_vencimiento].vencida = true;
            } else {
                marcas[liq.fecha_vencimiento].pendiente = true;
            }
            // verde va en el dia de liquidacion
            asegurarMarca(liq.fecha_liquidacion);
            marcas[liq.fecha_liquidacion].liquidar = true;
        });
    }

    // un puntito de color
    function punto(clase, titulo) {
        return '<span class="d-inline-block rounded-circle ' + clase + '" style="width: 8px; height: 8px;" title="' + titulo + '"></span>';
    }

    // dibuja el mes que esta en las variables mes y anio
    function dibujarMes() {
        $('#tituloMes').text(nombresMes[mes] + ' ' + anio);
        // lunes primero: getDay() da 0 para domingo, lo corro para que el lunes sea 0
        var primerDia = new Date(anio, mes, 1).getDay();
        var hueco = (primerDia + 6) % 7;
        var diasMes = new Date(anio, mes + 1, 0).getDate();
        var fechaHoy = armarFecha(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        var filas = '';
        var dia = 1;
        // como mucho 6 semanas
        for (var semana = 0; semana < 6; semana++) {
            if (dia > diasMes) {
                break;
            }
            filas += '<tr>';
            for (var col = 0; col < 7; col++) {
                if ((semana === 0 && col < hueco) || dia > diasMes) {
                    // celda vacia (antes del dia 1 o despues del ultimo)
                    filas += '<td class="bg-body-tertiary"></td>';
                } else {
                    var fecha = armarFecha(anio, mes, dia);
                    var marca = marcas[fecha];
                    var clase = 'text-center align-top p-1';
                    if (fecha === fechaHoy) {
                        clase = clase + ' table-active';
                    }
                    var puntos = '';
                    var ojo = '';
                    if (marca !== undefined) {
                        if (marca.vencida) {
                            puntos += punto('bg-danger', 'Vencidas');
                        }
                        if (marca.pendiente) {
                            puntos += punto('bg-primary', 'Pendientes');
                        }
                        if (marca.liquidar) {
                            puntos += punto('bg-success', 'Se liquidan este dia');
                        }
                        // el ojito aparece en cualquier dia que tenga alguna marca
                        ojo = '<button type="button" class="btn btn-sm btn-link text-secondary p-0" id="verDia_' + fecha + '" title="Ver liquidaciones del dia"><i class="fas fa-eye"></i></button>';
                    }
                    filas += '<td class="' + clase + '" style="height: 72px;">'
                        + '<div class="small fw-semibold">' + dia + '</div>'
                        + '<div class="d-flex justify-content-center gap-1 my-1">' + puntos + '</div>'
                        + ojo
                        + '</td>';
                    dia = dia + 1;
                }
            }
            filas += '</tr>';
        }
        $('#cuerpoCalendario').html(filas);
    }

    // boton del menu lateral: trae las liquidaciones, arma el calendario y abre el modal
    $('#verCalendario').on('click', function () {
        hoy = new Date();
        mes = hoy.getMonth();
        anio = hoy.getFullYear();
        $('#detalleDia').addClass('d-none');
        $.ajax({
            url: BASE + 'liquidaciones/calendario',
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (response) {
                liquidaciones = response.liquidaciones;
                armarMarcas();
                dibujarMes();
                bootstrap.Modal.getOrCreateInstance($('#modalCalendario')[0]).show();
            },
            error: function () {
                mensajes('Error en el servidor', 'error');
            }
        });
    });

    // mes anterior
    $('#mesAnterior').on('click', function () {
        mes = mes - 1;
        if (mes < 0) {
            mes = 11;
            anio = anio - 1;
        }
        $('#detalleDia').addClass('d-none');
        dibujarMes();
    });

    // mes siguiente
    $('#mesSiguiente').on('click', function () {
        mes = mes + 1;
        if (mes > 11) {
            mes = 0;
            anio = anio + 1;
        }
        $('#detalleDia').addClass('d-none');
        dibujarMes();
    });

    // ojito de un dia: lista las que se liquidan o vencen ese dia (vencidas incluidas)
    $('#modalCalendario').on('click', '[id^="verDia_"]', function () {
        var fecha = this.id.replace('verDia_', '');
        var partes = fecha.split('-');
        $('#tituloDia').text('Liquidaciones del ' + partes[2] + '/' + partes[1] + '/' + partes[0]);
        $('#listaDia').empty();
        liquidaciones.forEach(function (liq) {
            if (liq.fecha_liquidacion === fecha || liq.fecha_vencimiento === fecha) {
                var item = $('<div class="list-group-item"></div>');
                // nombre del empleado
                item.append($('<div class="fw-semibold"></div>').text(liq.empleado));
                // monto
                item.append($('<small class="text-secondary d-block"></small>').text('$ ' + liq.monto));
                // fecha de liquidacion y de vencimiento
                item.append($('<small class="text-secondary d-block"></small>').text('Fecha de liquidación: ' + liq.fecha_liquidacion));
                item.append($('<small class="text-secondary d-block"></small>').text('Fecha de vencimiento: ' + liq.fecha_vencimiento));
                // por que sale en este dia
                if (liq.fecha_liquidacion === fecha) {
                    item.append($('<small class="text-success d-block"></small>').text('Se liquida este día'));
                }
                if (liq.fecha_vencimiento === fecha) {
                    item.append($('<small class="text-danger d-block"></small>').text('Vence este día'));
                }
                // estado con su color
                var estado = $('<span class="badge mt-1"></span>');
                if (liq.estado === 'vencida') {
                    estado.addClass('bg-danger').text('Vencida');
                } else {
                    estado.addClass('bg-primary').text('Pendiente');
                }
                item.append(estado);
                $('#listaDia').append(item);
            }
        });
        $('#detalleDia').removeClass('d-none');
    });
});