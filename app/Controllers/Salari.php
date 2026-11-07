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

    public function calendario(){
        $id_usuario = session()->get('id');
        // misma zona que en avisos, asi "hoy" es el dia real de aca
        $zona = new \DateTimeZone('America/Argentina/Buenos_Aires');
        $hoy = new \DateTime('today', $zona);
        // withDeleted para que se vean tambien las vencidas que se dieron de baja solas
        $liquidaciones = $this->liquidaciones
            ->where('id_usuario', $id_usuario)
            ->withDeleted()
            ->orderBy('fecha_liquidacion', 'asc')
            ->findAll();
        $lista = [];
        foreach ($liquidaciones as $liq) {
            $vencida = false;
            if ($liq['fecha_vencimiento'] < $hoy->format('Y-m-d')) {
                $vencida = true;
            }
            // si tiene baja pero todavia no vencio, la borraron a mano, no va en el calendario
            if ($liq['fecha_baja'] != null && $vencida == false) {
                continue;
            }
            $empleado = $this->empleados->find($liq['id_empleado']);
            $nombre = '';
            if ($empleado) {
                $nombre = $empleado['denominacion'];
            } else {
                $nombre = 'Empleado ' . $liq['id_empleado'];
            }
            $estado = '';
            if ($vencida) {
                $estado = 'vencida';
            } else {
                $estado = 'pendiente';
            }
            $lista[] = [
                'id'                => $liq['id'],
                'empleado'          => $nombre,
                'monto'             => $liq['monto'],
                'fecha_liquidacion' => $liq['fecha_liquidacion'],
                'fecha_vencimiento' => $liq['fecha_vencimiento'],
                'estado'            => $estado
            ];
        }
        return $this->response->setJSON([
            'liquidaciones' => $lista
        ]);
    }
    
    public function cargarEmpleado(){
        //Esto nos indica que esperamos peticiones json
        header('Content-Type: application/json');
        $id_usuario = session()->get('id');
        // Datos que llegan por POST, la denominación siempre se guarda en minúscula
        $denominacion = strtolower(trim($this->request->getPost('denominacion')));
        $correo = trim($this->request->getPost('correo'));
        $area = trim($this->request->getPost('area'));

        if(empty($denominacion) || empty($correo) || empty($area)){
            echo json_encode(['exito' => false, 'mensaje' => 'Faltan datos obligatorios']);
            exit;
        }
        $this->empleados->insert([
                'id_usuario'=>$id_usuario,
                'denominacion'=>$denominacion,
                'correo'=>$correo,
                'area'=>$area
        ]);
        //damos una respuesta luego de insertar
        echo json_encode(['exito' => true, 'mensaje' => 'Empleado cargado con exito']);
        exit;
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

    public function avisos(){
        $id_usuario = session()->get('id');
        $usuario = session()->get('denominacion');
        // zona horaria de argentina fija, asi "hoy" es siempre el dia real de acá
        $zona = new \DateTimeZone('America/Argentina/Buenos_Aires');
        $hoy = new \DateTime('today', $zona);
        $manana = new \DateTime('tomorrow', $zona);
        $ahora = new \DateTime('now', $zona);
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
            $vence = new \DateTime($liq['fecha_vencimiento'], $zona);
            $diasRestantes = (int) $hoy->diff($vence)->format('%a');

            $lista[] = [
                'id'             => $liq['id'],
                'empleado'       => $nombre,
                'monto'          => $liq['monto'],
                'fecha_vencimiento' => $liq['fecha_vencimiento'],
                'dias_restantes' => $diasRestantes,
                'usuario' => $usuario
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
            $this->liquidaciones->update($liq['id'], ['fecha_baja' => $ahora->format('Y-m-d H:i:s')]);
            $cantBajas = $cantBajas + 1;
        }
        return $this->response->setJSON([
            'por_vencer'    => $lista,
            'dadas_de_baja' => $cantBajas
        ]);
    }

}