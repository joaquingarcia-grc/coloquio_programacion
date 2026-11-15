<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $titulo?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href='<?php echo base_url()?>css/estilos.css' rel="stylesheet">
    <link href='<?php echo base_url()?>css/login.css' rel="stylesheet">
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/3.2.0/css/buttons.bootstrap5.min.css">
</head>
<body>
    <!-- Barra superior -->
    <header class="barra-superior">
        <a class="marca" href='<?php echo base_url()?>'>Panel Administrativo</a>
        <button class="boton-menu" id="botonMenu" type="button">
            <i class="fas fa-bars"></i>
        </button>
        <!-- boton del reporte de avisos -->
        <button type="button" class="btn btn-sm btn-light border-0 text-secondary position-relative ms-auto me-2" id="btnReporte" title="Ver reporte">
            <i class="fas fa-bell"></i> Ver reporte
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none" id="cantAvisos">0</span>
        </button>
        <div class="dropdown usuario">
            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-user"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item" id="btnActividad">Actividad</button></li>
                <li><button class="dropdown-item" id='btnSalir'>Cerrar sesión</button></li>
            </ul>
        </div>
    </header>
    <!-- Barra lateral -->
    <aside class="barra-lateral" id="menuLateral">
        <nav class="menu" id="menuAcordeon">
            <div id="opcionesSesion">
                <div class="menu-titulo">Empleado</div>
                <a class="menu-link" id="crgEmpleado" href="<?php echo base_url()?>empleados">
                    <i class="fas fa-id-badge"></i> Empleados
                </a>
                <a class="menu-link" id="crgLiquidacion" href="<?php echo base_url()?>liquidaciones">
                    <i class="fas fa-file-invoice-dollar"></i> Liquidaciones
                </a>
                <a class="menu-link" id="crgCalendario" href="<?php echo base_url()?>calendario">
                    <i class="fas fa-calendar-days"></i> Calendario
                </a>
            </div>
        </nav>
        <div class="pie-lateral">
            <small>Sesión iniciada como:</small>
            <div><?php echo $usuario?></div>
        </div>
    </aside>
    <!-- Barra lateral derecha del reporte -->
    <aside id="panelReporte" class="panel-reporte">
        <!-- titulo y cruz para cerrar -->
        <div class="panel-reporte-cabecera">
            <h6 class="mb-0">Liquidaciones por vencer</h6>
            <button type="button" class="btn-close" id="cerrarReporte"></button>
        </div>
        <!-- contenido del reporte, esto es lo que se imprime -->
        <div class="panel-reporte-cuerpo" id="contenidoReporte">
            <p id="sinAvisos" class="text-muted d-none">No hay liquidaciones por vencer.</p>
            <table class="table table-sm" id="tablaReporte">
                <thead>
                    <tr>
                        <th>Empleado</th>
                        <th>Monto</th>
                        <th>Vence</th>
                        <th>Aviso</th>
                    </tr>
                </thead>
                <tbody id="cuerpoReporte"></tbody>
            </table>
        </div>
        <!-- pie con el boton de imprimir abajo a la izquierda -->
        <div class="panel-reporte-pie">
            <button type="button" class="btn btn-sm btn-secondary" id="btnImprimirReporte">
                <i class="fas fa-print"></i> Imprimir
            </button>
        </div>
    </aside>