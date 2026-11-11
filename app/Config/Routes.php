<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */


$routes->get('/registro', 'Login::index');
$routes->get('/registro/nuevo', 'Login::nuevo');
$routes->post('/registro/validacion', 'Login::validacion');
$routes->post('registro/insertar', 'Login::insertar');


$routes->get('/usuarios', 'Usuarios::index');
$routes->get('usuarios/api','Usuarios::api_usuarios');

$routes->get('/empleados', 'Empleados::index');
$routes->post('/empleados/insertar', 'Empleados::insertar');
$routes->get('empleados/api','Empleados::api_empleados');


$routes->get('/liquidaciones', 'Liquidaciones::index');

$routes->get('/sueldos', 'Sueldos::index');
$routes->post('usuarios/insertar', 'Salari::insertar');
$routes->post('usuarios/validacion', 'Salari::validacion');
$routes->get('usuarios/sesion', 'Salari::sesion');
$routes->get('liquidaciones/api','Salari::api_liquidaciones');
$routes->post('/usuarios/salir', 'Salari::salir');
$routes->get('liquidaciones/avisos','Salari::avisos');
$routes->post('/empleados/insertar', 'Salari::cargarEmpleado');
$routes->get('liquidaciones/calendario', 'Salari::calendario');

