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
        <a class="marca" href="index.html">Panel Administrativo</a>
        <button class="boton-menu" id="botonMenu" type="button">
            <i class="fas fa-bars"></i>
        </button>
        <div class="dropdown usuario ms-auto">
            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-user"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Loguearse</a></li>
                <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
            </ul>
        </div>
    </header>
    <!-- Barra lateral -->
    <aside class="barra-lateral" id="menuLateral">
        <nav class="menu" id="menuAcordeon">
            <div class="menu-titulo">Empelado</div>
            <a class="menu-link" href="<?php echo base_url()?>usuarios/nuevo">
                <i class="fas fa-user-plus"></i> Cargar empleado
            </a>
            <a class="menu-link" href="<?php echo base_url()?>liquidaciones/nueva">
                <i class="fas fa-file-invoice-dollar"></i> Generar liquidación
            </a>
        </nav>
        <div class="pie-lateral">
            <small>Sesión iniciada como:</small>
            <div>Usuario</div>
        </div>
    </aside>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src='<?php echo base_url()?>js/script.js'></script>
</body>
</html>