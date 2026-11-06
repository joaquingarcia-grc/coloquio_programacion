<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Salari::index');
$routes->post('usuarios/insertar', 'Salari::insertar');
$routes->post('usuarios/validacion', 'Salari::validacion');
$routes->get('usuarios/sesion', 'Salari::sesion');
$routes->get('empleados/api','Salari::api_empleados');
$routes->get('liquidaciones/api','Salari::api_liquidaciones');
$routes->post('/usuarios/salir', 'Salari::salir');
$routes->get('liquidaciones/avisos','Salari::avisos');
$routes->post('/empleados/insertar', 'Salari::cargarEmpleado');

