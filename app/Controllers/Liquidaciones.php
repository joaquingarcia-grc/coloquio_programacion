<?php

namespace App\Controllers;
use App\Models\UsuariosModel;
use App\Models\EmpleadosModel;
use App\Models\LiquidacionesModel;
use App\Models\ActividadesModel;

//acá está el controlador de liquidaciones (listado, alta, edición, borrado, papelera, calendario y reporte)
class Liquidaciones extends BaseController{
    
    //acá se declaran las variables que usa todo el controlador
    protected $actividades;
    protected $sesion;
    protected $usuarios;
    protected $empleados;
    protected $liquidaciones;

    //acá se inicia la sesión y se crean los modelos
    public function __construct(){
        //Se inicia la sesión y se instancian los modelos
        $this->sesion = session();
        $this->actividades = new ActividadesModel();
        $this->usuarios = new UsuariosModel();
        $this->empleados = new EmpleadosModel();
        $this->liquidaciones = new LiquidacionesModel();
    }

    //acá se arma la página principal de liquidaciones
    public function index(){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //acá tomo el usuario logueado y los empleados
        $usr_logueado = $this->sesion->get('denominacion');
        $empleados = $this->empleados->findAll();
        //acá armo los datos que van a la vista
        $datos = [  'titulo' => 'Liquidacion de sueldos',
                    'usuario'=>$usr_logueado,
                    'empleados' => $empleados];
        // Se arma la página: encabezado, formulario y pie
        echo view('head',$datos);
        echo view('liquidaciones/liquidaciones');
        echo  view('footer');
    }
    //acá se guarda una liquidación nueva
    public function insertar(){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //acá tomo los datos que llegan del formulario
        // Datos que llegan por POST
        $id_empleado = $this->request->getPost('id_empleado');
        $monto = $this->request->getPost('monto');
        $fecha_vencimiento = $this->request->getPost('fecha_vencimiento');
        //acá tomo el id del usuario logueado
        // Id del usuario logueado
        $id_logueado = $this->sesion->get('id');
        //acá reviso que el empleado exista y sea del usuario logueado
        // Buscamos el empleado: tiene que existir (no borrado) y ser del usuario logueado
        $empleado = $this->empleados->where('id_usuario', $id_logueado)->find($id_empleado);
        //si no existe el empleado devuelvo el error
        if (!$empleado) {
            echo json_encode(['exito' => false, 'mensaje' => 'El empleado no existe']);
            exit;
        }else{
            //acá se guarda la liquidación
            // Se guarda la liquidacion (la fecha_alta la carga sola el modelo)
            $this->liquidaciones->save([
                'id_empleado' => $id_empleado,
                'monto' => $monto,
                'fecha_vencimiento' => $fecha_vencimiento,
                'id_usuario' => $id_logueado
            ]);
            //id de la liquidacion que se acaba de guardar
            $id = $this->liquidaciones->getInsertID();
            //acá se guarda la actividad de alta
            // Se guarda la accion: quien la hizo, sobre que tabla, que id y que accion fue
            $this->actividades->save([
                'id_usuario' => $id_logueado,
                'tabla' => 'liquidaciones',
                'id_dato' => $id,
                'accion' => 'alta'
            ]);
            //acá devuelvo la respuesta al js
            //damos una respuesta luego de guardar, con el id nuevo
            echo json_encode(['exito' => true, 'id' => $id, 'mensaje' => 'Liquidación cargada exitosamente']);
            exit;
        }
    }
    //acá se borra una liquidación (borrado lógico, va a la papelera)
    public function borrar($id){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //acá tomo el usuario logueado y busco la liquidación
        // Id del usuario logueado y la liquidacion que se quiere borrar
        $id_logueado = $this->sesion->get('id');
        $liquidacion = $this->liquidaciones->find($id);
        //acá reviso que sea el dueño de la liquidación
        // Solo el dueño de la liquidacion puede borrarla
        if ($liquidacion['id_usuario'] != $id_logueado) {
            echo json_encode(['exito' => false, 'mensaje' => 'Usted no es el dueño de la liquidación']);
            exit;
        }else{//Es el dueño: se borra (borrado lógico, va a la papelera)
            $this->liquidaciones->delete($id);
            //acá se guarda la actividad de baja
            // Se guarda la accion: quien la hizo, sobre que tabla, que id y que accion fue
            $this->actividades->save([
                'id_usuario' => $id_logueado,
                'tabla' => 'liquidaciones',
                'id_dato' => $id,
                'accion' => 'baja'
            ]);
            //acá devuelvo la respuesta al js
            echo json_encode(['exito' => true, 'mensaje' => 'Borrado exitosamente']);
            exit;
        }
    }
    //acá se actualiza una liquidación
    public function actualizar($id){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //acá tomo los datos nuevos que llegan del formulario
        // Datos que llegan por POST
        $id_empleado = $this->request->getPost('id_empleado');
        $monto = $this->request->getPost('monto');
        $fecha_vencimiento = $this->request->getPost('fecha_vencimiento');
        //acá tomo el id del usuario logueado
        // Id del usuario logueado
        $id_logueado = $this->sesion->get('id');
        //acá reviso que el empleado exista y sea del usuario logueado
        // Buscamos el empleado: tiene que existir (no borrado) y ser del usuario logueado
        $empleado = $this->empleados->where('id_usuario', $id_logueado)->find($id_empleado);
        //si no existe el empleado devuelvo el error
        if (!$empleado) {
            echo json_encode(['exito' => false, 'mensaje' => 'El empleado no existe']);
            exit;
        }else{
            //acá se actualiza la liquidación
            // Se actualiza la liquidacion
            $this->liquidaciones->update($id, [
                'id_empleado' => $id_empleado,
                'monto' => $monto,
                'fecha_vencimiento' => $fecha_vencimiento,
                'id_usuario' => $id_logueado
            ]);
            //acá se guarda la actividad de modificación
            // Se guarda la accion: quien la hizo, sobre que tabla, que id y que accion fue
            $this->actividades->save([
                'id_usuario' => $id_logueado,
                'tabla' => 'liquidaciones',
                'id_dato' => $id,
                'accion' => 'modificacion'
            ]);
            //acá devuelvo la respuesta al js
            //damos una respuesta luego de actualizar
            echo json_encode(['exito' => true, 'mensaje' => 'Liquidación actualizada exitosamente']);
            exit;
        }
    }  
    //acá se arma la página de la papelera
    public function papelera(){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //acá tomo el usuario logueado y los empleados
        $usr_logueado = $this->sesion->get('denominacion');
        $empleados = $this->empleados->findAll();
        //acá armo los datos que van a la vista
        $datos = [  'titulo' => 'Liquidacion de sueldos',
                    'usuario'=>$usr_logueado,
                    'empleados' => $empleados];
        // Se arma la página: encabezado, formulario y pie
        echo view('head',$datos);
        echo view('liquidaciones/papelera');
        echo  view('footer');
    }
    //acá se recupera una liquidación de la papelera
    public function recuperacion($id){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //acá tomo el usuario logueado y busco la liquidación (incluyendo las borradas)
        // Id del usuario logueado y la liquidacion que esta en la papelera
        $id_logueado = $this->sesion->get('id');
        $liquidacion = $this->liquidaciones->withDeleted()->find($id);
        //acá reviso que sea el dueño de la liquidación
        // Solo el dueño de la liquidacion puede recuperarla
        if ($liquidacion['id_usuario'] != $id_logueado) {
            echo json_encode(['exito' => false, 'mensaje' => 'Usted no es el dueño de la liquidación']);
            exit;
        }else{//Es el dueño: la recuperamos sacandole la fecha de baja
            $this->liquidaciones->update($id, ['fecha_baja' => null]);
            //acá devuelvo la respuesta al js
            echo json_encode(['exito' => true, 'id' => $id, 'mensaje' => 'Liquidación recuperada correctamente']);
            exit;
        }
    }
    //acá está la api que devuelve las liquidaciones activas en json (la usa la tabla)
    public function api_liquidaciones(){
       // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
       // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
       if(!isset($this->sesion->id)){
           return redirect()->to(base_url() . "registro/");
       }
       //Esta funcion devuelve el listado de usuarios en formato json
       //Traemos todos los usuarios activos, del más nuevo al más viejo
       //acá traigo las liquidaciones del usuario logueado junto con el nombre del empleado
       $liquidaciones =    $this->liquidaciones->select('liquidaciones.*, empleados.denominacion AS empleado')
                       ->where('liquidaciones.id_usuario', $this->sesion->id)
                       ->join('empleados', 'empleados.id = id_empleado')
                       ->orderBy('liquidaciones.id','DESC')
                       ->findAll();
       //Armamos los datos y los devolvemos como json
       $datos = ['liquidaciones'=>$liquidaciones];
       return $this->response->setJSON($datos);
    }
    //acá está la api que devuelve las liquidaciones borradas en json (la usa la tabla de la papelera)
    public function api_liquidaciones_borrados(){
       // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
       // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
       if(!isset($this->sesion->id)){
           return redirect()->to(base_url() . "registro/");
       }
       //Esta funcion devuelve el listado de liquidaciones borradas en formato json
       //Traemos todas las liquidaciones borradas del usuario, de la más nueva a la más vieja
       //acá traigo solo las borradas del usuario logueado junto con el nombre del empleado
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
    //acá está la api que devuelve todas las liquidaciones en json (la usa el calendario)
    public function api_calendario(){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esta funcion devuelve todas las liquidaciones del usuario (activas y vencidas) en formato json para el calendario
        //withDeleted trae tambien las que tienen fecha_baja, que son las vencidas dadas de baja
        //acá traigo todas las liquidaciones del usuario logueado, ordenadas por fecha de vencimiento
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
    //acá está el reporte de liquidaciones por vencer (lo usa la campanita)
    public function reporte(){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //acá tomo el usuario logueado
        // id del usuario logueado (cambialo si en tu sesion se llama distinto)
        $id_usuario = $this->sesion->get('id');
        // dias de aviso, para no dejarlo hardcodeado abajo
        $dias_aviso = 2;
        // zona horaria de argentina
        $zona = new \DateTimeZone('America/Argentina/Buenos_Aires');
        //acá traigo las liquidaciones del usuario
        // trae solo las liquidaciones del usuario (las borradas no vienen por el soft delete)
        $liquidaciones = $this->liquidaciones->where('id_usuario', $id_usuario)->findAll();
        // hoy a las 00:00 hora argentina para comparar solo dias
        $hoy = new \DateTime('today', $zona);
        //acá van los avisos y el contador de vencidas
        $avisos = [];
        $vencidas = 0;
        //acá recorro las liquidaciones una por una
        foreach ($liquidaciones as $liquidacion) {
            // fecha de vencimiento de esta liquidacion, tambien en hora argentina
            $fecha_fin = new \DateTime($liquidacion['fecha_vencimiento'], $zona);
            $fecha_fin->setTime(0, 0);
            //acá calculo cuántos días faltan
            // dias que faltan: 0 es hoy, negativo es que ya vencio
            $faltan = (int) $hoy->diff($fecha_fin)->format('%r%a');
            //si ya venció la doy de baja
            if ($faltan < 0) {
                // ya vencio: baja logica (el delete del modelo carga la fecha_baja solo)
                $this->liquidaciones->delete($liquidacion['id']);
                $vencidas++;
            } else {
                //si falta poco la agrego a los avisos
                if ($faltan <= $dias_aviso) {
                    // me traigo el empleado para mostrar el nombre en el reporte
                    $empleado = $this->empleados->find($liquidacion['id_empleado']);
                    if ($empleado) {
                        $nombre = $empleado['denominacion'];
                    } else {
                        $nombre = 'Empleado no encontrado';
                    }
                    //acá armo el aviso
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
        //acá devuelvo los avisos y la cantidad de vencidas en json
        return $this->response->setJSON([
            'avisos'   => $avisos,
            'vencidas' => $vencidas
        ]);
    }

}