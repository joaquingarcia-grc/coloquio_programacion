$(document).ready(function(){
    //------------------------------------------------------------------------------------------------//
    //reporte de liquidaciones por vencer
    cargarReporte();
    //cada 30 segundos vuelve a pedir el reporte solo, para no tener que recargar la pagina
    setInterval(cargarReporte, 30000);
    //esta funcion pide el reporte al controlador y actualiza el numerito de la campanita
    function cargarReporte(){
        $.ajax({
            url: BASE + 'liquidaciones/reporte',
            method: 'GET',
            dataType: 'json',
            //cache false para que el navegador no me devuelva el reporte viejo
            cache: false,
            success: function(response){
                //armamos las filas del reporte
                let filasReporte = '';
                response.avisos.forEach(aviso => {
                    //pasado por .text() para que no se rompa el html si trae simbolos raros
                    const empleado = $('<div>').text(aviso.empleado).html();
                    //texto segun los dias que faltan
                    let textoAviso;
                    if (aviso.faltan == 0){
                        textoAviso = 'Hoy se acredita';
                    }else if (aviso.faltan == 1){
                        textoAviso = 'Mañana';
                    }else{
                        textoAviso = 'En ' + aviso.faltan + ' días';
                    }
                    //una fila por cada liquidacion por vencer
                    filasReporte += `
                                    <tr>
                                        <td>${empleado}</td>
                                        <td>${aviso.monto}</td>
                                        <td>${aviso.fecha_vencimiento}</td>
                                        <td>${textoAviso}</td>
                                    </tr>`;
                });
                //metemos las filas en el tbody del reporte
                $('#cuerpoReporte').html(filasReporte);

                //numerito rojo con la cantidad de avisos, si no hay se oculta
                if (response.avisos.length > 0){
                    $('#cantAvisos').text(response.avisos.length);
                    $('#cantAvisos').removeClass('d-none');
                    $('#sinAvisos').addClass('d-none');
                    $('#tablaReporte').removeClass('d-none');
                }else{
                    $('#cantAvisos').addClass('d-none');
                    $('#sinAvisos').removeClass('d-none');
                    $('#tablaReporte').addClass('d-none');
                }
            },
            //fallo la peticion en si
            error: function(){
                console.log('Error en el servidor al pedir el reporte');
            }
        });
    }
    //------------------------------------------------------------------------------------------------//
    //el boton "Ver reporte" vuelve a pedir el reporte y abre o cierra la barra lateral derecha
    $('#btnReporte').on('click', function(){
        cargarReporte();
        $('#panelReporte').toggleClass('abierto');
    });

    //la cruz cierra la barra del reporte
    $('#cerrarReporte').on('click', function(){
        $('#panelReporte').removeClass('abierto');
    });
    //------------------------------------------------------------------------------------------------//
    //el boton imprimir abre una ventana con el reporte y manda a imprimir
    //copia el head de la pagina para usar los css que ya estan cargados en el html
    $('#btnImprimirReporte').on('click', function(){
        const ventana = window.open('', '_blank');
        ventana.document.write(`
            <html>
                <head>${document.head.innerHTML}</head>
                <body class="p-4">
                    <h4>Liquidaciones por vencer</h4>
                    ${$('#contenidoReporte').html()}
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