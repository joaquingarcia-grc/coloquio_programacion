$(document).ready(function(){
    //------------------------------------------------------------------------------------------------//
    //mensaje unico de exito o error, tipo: 'exito' o 'error'
    function mensaje(texto, tipo){
        $('#mensaje').removeClass('d-none alert-success alert-danger');//saca lo anterior
        if (tipo === 'exito'){
            $('#mensaje').addClass('alert-success');
        }else{
            $('#mensaje').addClass('alert-danger');
        }
        $('#mensaje').text(texto);
        setTimeout(function(){
            $('#mensaje').addClass('d-none');//lo oculta a los 2 segundos
        }, 2000);
    }
    //------------------------------------------------------------------------------------------------//
    //si viene un mensaje guardado del login lo muestra en la vista a la que redirigio
    const mensajeGuardado = sessionStorage.getItem('mensajeBienvenida');
    if (mensajeGuardado){
        mensaje(mensajeGuardado, 'exito');
        sessionStorage.removeItem('mensajeBienvenida');//lo borra para que no se repita
    }
    //------------------------------------------------------------------------------------------------//
    //funcion para poder ingresar en la pagina de logueo
    $('#formularioIngreso').on('submit',function(e){
        e.preventDefault();//accionamos un evento por defecto el cual detiene las acciones del formulario
        const dato = {
            denominacion : $('#denominacion').val(),
            pswd : $('#pswd').val(),
        }
        $.ajax({
            url: BASE + 'registro/validacion',
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function(response) {
                if (response.exito){
                    sessionStorage.setItem('mensajeBienvenida', response.mensaje);//guarda el mensaje para mostrarlo en la otra vista
                    $('#formularioIngreso')[0].reset();//limpia formulario
                    window.location.href = response.redirigir;//va a la vista que manda el servidor
                }else{
                    mensaje(response.mensaje, 'error');
                }
            },
            error: function(){//si existiese un error en el servidor podria verse un mensaje de error
                $('#formularioIngreso')[0].reset();
                mensaje('Error en el servidor', 'error');
            },
            complete: function(){//siempre limpia por defecto en carga
                $('#formularioIngreso')[0].reset();
            }
        });
    });
//------------------------------------------------------------------------------------------------//
    //funcion que dispara el modal de guardado para usuarios
    $('#formularioRegistro').on('submit',function(e){
        e.preventDefault();//accionamos un evento por defecto el cual detiene las acciones del formulario
        const dato = {
            denominacion : $('#denominacion').val(),
            pswd : $('#pswd').val(),
            correo : $('#correo').val()
        }
        //este ajax espera la respuesta desde el servidor dependiendo el paquete que sea armado antes de enviar
        //por tanto pienso que el usuario no podra infiltrar datos no deseados
        //existe el caso de que el usuario intente romper este js pero en el caso del servidor no podra alterarlo
        $.ajax({
            url: BASE + 'registro/insertar',
            method: 'POST',
            data: dato,
            dataType: 'json',
            success: function(response) {
                if (response.exito){
                    $('#modalRegistro').modal('hide');//ocultamos el modal de guardar
                    mensaje(response.mensaje);//responde mensaje desde el servidor
                    $('#formularioRegistro')[0].reset();//limpia formulario
                    setTimeout(function(){//activa funcion que dirije a la vista usuarios
                        window.location.href = BASE + 'registro';
                    },  2500);
                }else if(response.papelera){//espera condicion desde la papelera e imprime el mensaje obtenido
                    mensaje('Aviso: ' + response.mensaje, 'warning');
                }else{
                    mensaje('Error: ' + response.mensaje, 'error');
                }
            },
            error: function(){//si existiese un error en el servidor podria verse un mensaje de error
                $('#modalRegistro').modal('hide');//ocultamos el modal de guardar
                $('#formularioRegistro')[0].reset();//limpia formulario
                mensaje('Error en el servidor','error'); 
            },
            complete: function(){//siempre limpia por defecto en carga
                $('#modalRegistro').modal('hide');//ocultamos el modal de guardar
                $('#formularioRegistro')[0].reset();
            } 
        });
    });
    //------------------------------------------------------------------------------------------------//
    //al apretar salir en el menu del usuario se abre el modal de confirmacion
    $('#btnSalir').on('click', function(){
        $('#modalSalir').modal('show');
    });
    //------------------------------------------------------------------------------------------------//
    //si confirma, lo mandamos a la ruta que cierra la sesion (el controlador lo redirige solo)
    $('#btnConfirmarSalir').on('click', function(){
        window.location.href = BASE + 'registro/salir';
    });
});
