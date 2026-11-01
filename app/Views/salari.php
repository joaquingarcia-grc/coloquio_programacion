<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $titulo?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href='<?php echo base_url()?>css/estilos.css' rel="stylesheet">
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- Barra superior -->
    <header class="barra-superior">
        <a class="marca" href='<?php echo base_url()?>'>Panel Administrativo</a>
        <button class="boton-menu" id="botonMenu" type="button">
            <i class="fas fa-bars"></i>
        </button>
        <div class="dropdown usuario ms-auto">
            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-user"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item" id='formuLogueo'>Loguearse</button></li>
                <li><button class="dropdown-item"  id="btnRegistro">Registrarse</button></li>
                <li><button class="dropdown-item" id='btnSalir'>Cerrar sesión</button></li>
            </ul>
        </div>
    </header>
    <!-- un solo main, adentro van los formularios y la tabla -->
    <main class="contenido">
        <!-- login y registro van solos en el medio -->
        <div class="mx-auto mb-3" id="ctnLogin" style="max-width: 540px;"></div>
        <!-- aca van los formularios, se acomodan en el orden en que se abren (en pantalla chica se apilan) -->
        <div class="row g-3" id="ctnFormularios"></div>
        <!-- las tablas van abajo, a lo ancho -->
        <div id="ctnEmpleado2"></div>
    </main>
    <!-- Barra lateral -->
    <aside class="barra-lateral" id="menuLateral">
        <nav class="menu" id="menuAcordeon">
            <div id="opcionesSesion" class="d-none">
                <div class="menu-titulo">Empleado</div>
                <button type="button" class="menu-link" id="crgEmpleado">
                    <i class="fas fa-user-plus"></i> Cargar empleado
                </button>
                <button type="button" class="menu-link" id="crgLiquidacion">
                    <i class="fas fa-file-invoice-dollar"></i> Generar liquidación
                </button>

                <div class="menu-titulo">Listas</div>
                <button type="button" class="menu-link" id="verListaEmpleados">
                    <i class="fas fa-users"></i> Lista de empleados
                </button>
                <button type="button" class="menu-link" id="verListaLiquidaciones">
                    <i class="fas fa-list"></i> Lista de liquidaciones
                </button>
            </div>
        </nav>
        <div class="pie-lateral">
            <small>Sesión iniciada como:</small>
            <div id="nombreUsuario">Usuario</div>
        </div>
    </aside>
    <!-- modal para ver el detalle de empleado o liquidacion -->
    <div class="modal fade" id="modalDetalle" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDetalleTitulo"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="modalDetalleCuerpo"></div>
                <div class="modal-footer" id="modalDetallePie"></div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script>
        const BASE = "<?php echo base_url();?>";
        const VEMP = <?php echo json_encode($empleados, JSON_HEX_TAG); ?>;
    </script>
    <script src='<?php echo base_url();?>js/liquidaciones.js'></script> 
    <script src='<?php echo base_url();?>js/empleados.js'></script>
    <script src='<?php echo base_url();?>js/script.js'></script>
</body>
</html>