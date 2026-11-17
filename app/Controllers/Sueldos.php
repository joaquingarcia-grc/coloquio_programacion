<?php

namespace App\Controllers;
use App\Models\UsuariosModel;
use App\Models\EmpleadosModel;
use App\Models\LiquidacionesModel;
use App\Models\ActividadesModel;

//acá está el controlador de sueldos (página principal, actividad y configuración del usuario)
class Sueldos extends BaseController{

    //acá se declaran las variables que usa todo el controlador
    protected $sesion;
    protected $usuarios;
    protected $empleados;
    protected $liquidaciones;
    protected $actividades;

    //acá se inicia la sesión y se crean los modelos
    public function __construct(){
        //Se inicia la sesión y se instancian los modelos
        $this->sesion = session();
        $this->actividades = new ActividadesModel();
        $this->usuarios = new UsuariosModel();
        $this->empleados = new EmpleadosModel();
        $this->liquidaciones = new LiquidacionesModel();
    }

    //acá se arma la página principal
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
        echo view('body');
        echo  view('footer');
    }

    //acá se arma la página de actividad
    public function actividad(){
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
        echo view('usuarios/actividad');
        echo  view('footer');
    }
    //acá se arma la página de configuración del usuario
    public function configuracion(){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }

        //acá tomo los datos del usuario logueado y los empleados
        // Traemos solo el usuario logueado (una sola fila, por eso find y no findAll)
        $datos_usuario = $this->usuarios->find($this->sesion->id);
        $usr_logueado = $this->sesion->get('denominacion');
        $empleados = $this->empleados->findAll();
        
        //acá armo los datos que van a la vista
        $datos = [  'titulo' => 'Liquidacion de sueldos',
                    'usuario'=>$usr_logueado,
                    'empleados' => $empleados,
                    'datosUsuario' => $datos_usuario ];

        // Se arma la página: encabezado, formulario y pie
        echo view('head',$datos);
        echo view('usuarios/configuracion',$datos);
        echo  view('footer');
    }
    //acá se actualizan los datos del usuario (configuración)
    public function actualizar($id){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //acá tomo el usuario logueado y busco el usuario a actualizar
        //Traemos el id del usuario logueado y el usuario que se quiere actualizar
        $id_logueado = $this->sesion->get('id');
        $usuario = $this->usuarios->find($id);
        //acá reviso que sea el dueño del usuario
        //Por si alguien fuerza la ruta, volvemos a verificar que sea el dueño
        //no nos fiamos solo de puedeEditar
        if ($usuario['id'] != $id_logueado) {
            echo json_encode(['exito' => false, 'mensaje' => 'Usted no es el dueño de este usuario']);
            exit;
        }
        //acá tomo los datos nuevos del formulario
        //Traemos las variables del formulario de edición
        $denominacion = strtolower(trim($this->request->getPost('denominacion')));
        $correo = trim($this->request->getPost('correo'));
        $pswd = trim($this->request->getPost('pswd'));
        //Revisamos que la denominación y el correo no estén vacíos
        if (empty($denominacion) || empty($correo)){
            echo json_encode(['exito' => false, 'mensaje' => 'Faltan datos obligatorios']);
            exit;
        }
        //acá están las validaciones de la contraseña
        //Acá la contraseña es opcional: si viene vacía se deja la que tenía
        //si viene, se valida igual que al insertar
        if (!empty($pswd)){
            if (strlen($pswd) < 8) {
                echo json_encode(['exito' => false, 'mensaje' => 'La contraseña debe tener al menos 8 caracteres']);
                exit;
            }
            if (empty(strpbrk($pswd, '#!*@$%&?¿'))) {
                echo json_encode(['exito' => false, 'mensaje' => 'La contraseña debe tener al menos un carácter especial']);
                exit;
            }
        }
        //acá reviso si la denominación ya la tiene otro usuario
        //Buscamos otro usuario con la misma denominación (menos el que estamos editando), incluso en la papelera.
        $datoUsuario = $this->usuarios->where('denominacion', $denominacion)->where('id !=', $id)->withDeleted()->first();
        //revisamos que no haya datos repetidos
        if (empty($datoUsuario)){
            //armamos los datos a actualizar
            $datoActualizar = [
                'denominacion' => $denominacion,
                'correo' => $correo
            ];
            //el pswd solo se actualiza si escribió uno nuevo
            if (!empty($pswd)){
                $datoActualizar['pswd'] = password_hash($pswd, PASSWORD_DEFAULT);
            }
            //realizamos el update
            $this->usuarios->update($id, $datoActualizar);
            //acá devuelvo la respuesta al js
            echo json_encode(['exito' => true, 'mensaje' => 'Usuario actualizado con éxito', 'redirigir' => base_url('usuarios')]);
            exit;
        }else{
            //verificamos si el dato repetido está activo o en la papelera
            if(empty($datoUsuario['fecha_baja'])){
                echo json_encode(['exito' => false,'papelera' => false, 'mensaje'=>'Usuario existente']);
            }else{
                echo json_encode(['exito' => false,'papelera'=> true, 'mensaje'=>'Usuario existente en la papelera, recuperelo']);
            }
            exit;
        }
    }

    //acá está la api que devuelve la actividad del usuario en json (la usa la tabla de actividad)
    public function api_actividad(){
        // Verificamos que haya una sesión iniciada: si no existe el id en la sesión,
        // lo mandamos al registro para que no pueda entrar a esta ruta sin loguearse
        if(!isset($this->sesion->id)){
            return redirect()->to(base_url() . "registro/");
        }
        //Esta funcion devuelve toda la actividad del usuario logueado en formato json
        //Traemos la actividad del usuario, de la mas nueva a la mas vieja
        //acá traigo las actividades del usuario logueado
        $actividades =  $this->actividades->where('id_usuario', $this->sesion->id)
                        ->orderBy('id','DESC')
                        ->findAll();
        //Aca guardamos las actividades ya armadas con el empleado al que pertenece cada una
        $resultado = [];
        //acá recorro las actividades y les busco el nombre del empleado
        foreach ($actividades as $actividad) {
            //el empleado es a quien le pertenece el cambio
            $nombre_empleado = '';
            //si la actividad es de una liquidación, busco el empleado a través de la liquidación
            if ($actividad['tabla'] == 'liquidaciones') {
                //withDeleted para encontrarla tambien si se dio de baja
                $liquidacion = $this->liquidaciones->withDeleted()->find($actividad['id_dato']);
                if ($liquidacion) {
                    //buscamos el empleado de la liquidacion para mostrar el nombre
                    $empleado = $this->empleados->withDeleted()->find($liquidacion['id_empleado']);
                    if ($empleado) {
                        $nombre_empleado = $empleado['denominacion'];
                    } else {
                        $nombre_empleado = 'Empleado no encontrado';
                    }
                } else {
                    $nombre_empleado = 'Liquidacion no encontrada';
                }
            } else {
                //si la actividad es de un empleado, lo busco directamente
                if ($actividad['tabla'] == 'empleados') {
                    //withDeleted para encontrarlo tambien si se dio de baja
                    $empleado = $this->empleados->withDeleted()->find($actividad['id_dato']);
                    if ($empleado) {
                        $nombre_empleado = $empleado['denominacion'];
                    } else {
                        $nombre_empleado = 'Empleado no encontrado';
                    }
                }
            }
            //armamos cada fila con lo que guarda la tabla actividades mas el empleado
            $resultado[] = [
                'id'          => $actividad['id'],
                'tabla'       => $actividad['tabla'],
                'id_dato'     => $actividad['id_dato'],
                'accion'      => $actividad['accion'],
                'fecha_alta'  => $actividad['fecha_alta'],
                'empleado'    => $nombre_empleado
            ];
        }
        //Armamos los datos y los devolvemos como json
        $datos = ['actividades'=>$resultado];
        return $this->response->setJSON($datos);
    }
}