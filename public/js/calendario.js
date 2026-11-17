$(document).ready(function(){
    const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    let fechaVista = new Date();//mes que se esta viendo
    fechaVista.setDate(1);//siempre en el dia 1 para que no se salte meses al navegar
    let liquidaciones = [];//todas las liquidaciones del usuario, activas y vencidas
    //------------------------------------------------------------------------------------------------//
    //arma una fecha en texto aaaa-mm-dd, igual que viene de la base
    function aTexto(anio, mes, dia){
        return anio + '-' + String(mes + 1).padStart(2, '0') + '-' + String(dia).padStart(2, '0');
    }
    //fecha de hoy en texto para comparar con las de las liquidaciones
    const h = new Date();
    const HOY = aTexto(h.getFullYear(), h.getMonth(), h.getDate());
    //------------------------------------------------------------------------------------------------//
    //solo se arma si estamos en la pagina del calendario
    if ($('#cuerpoCalendario').length > 0){
        cargarLiquidaciones();
    }
    //pide las liquidaciones al controlador y dibuja el calendario
    function cargarLiquidaciones(){
        $.ajax({
            url: BASE + 'liquidaciones/calendario',
            method: 'GET',
            dataType: 'json',
            success: function(response){
                liquidaciones = response.liquidaciones;
                dibujarCalendario();
            },
            error: function(){
                console.log('Error en el servidor al pedir las liquidaciones del calendario');
            }
        });
    }
    //------------------------------------------------------------------------------------------------//
    //dibuja la grilla del mes que se esta viendo
    function dibujarCalendario(){
        const anio = fechaVista.getFullYear();
        const mes = fechaVista.getMonth();
        $('#tituloMes').text(MESES[mes] + ' ' + anio);
        //la semana arranca en lunes: getDay() da 0 para domingo, lo corremos
        const vacios = (new Date(anio, mes, 1).getDay() + 6) % 7;
        const diasMes = new Date(anio, mes + 1, 0).getDate();
        //contamos cuantas liquidaciones vencen cada dia
        let cantidad = {};
        //y guardamos los dias que tienen alguna liquidacion borrada
        let borradas = {};
        liquidaciones.forEach(liquidacion => {
            const fecha = liquidacion.fecha_vencimiento.substring(0, 10);
            if (cantidad[fecha]){
                cantidad[fecha]++;
            }else{
                cantidad[fecha] = 1;
            }
            //si tiene fecha_baja es porque fue borrada
            if (liquidacion.fecha_baja){
                borradas[fecha] = true;
            }
        });
        //armamos las celdas: primero los vacios del principio, despues los dias
        let celdas = [];
        for (let i = 0; i < vacios; i++){
            celdas.push('<td></td>');
        }
        for (let dia = 1; dia <= diasMes; dia++){
            const fecha = aTexto(anio, mes, dia);
            let contenido = '<div>' + dia + '</div>';
            //si ese dia vence alguna liquidacion ponemos el numerito y el ojito
            if (cantidad[fecha]){
                //rojo vencidas, verde las de hoy, azul las pendientes
                let color;
                if (fecha < HOY){
                    color = 'danger';
                }else if (fecha == HOY){
                    color = 'success';
                }else{
                    color = 'primary';
                }
                //color del ojito: gris normal, rojo si ese dia hay alguna borrada
                let colorOjo;
                if (borradas[fecha]){
                    colorOjo = 'danger';
                    //el numerito tambien se pone rojo
                    color = 'danger';
                }else{
                    colorOjo = 'secondary';
                }
                contenido += `
                            <span class="badge rounded-pill bg-${color}">${cantidad[fecha]}</span>
                            <button type="button" class="btn btn-sm btn-outline-${colorOjo} border-0" id="verDia_${fecha}" data-fecha="${fecha}">
                                <i class="fas fa-eye"></i>
                            </button>`;
            }
            celdas.push('<td>' + contenido + '</td>');
        }
        //completamos la ultima semana con celdas vacias
        while (celdas.length % 7 != 0){
            celdas.push('<td></td>');
        }
        //juntamos las celdas de a 7 por fila
        let filas = '';
        for (let i = 0; i < celdas.length; i += 7){
            filas += '<tr>' + celdas.slice(i, i + 7).join('') + '</tr>';
        }
        $('#cuerpoCalendario').html(filas);
    }
    //------------------------------------------------------------------------------------------------//
    //flechas para cambiar de mes
    $('#mesAnterior').on('click', function(){
        fechaVista.setMonth(fechaVista.getMonth() - 1);
        dibujarCalendario();
    });
    $('#mesSiguiente').on('click', function(){
        fechaVista.setMonth(fechaVista.getMonth() + 1);
        dibujarCalendario();
    });
    //------------------------------------------------------------------------------------------------//
    //el ojito abre el modal con la lista de liquidaciones de ese dia (el cuerpo se arma de nuevo, por eso delegamos)
    $('#cuerpoCalendario').on('click', 'button[id^="verDia_"]', function(){
        const fecha = $(this).data('fecha');
        //pasamos aaaa-mm-dd a dd/mm/aaaa para mostrarlo
        const partes = fecha.split('-');
        $('#tituloDia').text('Liquidaciones del ' + partes[2] + '/' + partes[1] + '/' + partes[0]);
        let items = '';
        liquidaciones.forEach(liquidacion => {
            //solo las de ese dia
            if (liquidacion.fecha_vencimiento.substring(0, 10) == fecha){
                //pasado por .text() para que no se rompa el html si trae simbolos raros
                const empleado = $('<div>').text(liquidacion.empleado).html();
                //si tiene fecha_baja es porque fue borrada: se marca en rojo y se avisa
                if (liquidacion.fecha_baja){
                    items += `
                            <li class="list-group-item list-group-item-danger">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span>${empleado} - $${liquidacion.monto}</span>
                                    <span class="badge bg-danger">Borrada</span>
                                </div>
                                <small><i class="fas fa-triangle-exclamation"></i> Este dato fue borrado</small>
                            </li>`;
                }else{
                    //estado segun la fecha
                    let estado;
                    if (fecha < HOY){
                        estado = '<span class="badge bg-danger">Vencida</span>';
                    }else if (fecha == HOY){
                        estado = '<span class="badge bg-success">Hoy</span>';
                    }else{
                        estado = '<span class="badge bg-primary">Pendiente</span>';
                    }
                    items += `
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>${empleado} - $${liquidacion.monto}</span>
                                ${estado}
                            </li>`;
                }
            }
        });
        $('#listaDia').html(items);
        $('#modalListaDia').modal('show');
    });
    //------------------------------------------------------------------------------------------------//
    //el boton imprimir abre una ventana con lo que se esta viendo en el modal y manda a imprimir
    //copia el head de la pagina para usar los css que ya estan cargados en el html
    $('#btnImprimirDia').on('click', function(){
        //el titulo pasado por .text() para que no se rompa el html
        const titulo = $('<div>').text($('#tituloDia').text()).html();
        const ventana = window.open('', '_blank');
        ventana.document.write(`
            <html>
                <head>${document.head.innerHTML}</head>
                <body class="p-4">
                    <h4>${titulo}</h4>
                    ${$('#contenidoListaDia').html()}
                </body>
            </html>`);
        ventana.document.close();
        //esperamos a que la ventana termine de cargar (css incluidos) antes de imprimir, si no sale en blanco
        ventana.onload = function(){
            ventana.focus();
            ventana.print();
            ventana.close();
        };
    });
});