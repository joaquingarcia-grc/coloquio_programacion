<?php

namespace App\Controllers;

class Salari extends BaseController{


    public function index(){


        $datos = [ 
                  'titulo' => 'Liquidacion de sueldos'];

        echo view('salari',$datos);


    }

}