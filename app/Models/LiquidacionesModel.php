<?php

  namespace App\Models;
  //manera de la  cual vamos a llamar estos modelos 
  use CodeIgniter\Model;
  //esto es para indicar que vamos a usar los modelos de codeigniter
  class LiquidacionesModel extends Model{
    //vamos a llamar a la tabla usando la bariable $table
    protected $table      = 'liquidaciones';
    //id seria el atributo primero de nuestra tabla
    protected $primaryKey = 'id';
    //indicamos que nuestra clabe primaria es auto incrementable
    protected $useAutoIncrement = true;
    //como devuelve los modelos
    protected $returnType     = 'array';
    //esto depende si queremos hacer un hard delet(false) o un soft delet(true)
    protected $useSoftDeletes = true;
    //aca defino las columnas que quiero que sean usables
    protected $allowedFields = ['id_empleado', 'id_usuario','fecha_liquidacion','monto','fecha_alta', 'fecha_vencimiento','fecha_baja'];

    protected $dateFormat = 'datetime';

    protected $useTimestamps = true;
    //fecha de registro
    protected $createdField  = 'fecha_alta';
    //fecha de edicion
    protected $updatedField  = 'fecha_modificacion';
    //Esto ayuda al borrado de datoss
    protected $deletedField  = 'fecha_baja';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
  }
 ?>