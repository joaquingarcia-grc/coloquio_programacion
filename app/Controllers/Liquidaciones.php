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
    public function borrar($id){
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        // Id del usuario logueado y la liquidacion que se quiere borrar
        $id_logueado = $this->sesion->get('id');
        $liquidacion = $this->liquidaciones->find($id);
        // Solo el dueño de la liquidacion puede borrarla
        if ($liquidacion['id_usuario'] != $id_logueado) {
            echo json_encode(['exito' => false, 'mensaje' => 'Usted no es el dueño de la liquidación']);
            exit;
        }else{//Es el dueño: se borra (borrado lógico, va a la papelera)
            $this->liquidaciones->delete($id);
            echo json_encode(['exito' => true, 'mensaje' => 'Borrado exitosamente']);
            exit;
        }
    }    

    public function papelera(){

        $usr_logueado = $this->sesion->get('denominacion');
        $empleados = $this->empleados->findAll();
        
        $datos = [  'titulo' => 'Liquidacion de sueldos',
                    'usuario'=>$usr_logueado,
                    'empleados' => $empleados];

        // Se arma la página: encabezado, formulario y pie
        echo view('head',$datos);
        echo view('liquidaciones/papelera');
        echo  view('footer');
    }

    public function recuperacion($id){
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        // Id del usuario logueado y la liquidacion que esta en la papelera
        $id_logueado = $this->sesion->get('id');
        $liquidacion = $this->liquidaciones->withDeleted()->find($id);
        // Solo el dueño de la liquidacion puede recuperarla
        if ($liquidacion['id_usuario'] != $id_logueado) {
            echo json_encode(['exito' => false, 'mensaje' => 'Usted no es el dueño de la liquidación']);
            exit;
        }else{//Es el dueño: la recuperamos sacandole la fecha de baja
            $this->liquidaciones->update($id, ['fecha_baja' => null]);
            echo json_encode(['exito' => true, 'id' => $id, 'mensaje' => 'Liquidación recuperada correctamente']);
            exit;
        }
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
    public function api_liquidaciones_borrados(){
       //Esta funcion devuelve el listado de liquidaciones borradas en formato json
       //Traemos todas las liquidaciones borradas del usuario, de la más nueva a la más vieja
       $liquidaciones =    $this->liquidaciones->select('liquidaciones.*, empleados.denominacion AS empleado')
                       ->where('liquidaciones.id_usuario', $this->sesion->id)
                       ->join('empleados', 'empleados.id = id_empleado')
                       ->orderBy('liquidaciones.id','DESC')
                       ->onlyDeleted()
                       ->findAll();
       //Armamos los datos y los devolvemos como json
       $datos = ['liquidaciones'=>$liquidaciones];
       return $this->response->setJSON($datos);
    }


}