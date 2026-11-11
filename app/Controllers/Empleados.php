<?php

namespace App\Controllers;
use App\Models\UsuariosModel;
use App\Models\EmpleadosModel;
use App\Models\LiquidacionesModel;

class Empleados extends BaseController{

    protected $sesion;
    protected $usuarios;
    protected $empleados;
    protected $liquidaciones;

    public function __construct(){
        //Se inicia la sesión y se instancian los modelos
        $this->sesion = session();
        $this->usuarios = new UsuariosModel();
        $this->empleados = new EmpleadosModel();
        $this->liquidaciones = new LiquidacionesModel();
    }

    public function index(){

        $usr_logueado = $this->sesion->get('denominacion');
        
        $datos = [  'titulo' => 'Liquidacion de sueldos',
                    'usuario'=>$usr_logueado];

        // Se arma la página: encabezado, formulario y pie
        echo view('head',$datos);
        echo view('empleados/empleados');
        echo  view('footer');
    }
    public function insertar(){
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        // Datos que llegan por POST
        $denominacion = $this->request->getPost('denominacion');
        $correo = trim($this->request->getPost('correo'));
        $area = $this->request->getPost('area');
        // Traemos el examen al que se le quiere cargar la pregunta y el id del usuario logueado
        $id_logueado = $this->sesion->get('id');
        // Si pasa las validaciones se guarda
        $this->empleados->save([
            'denominacion'=> $denominacion,
            'correo' => $correo,
            'area' => $area,
            'id_usuario' => $id_logueado
        ]);
        //damos una respuesta luego de guardar, con el id nuevo
        $id = $this->empleados->getInsertID();
        echo json_encode(['exito' => true, 'id' => $id, 'mensaje' => 'Empleado cargado exitosamente']);
        exit;
    }
    public function api_empleados(){
       //Esta funcion devuelve el listado de usuarios en formato json
       //Traemos todos los usuarios activos, del más nuevo al más viejo
       $empleados =    $this->empleados
                       ->where('id_usuario', $this->sesion->id)
                       ->orderBy('id','DESC')
                       ->findAll();
       //Armamos los datos y los devolvemos como json
       $datos = ['empleados'=>$empleados];
       return $this->response->setJSON($datos);
   }
}