<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */


$routes->get('/registro', 'Login::index');
$routes->get('/registro/nuevo', 'Login::nuevo');
$routes->post('/registro/validacion', 'Login::validacion');
$routes->post('registro/insertar', 'Login::insertar');


$routes->get('/empleados', 'Empleados::index');
$routes->post('/empleados/insertar', 'Empleados::insertar');
$routes->post('/empleados/borrar/(:num)','Empleados::borrar/$1');
$routes->post('/empleados/actualizar/(:num)', 'Empleados::actualizar/$1');
$routes->get('/empleados/papelera', 'Empleados::papelera');
$routes->post('/empleados/recuperacion/(:num)','Empleados::recuperacion/$1');
$routes->get('empleados/api','Empleados::api_empleados');
$routes->get('empleados/api2','Empleados::api_empleados_borrados');

$routes->get('/liquidaciones', 'Liquidaciones::index');
$routes->post('/liquidaciones/insertar', 'Liquidaciones::insertar');
$routes->post('/liquidaciones/borrar/(:num)','Liquidaciones::borrar/$1');
$routes->post('/liquidaciones/actualizar/(:num)', 'Liquidaciones::actualizar/$1');
$routes->get('/liquidaciones/papelera', 'Liquidaciones::papelera');
$routes->post('/liquidaciones/recuperacion/(:num)','Liquidaciones::recuperacion/$1');
$routes->get('liquidaciones/api','Liquidaciones::api_liquidaciones');
$routes->get('liquidaciones/api2','Liquidaciones::api_liquidaciones_borrados');
$routes->get('liquidaciones/reporte', 'Liquidaciones::reporte');
$routes->get('liquidaciones/calendario', 'Liquidaciones::api_calendario');


$routes->get('calendario', 'Sueldos::index');