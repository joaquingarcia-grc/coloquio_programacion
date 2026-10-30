<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Salari::index');
$routes->post('usuarios/insertar', 'Salari::insertar');
$routes->post('usuarios/validacion', 'Salari::validacion');
$routes->get('usuarios/sesion', 'Salari::sesion');
$routes->get('empleados/api','Salari::api_empleados');
