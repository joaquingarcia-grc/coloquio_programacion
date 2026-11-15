<main class="contenido">
    <div class="tarjeta-formulario">
        <h5 class="mb-3"><i class="fas fa-gear"></i> Configuración</h5>
        <!-- formulario con los datos del usuario logueado, el id va en data-id -->
        <form id="formConfiguracion" data-id="<?php echo($datosUsuario['id']); ?>">
            <!-- advertencia: no hace falta tocar todos los campos -->
            <p class="text-danger small">No es necesario modificar todos los campos, cambiá solo los que quieras actualizar.</p>
            <!-- usuario (es con el que se loguea, en la base es la columna denominacion) -->
            <div class="mb-3">
                <label for="denominacion" class="form-label">Usuario</label>
                <input type="text" class="form-control" id="denominacion" name="denominacion" value="<?php echo($datosUsuario['denominacion']); ?>">
            </div>
            <!-- correo -->
            <div class="mb-3">
                <label for="correo" class="form-label">Correo</label>
                <input type="email" class="form-control" id="correo" name="correo" value="<?php echo($datosUsuario['correo']); ?>">
            </div>
            <!-- contraseña: va vacia, por seguridad no se trae la que esta guardada -->
            <div class="mb-3">
                <label for="pswd" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="pswd" name="pswd" placeholder="Nueva contraseña">
                <!-- advertencia de como tiene que ser la contraseña -->
                <div class="form-text">La contraseña debe tener como mínimo 8 caracteres y un carácter especial.</div>
            </div>
            <!-- guardar primero y cancelar al lado, el cancelar vuelve a la pagina principal sin guardar -->
            <div class="d-flex justify-content-start gap-2">
                <button type="submit" class="boton-principal" id="btnGuardarConf">Guardar</button>
                <a href="<?php echo base_url();?>calendario/" class="boton-secundario" >Cancelar</a>
            </div>
        </form>
    </div>
</main>