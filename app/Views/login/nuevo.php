<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title><?php echo $titulo?></title>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="<?php echo base_url();?>css/login.css">
	<link rel="shortcut icon" href="<?php echo base_url()?>imagenes/favicon.ico" type="image/x-icon">
</head>
<body>
    <div class="global-container">
    	<div class="card login-form">
    		<div class="card-body">
    			<h3 class="card-title text-center">Registrarse</h3>
    			<p class="card-subtitle text-center">Sistema de liquidación de sueldos</p>
    			<div class="card-text">
                    <div id="mensaje" class="alert d-none"></div>
    				<form id='formularioRegistro'>
    					<!-- aclaracion de los campos obligatorios, en rojo -->
    					<p class="text-danger small">Los campos con * son obligatorios.</p>
    					<div class="mb-3">
    						<label for="denominacion" class="form-label">Usuario <span class="text-danger">*</span></label>
    						<input type="text" class="form-control" id="denominacion" name="denominacion" required>
    					</div>
    					<div class="mb-3">
    						<label for="correo" class="form-label">Correo <span class="text-danger">*</span></label>
    						<input type="email" class="form-control" id="correo" name="correo" required>
    					</div>
    					<div class="mb-3">
    						<label for="pswd" class="form-label">Contraseña <span class="text-danger">*</span></label>
    						<input type="password" class="form-control" id="pswd" name="pswd" required>
    						<!-- advertencia de como tiene que ser la contraseña -->
    						<div class="form-text">La contraseña debe tener como mínimo 8 caracteres y un carácter especial.</div>
    					</div>
    					<div class="botones">
    						<a type="submit" class="btn btn-cancelar" href="<?php echo base_url();?>registro/">Cancelar</a>
    						<button type="submit" class="btn btn-iniciar">Registrar</button>
    					</div>
    				</form>
    				<hr>
    				<div class="text-center">
    					<p class="mb-2">¿Ya tenés cuenta?</p>
    					<a href="<?php echo base_url();?>registro" class="btn-iniciar">Iniciar sesión</a>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
    <script src='https://code.jquery.com/jquery-3.7.1.min.js'></script>
    <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js'></script>
    <script>const BASE = "<?php echo base_url();?>";</script>
    <script src="<?php echo base_url();?>js/login.js"></script>
</body>
</html>