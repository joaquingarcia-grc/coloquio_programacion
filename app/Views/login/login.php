<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title><?php echo $titulo?></title>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="<?php echo base_url();?>css/login.css">
</head>
<body>
    <div class="global-container">
    	<div class="card login-form">
    		<div class="card-body">
    			<h3 class="card-title text-center">Iniciar sesión</h3>
    			<p class="card-subtitle text-center">Sistema de liquidación de sueldos</p>
    			<div class="card-text">
                    <div id="mensaje" class="alert d-none"></div>
    				<form id='formularioIngreso'>
    					<div class="mb-3">
    						<label for="denominacion" class="form-label">Usuario</label>
    						<input type="text" class="form-control" id="denominacion" name="denominacion">
    					</div>
    					<div class="mb-3">
    						<label for="pswd" class="form-label">Contraseña</label>
    						<input type="password" class="form-control" id="pswd" name="pswd">
    					</div>
    					<div class="botones">
    						<button type="reset" class="btn btn-cancelar">Cancelar</button>
    						<button type="submit" class="btn btn-iniciar">Iniciar</button>
    					</div>
    				</form>
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