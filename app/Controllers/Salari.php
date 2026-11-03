<?php

namespace App\Controllers;
use App\Models\UsuariosModel;
use App\Models\EmpleadosModel;
use App\Models\LiquidacionesModel;

class Salari extends BaseController{

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

        $empleados = $this->empleados->findAll();
        
        $datos = [  'titulo' => 'Liquidacion de sueldos',
                    'empleados' => $empleados];

        echo view('salari',$datos);
    }
    public function insertar(){
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        // Datos que llegan por POST, la denominación siempre se guarda en minúscula
        $denominacion = strtolower(trim($this->request->getPost('denominacion')));
        $correo = trim($this->request->getPost('correo'));
        $pswd = trim($this->request->getPost('pswd'));
        // La denominación y el correo son obligatorios
        if (empty($denominacion) || empty($correo)){
            echo json_encode(['exito' => false, 'mensaje' => 'Faltan datos obligatorios']);
            exit;
        }
        // La contraseña es obligatoria al crear un usuario
        if (empty($pswd)) {
            echo json_encode(['exito' => false, 'mensaje' => 'La contraseña es obligatoria']);
            exit;
        }
        // Mínimo 8 caracteres
        if (strlen($pswd) < 8) {
            echo json_encode(['exito' => false, 'mensaje' => 'La contraseña debe tener al menos 8 caracteres']);
            exit;
        }
        // Tiene que tener al menos un carácter especial
        if (empty(strpbrk($pswd, '#!*@$%&?¿'))) {
            echo json_encode(['exito' => false, 'mensaje' => 'La contraseña debe tener al menos un carácter especial']);
            exit;
        }
        // Se busca un usuario con la misma denominación, incluyendo los de la papelera
        $datoUsuario = $this->usuarios->where('denominacion', $denominacion)->withDeleted()->first();
        // Si no existe, se hashea la contraseña y se guarda
        if (empty($datoUsuario)){
            $hash = password_hash($pswd ,PASSWORD_DEFAULT);
            $this->usuarios->insert([
                'denominacion' => $denominacion,
                'correo'  => $correo,
                'pswd' => $hash
            ]);
            //damos una respuesta luego de verificar
            echo json_encode(['exito' => true, 'mensaje' => 'Usuario generado',]);
            exit;
        }else{
            echo json_encode(['exito' => false,'papelera' => false, 'mensaje'=>'Usuario existente']);                
            exit;
        }
    }

    public function validacion(){        
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        //Traemos las variables del formulario de logueo
        $denominacion = strtolower(trim($this->request->getPost('denominacion')));
        $pswd = $this->request->getPost('pswd');
        //verificamos que esten completos los dos campos
        if (empty($denominacion) || empty($pswd)){
          echo json_encode(['exito' => false, 'mensaje' => 'Faltan datos']);
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
                
                echo json_encode(['exito' => true, 'mensaje' => 'Bienvenido']);
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

    public function sesion(){
        $sesion = session();
        if ($sesion->get('id')) {
            return $this->response->setJSON([
                'logueado'     => true,
                'denominacion' => $sesion->get('denominacion')
            ]);
        } else {
            return $this->response->setJSON([
                'logueado' => false
            ]);
        }
    } 
    
    public function salir(){
        
        $sesion = session();
        $sesion->destroy();

        return $this->response->setJSON([
            'logueado' => false
        ]);
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
    public function api_liquidaciones(){
        //Esta funcion devuelve el listado de liquidaciones en formato json
        //Traemos todas las liquidaciones activas, de la más nueva a la más vieja
        $liquidaciones =    $this->liquidaciones->select('liquidaciones.*, usuarios.denominacion AS cargado_por, empleados.denominacion AS empleado')
                        ->join('usuarios', 'usuarios.id = liquidaciones.id_usuario')
                        ->join('empleados', 'empleados.id = liquidaciones.id_empleado')
                        ->orderBy('liquidaciones.id','DESC')
                        ->findAll();
        //Armamos los datos y los devolvemos como json
        $datos = ['liquidaciones'=>$liquidaciones];
        return $this->response->setJSON($datos);
    }


    public function avisos(){

        $id_usuario = session()->get('id');
        $hoy = new \DateTime('today');
        $manana = new \DateTime('tomorrow');
        // por vencer: vencen hoy o mañana
        $porVencer = $this->liquidaciones
            ->where('id_usuario', $id_usuario)
            ->where('fecha_baja', null)
            ->where('fecha_vencimiento >=', $hoy->format('Y-m-d'))
            ->where('fecha_vencimiento <=', $manana->format('Y-m-d'))
            ->orderBy('fecha_vencimiento', 'asc')
            ->findAll();
        $lista = [];
        foreach ($porVencer as $liq) {
            $empleado = $this->empleados->find($liq['id_empleado']);
            $nombre = '';
            if ($empleado) {
                $nombre = $empleado['denominacion'];
            } else {
                $nombre = 'Empleado ' . $liq['id_empleado'];
            }
            $vence = new \DateTime($liq['fecha_vencimiento']);
            $diasRestantes = (int) $hoy->diff($vence)->format('%a');

            $lista[] = [
                'id'             => $liq['id'],
                'empleado'       => $nombre,
                'monto'          => $liq['monto'],
                'dias_restantes' => $diasRestantes
            ];
        }
        // vencidas: ya pasó el día de vencimiento, baja lógica
        $vencidas = $this->liquidaciones
            ->where('id_usuario', $id_usuario)
            ->where('fecha_baja', null)
            ->where('fecha_vencimiento <', $hoy->format('Y-m-d'))
            ->findAll();
        $cantBajas = 0;
        foreach ($vencidas as $liq) {
            $this->liquidaciones->update($liq['id'], ['fecha_baja' => date('Y-m-d H:i:s')]);
            $cantBajas = $cantBajas + 1;
        }
        return $this->response->setJSON([
            'por_vencer'    => $lista,
            'dadas_de_baja' => $cantBajas
        ]);
    }

}