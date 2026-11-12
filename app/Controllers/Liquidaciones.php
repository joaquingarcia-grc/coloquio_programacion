<?php

namespace App\Controllers;
use App\Models\UsuariosModel;
use App\Models\EmpleadosModel;
use App\Models\LiquidacionesModel;

class Liquidaciones extends BaseController{
    

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
        $empleados = $this->empleados->findAll();
        
        $datos = [  'titulo' => 'Liquidacion de sueldos',
                    'usuario'=>$usr_logueado,
                    'empleados' => $empleados];

        // Se arma la página: encabezado, formulario y pie
        echo view('head',$datos);
        echo view('liquidaciones/liquidaciones');
        echo  view('footer');
    }
    public function api_liquidaciones(){
       //Esta funcion devuelve el listado de usuarios en formato json
       //Traemos todos los usuarios activos, del más nuevo al más viejo
       $liquidaciones =    $this->liquidaciones->select('liquidaciones.*, empleados.denominacion AS empleado')
                       ->where('liquidaciones.id_usuario', $this->sesion->id)
                       ->join('empleados', 'empleados.id = id_empleado')
                       ->orderBy('liquidaciones.id','DESC')
                       ->findAll();
       //Armamos los datos y los devolvemos como json
       $datos = ['liquidaciones'=>$liquidaciones];
       return $this->response->setJSON($datos);
    }


}