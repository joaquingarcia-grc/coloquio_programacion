<?php

namespace App\Controllers;
use App\Models\UsuariosModel;
use App\Models\EmpleadosModel;
use App\Models\LiquidacionesModel;
use App\Models\ActividadesModel;

//acá está el controlador de empleados (listado, alta, edición, borrado y papelera)
class Empleados extends BaseController{

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

    //acá se arma la página principal de empleados
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
                    'usuario'=> $usr_logueado,
                    'empleados'=> $empleados];

        // Se arma la página: encabezado, formulario y pie
        echo view('head',$datos);
        echo view('empleados/empleados');
        echo  view('footer');
    }
    //acá se guarda un empleado nuevo
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
        $denominacion = $this->request->getPost('denominacion');
        $correo = trim($this->request->getPost('correo'));
        $area = $this->request->getPost('area');
        //acá tomo el id del usuario logueado
        // Traemos el examen al que se le quiere cargar la pregunta y el id del usuario logueado
        $id_logueado = $this->sesion->get('id');
        //acá se guarda el empleado, con el id del usuario que lo cargó
        // Si pasa las validaciones se guarda
        $this->empleados->save([
            'denominacion'=> $denominacion,
            'correo' => $correo,
            'area' => $area,
            'id_usuario' => $id_logueado
        ]);
        //id del empleado que se acaba de guardar
        $id = $this->empleados->getInsertID();
        //acá se guarda la actividad de alta
        // Se guarda la accion: quien la hizo, sobre que tabla, que id y que accion fue
        $this->actividades->save([
            'id_usuario' => $id_logueado,
            'tabla' => 'empleados',
            'id_dato' => $id,
            'accion' => 'alta'
        ]);//doble insert y actualizar me inspire en los codigos de esta pagina https://es.stackoverflow.com/questions/499670/insert-multiple-en-codeigniter
        //acá devuelvo la respuesta al js
        //damos una respuesta luego de guardar, con el id nuevo
        echo json_encode(['exito' => true, 'id' => $id, 'mensaje' => 'Empleado cargado exitosamente']);
        exit;
    }
    
    //acá se borra un empleado (borrado lógico, va a la papelera)
    public function borrar($id){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //acá tomo el usuario logueado y busco el empleado
        // Id del usuario logueado y el empleado que se quiere borrar
        $id_logueado = $this->sesion->get('id');
        $empleado = $this->empleados->find($id);
        //acá reviso que sea el dueño del empleado
        // Solo el dueño del empleado puede borrarlo
        if ($empleado['id_usuario'] != $id_logueado) {
            echo json_encode(['exito' => false, 'mensaje' => 'Usted no es el dueño del empleado']);
            exit;
        }else{//Es el dueño: se borra (borrado lógico, va a la papelera)
            $this->empleados->delete($id);
            //acá se guarda la actividad de baja
            // Se guarda la accion: quien la hizo, sobre que tabla, que id y que accion fue
            $this->actividades->save([
                'id_usuario' => $id_logueado,
                'tabla' => 'empleados',
                'id_dato' => $id,
                'accion' => 'baja'
            ]);
            //acá devuelvo la respuesta al js
            echo json_encode(['exito' => true, 'mensaje' => 'Empleado borrado exitosamente']);
            exit;
        }
    }
    //acá se actualiza un empleado
    public function actualizar($id){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //acá tomo los datos nuevos, el usuario logueado y busco el empleado
        // Datos que llegan por POST, el id del usuario logueado y el empleado que se quiere actualizar
        $denominacion = $this->request->getPost('denominacion');
        $correo = trim($this->request->getPost('correo'));
        $area = $this->request->getPost('area');
        $id_logueado = $this->sesion->get('id');
        $empleado = $this->empleados->find($id);
        //acá reviso que sea el dueño del empleado
        // Solo el dueño del empleado puede actualizarlo
        if ($empleado['id_usuario'] != $id_logueado) {
            echo json_encode(['exito' => false, 'mensaje' => 'Usted no es el dueño del empleado']);
            exit;
        }else{//Es el dueño: se actualiza
            $this->empleados->update($id, [
                'denominacion' => $denominacion,
                'correo' => $correo,
                'area' => $area
            ]);
            //acá se guarda la actividad de modificación
            // Se guarda la accion: quien la hizo, sobre que tabla, que id y que accion fue
            $this->actividades->save([
                'id_usuario' => $id_logueado,
                'tabla' => 'empleados',
                'id_dato' => $id,
                'accion' => 'modificacion'
            ]);
            //acá devuelvo la respuesta al js
            echo json_encode(['exito' => true, 'mensaje' => 'Empleado actualizado exitosamente']);
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
                    'empleados'=> $empleados];

        // Se arma la página: encabezado, formulario y pie
        echo view('head',$datos);
        echo view('empleados/papelera');
        echo  view('footer');
    }
    //acá se recupera un empleado de la papelera
    public function recuperacion($id){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //acá tomo el usuario logueado y busco el empleado (incluyendo los borrados)
        // Id del usuario logueado y el empleado que esta en la papelera
        $id_logueado = $this->sesion->get('id');
        $empleado = $this->empleados->withDeleted()->find($id);
        //acá reviso que sea el dueño del empleado
        // Solo el dueño del empleado puede recuperarlo
        if ($empleado['id_usuario'] != $id_logueado) {
            echo json_encode(['exito' => false, 'mensaje' => 'Usted no es el dueño del empleado']);
            exit;
        }else{//Es el dueño: lo recuperamos sacandole la fecha de baja
            $this->empleados->update($id, ['fecha_baja' => null]);
            //acá devuelvo la respuesta al js
            echo json_encode(['exito' => true, 'id' => $id, 'mensaje' => 'Empleado recuperado correctamente']);
            exit;
        }
    }
    //acá está la api que devuelve los empleados activos en json (la usa la tabla)
    public function api_empleados(){
       // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
       // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
       if(!isset($this->sesion->id)){
           return redirect()->to(base_url() . "registro/");
       }
       //Esta funcion devuelve el listado de usuarios en formato json
       //Traemos todos los usuarios activos, del más nuevo al más viejo
       //acá traigo solo los empleados del usuario logueado
       $empleados =    $this->empleados
                       ->where('id_usuario', $this->sesion->id)
                       ->orderBy('id','DESC')
                       ->findAll();
       //Armamos los datos y los devolvemos como json
       $datos = ['empleados'=>$empleados];
       return $this->response->setJSON($datos);
    }
    //acá está la api que devuelve los empleados borrados en json (la usa la tabla de la papelera)
    public function api_empleados_borrados(){
       // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
       // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
       if(!isset($this->sesion->id)){
           return redirect()->to(base_url() . "registro/");
       }
       //Esta funcion devuelve el listado de usuarios en formato json
       //Traemos todos los usuarios activos, del más nuevo al más viejo
       //acá traigo solo los empleados borrados del usuario logueado
       $empleados =    $this->empleados
                       ->where('id_usuario', $this->sesion->id)
                       ->orderBy('id','DESC')
                       ->onlyDeleted()
                       ->findAll();
       //Armamos los datos y los devolvemos como json
       $datos = ['empleados'=>$empleados];
       return $this->response->setJSON($datos);
    }
}