<?php

namespace App\Controllers;
use App\Models\UsuariosModel;
use App\Models\EmpleadosModel;
use App\Models\LiquidacionesModel;
use App\Models\ActividadesModel;

class Liquidaciones extends BaseController{
    
    protected $actividades;
    protected $sesion;
    protected $usuarios;
    protected $empleados;
    protected $liquidaciones;

    public function __construct(){
        //Se inicia la sesión y se instancian los modelos
        $this->sesion = session();
        $this->actividades = new ActividadesModel();
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
        $id_empleado = $this->request->getPost('id_empleado');
        $monto = $this->request->getPost('monto');
        $fecha_vencimiento = $this->request->getPost('fecha_vencimiento');
        // Id del usuario logueado
        $id_logueado = $this->sesion->get('id');
        // Buscamos el empleado: tiene que existir (no borrado) y ser del usuario logueado
        $empleado = $this->empleados->where('id_usuario', $id_logueado)->find($id_empleado);
        if (!$empleado) {
            echo json_encode(['exito' => false, 'mensaje' => 'El empleado no existe']);
            exit;
        }else{
            // Se guarda la liquidacion (la fecha_alta la carga sola el modelo)
            $this->liquidaciones->save([
                'id_empleado' => $id_empleado,
                'monto' => $monto,
                'fecha_vencimiento' => $fecha_vencimiento,
                'id_usuario' => $id_logueado
            ]);
            //id de la liquidacion que se acaba de guardar
            $id = $this->liquidaciones->getInsertID();
            // Se guarda la accion: quien la hizo, sobre que tabla, que id y que accion fue
            $this->actividades->save([
                'id_usuario' => $id_logueado,
                'tabla' => 'liquidaciones',
                'id_dato' => $id,
                'accion' => 'alta'
            ]);
            //damos una respuesta luego de guardar, con el id nuevo
            echo json_encode(['exito' => true, 'id' => $id, 'mensaje' => 'Liquidación cargada exitosamente']);
            exit;
        }
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
            // Se guarda la accion: quien la hizo, sobre que tabla, que id y que accion fue
            $this->actividades->save([
                'id_usuario' => $id_logueado,
                'tabla' => 'liquidaciones',
                'id_dato' => $id,
                'accion' => 'baja'
            ]);
            echo json_encode(['exito' => true, 'mensaje' => 'Borrado exitosamente']);
            exit;
        }
    }
    public function actualizar($id){
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        // Datos que llegan por POST
        $id_empleado = $this->request->getPost('id_empleado');
        $monto = $this->request->getPost('monto');
        $fecha_vencimiento = $this->request->getPost('fecha_vencimiento');
        // Id del usuario logueado
        $id_logueado = $this->sesion->get('id');
        // Buscamos el empleado: tiene que existir (no borrado) y ser del usuario logueado
        $empleado = $this->empleados->where('id_usuario', $id_logueado)->find($id_empleado);
        if (!$empleado) {
            echo json_encode(['exito' => false, 'mensaje' => 'El empleado no existe']);
            exit;
        }else{
            // Se actualiza la liquidacion
            $this->liquidaciones->update($id, [
                'id_empleado' => $id_empleado,
                'monto' => $monto,
                'fecha_vencimiento' => $fecha_vencimiento,
                'id_usuario' => $id_logueado
            ]);
            // Se guarda la accion: quien la hizo, sobre que tabla, que id y que accion fue
            $this->actividades->save([
                'id_usuario' => $id_logueado,
                'tabla' => 'liquidaciones',
                'id_dato' => $id,
                'accion' => 'modificacion'
            ]);
            //damos una respuesta luego de actualizar
            echo json_encode(['exito' => true, 'mensaje' => 'Liquidación actualizada exitosamente']);
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
    public function api_calendario(){
        //Esta funcion devuelve todas las liquidaciones del usuario (activas y vencidas) en formato json para el calendario
        //withDeleted trae tambien las que tienen fecha_baja, que son las vencidas dadas de baja
        $liquidaciones =    $this->liquidaciones->select('liquidaciones.*, empleados.denominacion AS empleado')
                            ->where('liquidaciones.id_usuario', $this->sesion->id)
                            ->join('empleados', 'empleados.id = liquidaciones.id_empleado')
                            ->orderBy('liquidaciones.fecha_vencimiento','ASC')
                            ->withDeleted()
                            ->findAll();
        //Armamos los datos y los devolvemos como json
        $datos = ['liquidaciones'=>$liquidaciones];
        return $this->response->setJSON($datos);
    }

    public function reporte(){
        // id del usuario logueado (cambialo si en tu sesion se llama distinto)
        $id_usuario = $this->sesion->get('id');
        // dias de aviso, para no dejarlo hardcodeado abajo
        $dias_aviso = 2;
        // zona horaria de argentina
        $zona = new \DateTimeZone('America/Argentina/Buenos_Aires');
        // trae solo las liquidaciones del usuario (las borradas no vienen por el soft delete)
        $liquidaciones = $this->liquidaciones->where('id_usuario', $id_usuario)->findAll();
        // hoy a las 00:00 hora argentina para comparar solo dias
        $hoy = new \DateTime('today', $zona);
        $avisos = [];
        $vencidas = 0;
        foreach ($liquidaciones as $liquidacion) {
            // fecha de vencimiento de esta liquidacion, tambien en hora argentina
            $fecha_fin = new \DateTime($liquidacion['fecha_vencimiento'], $zona);
            $fecha_fin->setTime(0, 0);
            // dias que faltan: 0 es hoy, negativo es que ya vencio
            $faltan = (int) $hoy->diff($fecha_fin)->format('%r%a');
            if ($faltan < 0) {
                // ya vencio: baja logica (el delete del modelo carga la fecha_baja solo)
                $this->liquidaciones->delete($liquidacion['id']);
                $vencidas++;
            } else {
                if ($faltan <= $dias_aviso) {
                    // me traigo el empleado para mostrar el nombre en el reporte
                    $empleado = $this->empleados->find($liquidacion['id_empleado']);
                    if ($empleado) {
                        $nombre = $empleado['denominacion'];
                    } else {
                        $nombre = 'Empleado no encontrado';
                    }
                    $avisos[] = [
                        'id'                => $liquidacion['id'],
                        'empleado'          => $nombre,
                        'monto'             => $liquidacion['monto'],
                        'fecha_vencimiento' => $liquidacion['fecha_vencimiento'],
                        'faltan'            => $faltan
                    ];
                }
            }
        }
        return $this->response->setJSON([
            'avisos'   => $avisos,
            'vencidas' => $vencidas
        ]);
    }

}