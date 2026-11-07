<?php

namespace App\Controllers;
use App\Models\UsuariosModel;
use App\Models\EmpleadosModel;
use App\Models\LiquidacionesModel;

class Sueldos extends BaseController{
    
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

}