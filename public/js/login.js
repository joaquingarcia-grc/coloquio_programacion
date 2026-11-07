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
            $('#mensaje').addClass('d-none');//lo oculta a los 4 segundos
        }, 4000);
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
});