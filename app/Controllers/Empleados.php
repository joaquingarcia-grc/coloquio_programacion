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

    public function api_empleados(){
       //Esta funcion devuelve el listado de usuarios en formato json
       //Traemos todos los usuarios activos, del más nuevo al más viejo
       $empleados =    $this->empleados->select('empleados.*, usuarios.denominacion AS cargado_por')
                       ->join('usuarios', 'usuarios.id = empleados.id_usuario')
                       ->orderBy('empleados.id','DESC')
                       ->findAll();
       //Armamos los datos y los devolvemos como json
       $datos = ['empleados'=>$empleados];
       return $this->response->setJSON($datos);
   }



}