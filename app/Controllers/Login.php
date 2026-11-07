<?php

namespace App\Controllers;
use App\Models\UsuariosModel;

class Login extends BaseController{

    protected $usuarios;

    public function __construct() {
        $this->usuarios = new UsuariosModel();
    }
    public function index(){   

        $datos = ['titulo' => 'Panel de logueo',];
        echo view('login/login',$datos);
    }

    public function validacion(){    
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //Traemos las variables del formulario de logueo
        $denominacion = strtolower(trim($this->request->getPost('denominacion')));
        $pswd = $this->request->getPost('pswd');
        //verificamos que esten completos los dos campos
        if (empty($denominacion) || empty($pswd)){
          echo json_encode(['exito' => false, 'mensaje' => 'Faltan datos necesarios']);
          exit;  
        }
        //Buscamos al usuario por su denominacion
        $datosUsuario = $this->usuarios->where('denominacion',$denominacion)->first();
        //Si el usuario existe comparamos la contraseña
        if(!empty($datosUsuario)){
            if(password_verify($pswd, $datosUsuario['pswd'])){
                //Si es correcta guardamos el id y la denominacion en la sesion
                $data_sesion = [
                    'id' => $datosUsuario['id'],
                    'denominacion' => $datosUsuario['denominacion']
                ];
                $sesion = session();
                $sesion->set($data_sesion);
                
                echo json_encode(['exito' => true, 'mensaje' => 'Bienvenido', 'redirigir' => base_url('/sueldos')]);
                exit;              
            }else{
                //La contraseña no coincide
                echo json_encode(['exito' => false, 'mensaje' => 'Credecial incorrecta']);
            }exit;
        }else{
            //El usuario no existe
            echo json_encode(['exito' => false, 'mensaje' => 'Usted no se encuentra registrado']);
            exit;
        }
    }

}