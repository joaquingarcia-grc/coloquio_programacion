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
                
                echo json_encode(['exito' => true, 'mensaje' => 'Bienvenido', 'redirigir' => base_url('/calendario')]);
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

    public function nuevo(){

        //Datos que se pasan a la vista
        $datos = [
                  'titulo' => 'Registro'];
        //Armamos la página: encabezado, formulario de usuario nuevo y pie
        echo view('login/nuevo',$datos);
    }
    public function insertar(){
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //Traemos las variables del formulario de usuario nuevo
        $denominacion = strtolower(trim($this->request->getPost('denominacion')));
        $correo = trim($this->request->getPost('correo'));
        $pswd = trim($this->request->getPost('pswd'));
        //Verificamos que esten completos la denominacion y el correo
        if (empty($denominacion) || empty($correo)){
            echo json_encode(['exito' => false, 'mensaje' => 'Faltan datos obligatorios']);
            exit;
        }
        //Validaciones de la contraseña que exista, que tenga al menos 8 caracteres
        if (empty($pswd)) {
            echo json_encode(['exito' => false, 'mensaje' => 'La contraseña es obligatoria']);
            exit;
        }
        //validacion para confirmar de que tenga al menos 8 caracteres la contraseña
        if (strlen($pswd) < 8) {
            echo json_encode(['exito' => false, 'mensaje' => 'La contraseña debe tener al menos 8 caracteres']);
            exit;
        }
        //validacion para confirmar de que tenga al menos 1 caracter especial la contraseña
        if (empty(strpbrk($pswd, '#!*@$%&?¿'))) {
            echo json_encode(['exito' => false, 'mensaje' => 'La contraseña debe tener al menos un carácter especial']);
            exit;
        }
        //Buscamos si ya existe un usuario con esa denominacion, incluyendo los de la papeler
        $datoUsuario = $this->usuarios->where('denominacion', $denominacion)->withDeleted()->first();
        //Si no existe, encriptamos la contraseña y guardamos el usuario
        if (empty($datoUsuario)){
            $hash = password_hash($pswd ,PASSWORD_DEFAULT);
            $this->usuarios->save([
                'denominacion' => $denominacion,
                'correo'  => $correo,
                'pswd' => $hash
            ]);
            echo json_encode(['exito' => true, 'mensaje' => ' Usuario creado con éxito']);
            exit;
        }else{
            //Si ya existe, avisamos si esta activo o en la papelera 
            if(empty($datoUsuario['fecha_baja'])){
                echo json_encode(['exito' => false,'papelera' => false, 'mensaje'=>'Usuario existente']);                
            }else{
                echo json_encode(['exito' => false,'papelera'=> true, 'mensaje'=>'Usuario existente en la papelera, recuperelo']);
            }
            exit;
        }
        
    }

    public function salir(){
        //Cerramos la sesion, borrando todos sus datos
        $sesion = session();
        $sesion->destroy();
        //Mandamos al usuario a la pagina de registro
        return redirect()->to(base_url() . 'registro/');
    }

}